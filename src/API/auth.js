const API_BASE_URL = 'http://89.111.169.135:8080';
export const authAPI = {
    register: async (username, email, password) => {
      const response = await fetch(`${API_BASE_URL}/auth/reg`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      console.log('Отправляем данные:', { username, email, password });
      
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Ошибка регистрации');
      }
      
      return await response.json();
    },
  
    login: async (username, password) => {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),

      });
      console.log('Отправляем данные:', { username, password });
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Ошибка входа');
      }
      
      return await response.json();
    },
  
    // Обновление токена
    refresh: async (refreshToken) => {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });
      
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Ошибка обновления токена');
      }
      
      return await response.json();
    }
  };