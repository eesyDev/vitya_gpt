import React from 'react';
import { useAuth } from '../../context/AuthContext';
import SvgIcon from '../Common/SvgIcons';

const Account = ({activeItem}) => {
    const { isLoggedIn, user, openLogin } = useAuth();
    const getContent = () => {
          if (isLoggedIn) {
            return (
              <div className="text-center">
                <div className="w-20 h-20 bg-green-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h2 className="text-xl font-medium text-text-primary mb-2">
                  {user?.name}
                </h2>
                <p className="text-text-secondary mb-4">
                  {user?.email}
                </p>
                <div className="bg-bg-secondary rounded-lg p-4 max-w-md mx-auto">
                  <h3 className="text-lg font-semibold mb-2">Настройки аккаунта</h3>
                  <p className="text-text-muted text-sm">
                    Здесь будут настройки профиля
                  </p>
                </div>
              </div>
            );
          } else {
            return (
              <div className="text-center">
                <div className="w-20 h-20 bg-bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 flex items-center justify-content-center">
                  <SvgIcon src="/img/user.svg" />
                </div>
                <h2 className="text-xl font-medium text-text-primary mb-2">
                  Войдите в аккаунт
                </h2>
                <p className="text-text-secondary">
                  Для доступа к настройкам профиля необходимо войти в систему
                </p>
                <button 
                    onClick={openLogin}
                    class="w-full py-3 rounded-lg font-medium transition-all duration-200 bg-green-gradient text-white hover:opacity-90 mt-6">Войти</button>
              </div>
            );
          }
      };
    
      return (
        <div className="flex-1 bg-bg-primary flex items-center justify-center p-8">
          {getContent()}
        </div>
      );
}

export default Account