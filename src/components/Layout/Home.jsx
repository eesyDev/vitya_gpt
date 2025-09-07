import React, {useState} from 'react';
import NavigationSidebar from '../Common/Sidebar';
import MainContent from '../Common/MainContent';
import LoginModal from '../Auth/LoginPage';
import { ChatPanel } from '../Common/ChatPanel';
import SvgIcon from '../Common/SvgIcons';
import RightPanel from '../Auth/RightPanel';

const Home = () => {
  const [activeItem, setActiveItem] = useState('chat');
  const [showChatPanel, setShowChatPanel] = useState(true);
  const shouldShowChatPanel = activeItem === 'chat' && showChatPanel;
  return (
    <>
    <div className="h-screen bg-bg-primary flex">
        <NavigationSidebar setActiveItem={setActiveItem} activeItem={activeItem} />
        {shouldShowChatPanel && (
          <ChatPanel 
            isVisible={shouldShowChatPanel}
            onClose={() => setShowChatPanel(false)}
          />
        )}
        <MainContent activeItem={activeItem} />
        <RightPanel/>
        <LoginModal />
      </div>
    </>
  )
}

export default Home