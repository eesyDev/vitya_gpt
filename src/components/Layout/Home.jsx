import React, {useState} from 'react';
import NavigationSidebar from '../Common/Sidebar';
import MainContent from '../Common/MainContent';
import { ChatPanel } from '../Common/ChatPanel';
import SvgIcon from '../Common/SvgIcons';

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
        <div className="right-panel fixed top-4 right-4 flex gap-4">
          <button className='bg-bg-tertiary border-border-custom rounded-lg text-text-primary hover:bg-bg-secondary transition-colors z-50 p-2 flex gap-2 items-center'>
            Войти
            <SvgIcon src="/img/user.svg"/>
          </button>
          <button
            onClick={() => document.documentElement.classList.toggle('dark')}
            className=" p-2 bg-bg-tertiary border border-border-custom rounded-lg text-text-primary hover:bg-bg-secondary transition-colors z-50"
          >
            🌙
          </button>
          
        </div>
        
      </div>
    </>
  )
}

export default Home