import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectIsLoggedIn, logout, openLoginModal } from "../../store/slices/authSlice";
import SvgIcon from "../Common/SvgIcons";

const RightPanel = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const handleAuthClick = () => {
    if (isLoggedIn) {
      dispatch(logout());
    } else {
      dispatch(openLoginModal());
    }
  };

  return (
    <div className="fixed top-4 right-4 flex gap-4 z-40">
      <button 
        onClick={handleAuthClick}
        className='bg-bg-tertiary border border-border-custom rounded-lg text-text-primary hover:bg-bg-secondary transition-colors py-2 px-4 flex gap-2 items-center'
      >
        {isLoggedIn ? (
          <>
            {user?.name || user?.username || 'Пользователь'}
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