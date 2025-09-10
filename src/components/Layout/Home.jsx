import React, {useState} from 'react';
import NavigationSidebar from '../Common/Sidebar';
import MainContent from '../Common/MainContent';
import LoginModal from '../Auth/LoginPage';
import { ChatPanel } from '../Common/ChatPanel';
import SvgIcon from '../Common/SvgIcons';
import RightPanel from '../Auth/RightPanel';

const Home = () => {
  const [activeItem, setActiveItem] = useState('');
  const [showChatPanel, setShowChatPanel] = useState(false);
  const [activeChat, setActiveChat] = useState(null);

  const shouldShowChatPanel = activeItem === 'chat' && showChatPanel;

    // Обработчик выбора чата
    const handleChatSelect = (chat) => {
      console.log('Выбран чат:', chat);
      setActiveChat(chat); // Устанавливаем активный чат
    };
  return (
    <>
    <div className="h-screen bg-bg-primary flex">
        <NavigationSidebar setActiveItem={setActiveItem} activeItem={activeItem} setShowChatPanel={setShowChatPanel} />
        {shouldShowChatPanel && (
          <ChatPanel 
            isVisible={shouldShowChatPanel}
            onClose={() => setShowChatPanel(false)}
            onChatSelect={
              () => {
                handleChatSelect()
                console.log('Выбран чат:');
              }
            }
          />
        )}
        <MainContent activeItem={activeItem} activeChat={activeChat} />
        <RightPanel/>
        <LoginModal />
      </div>
    </>
  )
}

export default Home