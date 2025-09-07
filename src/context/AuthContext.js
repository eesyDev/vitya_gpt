
import React, { useState, createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setIsLoginOpen(false);
    console.log('User logged in:', userData);
  };

  const logout = () => {
    setUser(null);
    console.log('User logged out');
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
      login,
      logout,
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