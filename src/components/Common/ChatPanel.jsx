import React, { useState } from "react";

export const ChatPanel = ({ isVisible, onClose }) => {
    const [chats] = useState([
      { id: 1, title: 'Составление алгоритма продаж', isActive: true },
      { id: 2, title: 'Формулирование задачи', isActive: false },
      { id: 3, title: 'Анализ конкурентов', isActive: false },
      { id: 4, title: 'Планирование проекта', isActive: false }
    ]);
  
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
  
          {/* New Chat Button */}
          <button className="w-full bg-bg-tertiary hover:bg-bg-primary border border-border-custom rounded-lg p-3 flex items-center justify-between text-text-secondary hover:text-text-primary transition-colors">
            <span>Создать новый чат</span>
            <span className="text-lg">+</span>
          </button>
        </div>
  
        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm text-text-muted mb-3">Прошлые чаты</h3>
            <div className="space-y-2">
              {chats.map((chat) => (
                <div
                  key={chat.id}
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
          </div>
        </div>
      </div>
    );
  };