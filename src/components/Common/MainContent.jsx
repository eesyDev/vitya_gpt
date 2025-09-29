import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectIsLoggedIn, logout, openLoginModal } from "../../store/slices/authSlice";
import { setActiveChat } from '../../store/slices/chatSlice';
import Account from "../Auth/Account";
import ChatInterface from "../Chat/ChatInterface";

const MainContent = ({ activeItem, activeChat }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const handleChatCreated = (newChat) => {
      console.log('handleChatCreated вызван с:', newChat);
      dispatch(setActiveChat(newChat));
      // setIsSidebarOpen(false);
      console.log('setActiveChat отправлен в Redux');
    };
    const getContent = () => {
      switch (activeItem) {
        case 'chat':
          return (
            <ChatInterface activeChat={activeChat} onChatCreated={handleChatCreated} />
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