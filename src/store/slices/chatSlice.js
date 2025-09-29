import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chats: [],
  activeChat: null,
  messages: {},
  isLoading: false,
  error: null
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // setActiveChat: (state, action) => {
    //   state.chats.forEach(chat => chat.isActive = false);
      
    //   // Находим и активируем выбранный чат
    //   const chat = state.chats.find(c => c.id === action.payload.id);
    //   if (chat) {
    //     chat.isActive = true;
    //     state.activeChat = action.payload;
    //   }
    // },
    setActiveChat: (state, action) => {
      // Деактивируем все чаты
      state.chats.forEach(chat => chat.isActive = false);
      
      // Находим чат в массиве
      const existingChat = state.chats.find(c => c.id === action.payload.id);
      
      if (existingChat) {
        // Если чат уже есть - активируем его
        existingChat.isActive = true;
      } else {
        // Если чата нет - добавляем его в массив
        state.chats.push({ ...action.payload, isActive: true });
      }
      
      // В любом случае устанавливаем как активный
      state.activeChat = action.payload;
    },
    clearActiveChat: (state) => {
      state.chats.forEach(chat => chat.isActive = false);
      state.activeChat = null;
    },
    
    addMessageToChat: (state, action) => {
      const { chatId, message } = action.payload;
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }
      state.messages[chatId].push(message);
    },
    
    clearMessages: (state, action) => {
      const chatId = action.payload;
      state.messages[chatId] = [];
    }
  },
  
  extraReducers: (builder) => {
    // Обработка результатов RTK Query будет здесь
  }
});
export const selectActiveChat = (state) => state.chat.activeChat;
export const { 
  setActiveChat, 
  clearActiveChat, 
  addMessageToChat, 
  clearMessages 
} = chatSlice.actions;

export default chatSlice.reducer;