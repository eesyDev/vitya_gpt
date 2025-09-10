import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const API_BASE_URL = 'http://89.111.169.135:8080';

const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/api`,
    prepareHeaders: (headers, { getState }) => {
        const data = localStorage.getItem('tokens');
        const parsedTokens = JSON.parse(data);
        const token = parsedTokens.accessToken;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
      return headers;
    },
  }),
  tagTypes: ['Chat', 'Message'],
  
  endpoints: (builder) => ({
    // 1. GET /api/chats - Получить мои чаты
    getChats: builder.query({
        query: () => '/chats',
        providesTags: ['Chat'],
        transformResponse: (response) => {
            return response.map(chat => ({
                ...chat,
                title: chat.chatName,
                isActive: false
            }));
        }
    }),
    
    // 2. POST /api/chats - Создать новый чат
    createChat: builder.mutation({
      query: (chatData) => ({
        url: '/chats',
        method: 'POST',
        body: chatData
      }),
      invalidatesTags: ['Chat'],
      transformResponse: (response) => ({
        ...response,
        title: response.chatName,
        isActive: true
      })
    }),
    
    // 3. GET /api/chats/{chatId}/messages - Получить сообщения чата
    getChatMessages: builder.query({
      query: (chatId) => `/chats/${chatId}/messages`,
      providesTags: (result, error, chatId) => [
        { type: 'Message', id: chatId }
      ]
    }),
    
    // 4. POST /api/chats/{chatId}/messages - Отправить сообщение в чат
    sendMessage: builder.mutation({
      query: ({ chatId, message }) => ({
        url: `/chats/${chatId}/messages`,
        method: 'POST',
        body: { message }
      }),
      invalidatesTags: (result, error, { chatId }) => [
        { type: 'Message', id: chatId }
      ],
      
      // Оптимистичные обновления для лучшего UX
      onQueryStarted: async ({ chatId, message }, { dispatch, queryFulfilled }) => {
        // Временно добавляем сообщение в кеш
        const patchResult = dispatch(
          chatApi.util.updateQueryData('getChatMessages', chatId, (draft) => {
            draft.push({
              id: Date.now(), // временный ID
              message,
              sender: 'user',
              timestamp: new Date().toISOString(),
              isOptimistic: true
            });
          })
        );
        
        try {
          await queryFulfilled;
        } catch {
          // Если запрос неудачен, откатываем изменения
          patchResult.undo();
        }
      }
    }),
    
    // 5. GET /api/chats/user/{userId} - Получить чаты пользователя по ID
    getUserChats: builder.query({
      query: (userId) => `/chats/user/${userId}`,
      providesTags: ['Chat']
    })
  })
});

export const {
  useGetChatsQuery,
  useCreateChatMutation,
  useGetChatMessagesQuery,
  useSendMessageMutation,
  useGetUserChatsQuery
} = chatApi;

export default chatApi;