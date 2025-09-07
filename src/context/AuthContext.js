
import React, { useState, createContext, useContext, useEffect } from 'react';
import { authAPI } from '../API/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [tokens, setTokens] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedTokens = localStorage.getItem('tokens');
    
    if (savedUser && savedTokens) {
      setUser(JSON.parse(savedUser));
      setTokens(JSON.parse(savedTokens));
    }
  }, []);

  // Регистрация
  const register = async (username, email, password) => {
    setIsLoading(true);
    try {
      const response = await authAPI.register(username, email, password);
      console.log(response)
      const userData = { username, email, password };
      console.log(userData)
      setUser(userData);
      setTokens({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken
      });
      
      // Сохраняем в localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('tokens', JSON.stringify({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken
      }));
      
      setIsLoginOpen(false);
      return { success: true };
      
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Логин
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await authAPI.login(email, password);
      
      const userData = { email, name: email.split('@')[0] };
      
      setUser(userData);
      setTokens({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken
      });
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('tokens', JSON.stringify({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken
      }));
      
      setIsLoginOpen(false);
      return { success: true };
      
    } catch (error) {
      console.error('Ошибка входа:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Выход
  const logout = () => {
    setUser(null);
    setTokens(null);
    localStorage.removeItem('user');
    localStorage.removeItem('tokens');
  };

// Обновление токена
const refreshToken = async () => {
  if (!tokens?.refreshToken) return { success: false };
  
  try {
    const response = await authAPI.refresh(tokens.refreshToken);
    
    const newTokens = {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken || tokens.refreshToken
    };
    
    setTokens(newTokens);
    localStorage.setItem('tokens', JSON.stringify(newTokens));
    
    return { success: true };
  } catch (error) {
    console.error('Ошибка обновления токена:', error);
    logout(); // Выходим если не можем обновить токен
    return { success: false, error: error.message };
  }
};

  const openLogin = () => {
    setIsLoginOpen(true);
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      register,
      login,
      logout,
      refreshToken,
      isLoginOpen,
      openLogin,
      closeLogin
    }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
  };