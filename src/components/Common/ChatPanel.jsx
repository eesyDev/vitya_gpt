import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useGetChatsQuery, useCreateChatMutation } from '../../store/api/chatApi';
import { setActiveChat } from '../../store/slices/chatSlice';
import { selectUser, selectIsLoggedIn, logout, openLoginModal } from "../../store/slices/authSlice";

export const ChatPanel = ({ isVisible, onClose, onChatSelect }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const { 
    data: chats = [], 
    isLoading: isLoadingChats, 
    error: chatsError,
	refetch 
  } = useGetChatsQuery(undefined, {
    skip: !isVisible || !user
  });

console.log(chats)
  
  const [createChat, { 
    isLoading: isCreatingChat, 
    error: createError 
  }] = useCreateChatMutation();
  console.log('User ID при создании:', user?.id);
console.log('User data:', user);
  // Локальные состояния для формы
  const [isCreating, setIsCreating] = useState(false);
  const [newChatName, setNewChatName] = useState('');

  // Создание нового чата
  const handleCreateChat = async () => {
    if (!newChatName.trim()) return;

    try {
      const newChat = await createChat({
        chatName: newChatName.trim(),
        idUser: user.id
      }).unwrap();
	  refetch();
      // Устанавливаем новый чат как активный
      dispatch(setActiveChat(newChat));
      
      // Уведомляем родительский компонент
      if (onChatSelect) {
        onChatSelect(newChat);
      }

      // Сбрасываем форму
      setNewChatName('');
      setIsCreating(false);
      
    } catch (error) {
      console.error('Ошибка создания чата:', error);
    }
  };

  // Выбор чата
  const handleSelectChat = (chat) => {
    dispatch(setActiveChat(chat));
    if (onChatSelect) {
      onChatSelect(chat);
    }
  };

  // Отмена создания
  const cancelCreation = () => {
    setIsCreating(false);
    setNewChatName('');
  };

  if (!isVisible) return null;

  return (
    <div className="w-80 bg-bg-secondary h-screen border-r border-border-custom flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border-custom">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-gradient rounded-full"></div>
            <h2 className="text-lg font-medium text-text-primary">Все чаты Kotler</h2>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors p-1"
          >
            ✕
          </button>
        </div>

        {/* New Chat Section */}
        {!isCreating ? (
          <button 
            onClick={() => setIsCreating(true)}
            className="w-full bg-bg-tertiary hover:bg-bg-primary border border-border-custom rounded-lg p-3 flex items-center justify-between text-text-secondary hover:text-text-primary transition-colors"
          >
            <span>Создать новый чат</span>
            <span className="text-lg">+</span>
          </button>
        ) : (
          <div className="space-y-3">
            <input
              type="text"
              value={newChatName}
              onChange={(e) => setNewChatName(e.target.value)}
              placeholder="Название чата..."
              className="w-full bg-bg-primary border border-border-custom rounded-lg p-3 text-text-primary placeholder-text-muted focus:outline-none focus:border-green-gradient"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateChat();
                if (e.key === 'Escape') cancelCreation();
              }}
            />
            
            {createError && (
              <p className="text-red-400 text-sm">
                {createError.data?.message || 'Ошибка создания чата'}
              </p>
            )}
            
            <div className="flex space-x-2">
              <button
                onClick={handleCreateChat}
                disabled={isCreatingChat || !newChatName.trim()}
                className="flex-1 bg-green-gradient hover:opacity-80 text-white rounded-lg p-2 text-sm font-medium transition-opacity disabled:opacity-50"
              >
                {isCreatingChat ? 'Создание...' : 'Создать'}
              </button>
              <button
                onClick={cancelCreation}
                className="flex-1 bg-bg-tertiary hover:bg-bg-primary border border-border-custom text-text-secondary hover:text-text-primary rounded-lg p-2 text-sm transition-colors"
              >
                Отмена
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm text-text-muted mb-3">
            {chats.length > 0 ? 'Ваши чаты' : 'Чатов пока нет'}
          </h3>
          
          {isLoadingChats ? (
            <div className="text-center py-8">
              <p className="text-text-muted text-sm">Загрузка чатов...</p>
            </div>
          ) : chatsError ? (
            <div className="text-center py-8">
              <p className="text-red-400 text-sm">Ошибка загрузки чатов</p>
            </div>
          ) : chats.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-text-muted text-sm">
                Создайте первый чат для начала работы
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => handleSelectChat(chat)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    chat.isActive
                      ? 'bg-bg-primary border border-border-custom'
                      : 'hover:bg-bg-tertiary'
                  }`}
                >
                  <p className="text-text-primary text-sm font-medium leading-tight">
                    {chat.title}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};