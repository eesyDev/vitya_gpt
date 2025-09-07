import React from "react";
const MainContent = ({ activeItem }) => {
    const getContent = () => {
      switch (activeItem) {
        case 'chat':
          return (
            <div className="text-center">
              <div className="w-20 h-20 bg-bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-10 h-10 bg-text-muted rounded opacity-40"></div>
              </div>
              <h2 className="text-xl font-medium text-text-primary mb-2">
                Добро пожаловать в чаты
              </h2>
              <p className="text-text-secondary">
                Выберите чат или создайте новый
              </p>
            </div>
          );
        case 'search':
          return (
            <div className="text-center">
              <h2 className="text-xl font-medium text-text-primary mb-2">
                🔍 Поиск
              </h2>
              <p className="text-text-secondary">
                Здесь будет функция поиска
              </p>
            </div>
          );
        case 'library':
          return (
            <div className="text-center">
              <h2 className="text-xl font-medium text-text-primary mb-2">
                📚 Библиотека
              </h2>
              <p className="text-text-secondary">
                Ваша личная библиотека
              </p>
            </div>
          );
        case 'learning':
          return (
            <div className="text-center">
              <h2 className="text-xl font-medium text-text-primary mb-2">
                🎓 Обучение
              </h2>
              <p className="text-text-secondary">
                Материалы для обучения
              </p>
            </div>
          );
        case 'account':
          return (
            <div className="text-center">
              <h2 className="text-xl font-medium text-text-primary mb-2">
                👤 Аккаунт
              </h2>
              <p className="text-text-secondary">
                Настройки вашего аккаунта
              </p>
            </div>
          );
        default:
          return (
            <div className="text-center">
              <h2 className="text-xl font-medium text-text-primary">
                Выберите раздел
              </h2>
            </div>
          );
      }
    };
  
    return (
      <div className="flex-1 bg-bg-primary flex items-center justify-center p-8">
        {getContent()}
      </div>
    );
  };

  export default MainContent;