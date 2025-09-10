import { createSlice } from '@reduxjs/toolkit';
import authApi from '../api/authApi';

const initialState = {
  user: null,
  tokens: null,
  isLoginModalOpen: false,
  shouldRedirectToChat: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.isLoginModalOpen = true;
    },
    
    closeLoginModal: (state) => {
      state.isLoginModalOpen = false;
    },
    
    logout: (state) => {
      state.user = null;
      state.tokens = null;
      state.shouldRedirectToChat = false;
      localStorage.removeItem('user');
      localStorage.removeItem('tokens');
    },
    
    restoreAuth: (state) => {
      const savedUser = localStorage.getItem('user');
      const savedTokens = localStorage.getItem('tokens');
      
      if (savedUser && savedTokens) {
        try {
          const parsedTokens = JSON.parse(savedTokens);
          
          if (parsedTokens.expiresAt && Date.now() < parsedTokens.expiresAt) {
            state.user = JSON.parse(savedUser);
            state.tokens = parsedTokens;
          } else {
            localStorage.removeItem('user');
            localStorage.removeItem('tokens');
          }
        } catch (error) {
          localStorage.removeItem('user');
          localStorage.removeItem('tokens');
        }
      }
    },
    
    clearRedirect: (state) => {
      state.shouldRedirectToChat = false;
    }
  },
  
  extraReducers: (builder) => {
    // Login success
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        const response = action.payload;
        
        const safeUserData = {
          id: response.user?.id,
          name: response.user?.name,
          email: response.user?.email,
          role: response.user?.role
        };
        
        const tokenData = {
          accessToken: response.token,
          refreshToken: response.refreshToken,
          expiresAt: Date.now() + 24 * 60 * 60 * 1000
        };
        
        state.user = safeUserData;
        state.tokens = tokenData;
        state.isLoginModalOpen = false;
        state.shouldRedirectToChat = true;
        
        localStorage.setItem('user', JSON.stringify(safeUserData));
        localStorage.setItem('tokens', JSON.stringify(tokenData));
      }
    );
    
    // Register success
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, action) => {
        const response = action.payload;
        
        const safeUserData = {
          id: response.id,
          username: response.user?.username,
          email: response.user?.email,
          role: response.user?.role
        };
        
        const tokenData = {
          accessToken: response.token,
          refreshToken: response.refreshToken,
          expiresAt: Date.now() + 24 * 60 * 60 * 1000
        };
        
        state.user = safeUserData;
        state.tokens = tokenData;
        state.isLoginModalOpen = false;
        state.shouldRedirectToChat = true;
        
        localStorage.setItem('user', JSON.stringify(safeUserData));
        localStorage.setItem('tokens', JSON.stringify(tokenData));
      }
    );
    
    // Refresh token success
    builder.addMatcher(
      authApi.endpoints.refreshToken.matchFulfilled,
      (state, action) => {
        const response = action.payload;
        
        const newTokens = {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken || state.tokens?.refreshToken,
          expiresAt: Date.now() + 24 * 60 * 60 * 1000
        };
        
        state.tokens = newTokens;
        localStorage.setItem('tokens', JSON.stringify(newTokens));
      }
    );
  }
});

export const { 
  openLoginModal, 
  closeLoginModal, 
  logout, 
  restoreAuth,
  clearRedirect
} = authSlice.actions;

// Selectors
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => !!state.auth.user;
export const selectTokens = (state) => state.auth.tokens;
export const selectShouldRedirectToChat = (state) => state.auth.shouldRedirectToChat;

export default authSlice.reducer;