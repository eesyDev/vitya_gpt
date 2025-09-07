import { useAuth } from "../../context/AuthContext";
import SvgIcon from "../Common/SvgIcons";
const RightPanel = () => {
    const { isLoggedIn, user, logout, openLogin } = useAuth();
  
    const handleAuthClick = () => {
      if (isLoggedIn) {
        logout();
      } else {
        openLogin();
      }
    };
    return (
        <div className="fixed top-4 right-4 flex gap-4 z-40">
          <button 
            onClick={handleAuthClick}
            className='bg-bg-tertiary border border-border-custom rounded-lg text-text-primary hover:bg-bg-secondary transition-colors p-2 flex gap-2 items-center'
          >
            {isLoggedIn ? (
              <>
                {user?.name || 'Пользователь'}
                <span className="text-red-400">Выйти</span>
              </>
            ) : (
              <>
                Войти
                <SvgIcon src="/img/user.svg"/>
              </>
            )}
          </button>
          
          <button
            onClick={() => document.documentElement.classList.toggle('light')}
            className="p-2 bg-bg-tertiary border border-border-custom rounded-lg text-text-primary hover:bg-bg-secondary transition-colors"
          >
            🌙
          </button>
        </div>
      );
}
export default RightPanel;