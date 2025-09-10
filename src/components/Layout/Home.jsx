import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavigationSidebar from '../Common/Sidebar';
import MainContent from '../Common/MainContent';
import LoginModal from '../Auth/LoginPage';
import { ChatPanel } from '../Common/ChatPanel';
import RightPanel from '../Auth/RightPanel';
import { restoreAuth, selectShouldRedirectToChat, clearRedirect } from '../../store/slices/authSlice';

const Home = () => {
  const dispatch = useDispatch()
  const [activeItem, setActiveItem] = useState('chat');
  const [showChatPanel, setShowChatPanel] = useState(false);
  const [activeChat, setActiveChat] = useState(null);

  const shouldShowChatPanel = activeItem === 'chat' && showChatPanel;

    // Восстанавливаем auth при загрузке страницы
    useEffect(() => {
      dispatch(restoreAuth());
    }, [dispatch]);

    // Обработчик выбора чата
    const handleChatSelect = (chat) => {
      console.log('Выбран чат:', chat);
      setActiveChat(chat); 

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
              (chat) => {
                handleChatSelect(chat)
                console.log('Выбран чат:', chat);
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