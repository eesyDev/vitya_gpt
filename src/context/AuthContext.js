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
      const parsedTokens = JSON.parse(savedTokens);
      
      if (parsedTokens.expiresAt && Date.now() < parsedTokens.expiresAt) {
        setUser(JSON.parse(savedUser));
        setTokens(parsedTokens);
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('tokens');
      }
    }
  }, []);

  // Регистрация
  const register = async (username, email, password) => {
    setIsLoading(true);
    try {
      const response = await authAPI.register(username, email, password);
      
      const safeUserData = {
        id: response.user?.id,
        username: response.user?.username || username,
        email: response.user?.email || email,
        role: response.user?.role
      };
      
      const tokenData = {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        expiresAt: Date.now() + 15 * 60 * 1000 // 15 минут
      };
      
      setUser(safeUserData);
      setTokens(tokenData);
      
      localStorage.setItem('user', JSON.stringify(safeUserData));
      localStorage.setItem('tokens', JSON.stringify(tokenData));
      
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
  const login = async (name, password) => {
    setIsLoading(true);
    try {
      const response = await authAPI.login(name, password);
      
      const safeUserData = {
        name: response.user?.name || name,
      };
      
      const tokenData = {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        expiresAt: Date.now() + 15 * 60 * 1000 // 15 минут
      };
      
      setUser(safeUserData);
      setTokens(tokenData);
      
      localStorage.setItem('user', JSON.stringify(safeUserData));
      localStorage.setItem('tokens', JSON.stringify(tokenData));
      
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

  // Получение валидного токена
  const getValidToken = async () => {
    if (!tokens) return null;

    if (tokens.expiresAt && Date.now() >= tokens.expiresAt) {
      const refreshResult = await refreshToken();
      if (!refreshResult.success) {
        return null;
      }
      return tokens.accessToken;
    }

    return tokens.accessToken;
  };

  // Обновление токена
  const refreshToken = async () => {
    if (!tokens?.refreshToken) return { success: false };
    
    try {
      const response = await authAPI.refresh(tokens.refreshToken);
      
      const newTokens = {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken || tokens.refreshToken,
        expiresAt: Date.now() + 15 * 60 * 1000 // 15 минут
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
      getValidToken, // Новый метод для получения валидного токена
      isLoginOpen,
      openLogin,
      closeLogin,
      isLoading
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