import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectIsLoggedIn, logout, openLoginModal } from "../../store/slices/authSlice";
import Account from "../Auth/Account";
import ChatInterface from "../Chat/ChatInterface";

const MainContent = ({ activeItem, activeChat }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUser);
    console.log(activeChat)
    const getContent = () => {
      switch (activeItem) {
        case 'chat':
          return (
            <ChatInterface activeChat={activeChat} />
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
            <Account activeItem={activeItem}/>
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
      <div className="flex-1 bg-bg-primary flex items-center justify-center p-16">
        {getContent()}
      </div>
    );
  };

  export default MainContent;