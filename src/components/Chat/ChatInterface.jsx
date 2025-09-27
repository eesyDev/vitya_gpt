import React, { useState } from 'react';
import { useGetChatMessagesQuery, useSendMessageMutation } from '../../store/api/chatApi';

const ChatInterface = ({ activeChat }) => {
  const [message, setMessage] = useState('');
  
  // Получаем сообщения через RTK Query
  const {
    data: messages = [],
    isLoading: messagesLoading,
    isError: messagesError
  } = useGetChatMessagesQuery(activeChat?.id, {
    skip: !activeChat?.id, // пропускаем запрос если нет активного чата
    pollingInterval: 5000, // опционально: обновляем каждые 5 секунд
  });
  
  // Мутация для отправки сообщений
  const [sendMessageMutation, { isLoading: isSending }] = useSendMessageMutation();

  const handleSendMessage = async () => {
    if (!message.trim() || !activeChat?.id) return;

    try {
      await sendMessageMutation({
        chatId: activeChat.id,
        message: message.trim()
      }).unwrap();
      
      setMessage('');
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error);
      // Можно показать toast с ошибкой
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Если нет активного чата, показываем стартовую страницу
  if (!activeChat) {
    return (
      <div className="flex-1 flex flex-col h-full">
        {/* Центрированный заголовок */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-medium text-text-primary mb-2">
              Начните новый чат Kotler
            </h2>
          </div>
        </div>

        {/* Поле ввода внизу */}
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Спросите что-нибудь..."
              className="w-full bg-bg-secondary border border-border-custom rounded-full py-4 px-6 pr-14 text-text-primary placeholder-text-muted focus:outline-none focus:border-green-500 transition-colors"
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim() || isSending}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-green-gradient rounded-full flex items-center justify-center hover:opacity-80 transition-opacity disabled:opacity-40"
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                className="text-white"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Если есть активный чат, показываем интерфейс чата
  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header чата */}
      <div className="border-b border-border-custom p-4">
        <h2 className="text-lg font-medium text-text-primary">
          {activeChat.title || 'Новый чат Kotler'}
        </h2>
      </div>

      {/* Сообщения */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messagesLoading ? (
          <div className="text-center py-8">
            <p className="text-text-muted">Загружаем сообщения...</p>
          </div>
        ) : messagesError ? (
          <div className="text-center py-8">
            <p className="text-red-500">Ошибка загрузки сообщений</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-8">
            <h3 className="text-xl font-medium text-text-primary mb-2">
              Начните новый чат Kotler
            </h3>
            <p className="text-text-muted">
              Задайте первый вопрос для начала диалога
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-green-gradient text-white'
                    : 'bg-bg-secondary text-text-primary'
                } ${msg.isOptimistic ? 'opacity-50' : ''}`}
              >
                <p className="text-sm">{msg.message || msg.text}</p>
              </div>
            </div>
          ))
        )}

        {isSending && (
          <div className="flex justify-start">
            <div className="bg-bg-secondary text-text-primary max-w-xs lg:max-w-md px-4 py-2 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Поле ввода */}
      <div className="border-t border-border-custom p-4">
        <div className="relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Спросите что-нибудь..."
            className="w-full bg-bg-secondary border border-border-custom rounded-full py-3 px-4 pr-12 text-text-primary placeholder-text-muted focus:outline-none focus:border-green-500 transition-colors"
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || isSending}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-green-gradient rounded-full flex items-center justify-center hover:opacity-80 transition-opacity disabled:opacity-40"
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              className="text-white"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;