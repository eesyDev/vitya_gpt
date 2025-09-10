import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useLoginMutation, useRegisterMutation } from '../../store/api/authApi';
import { selectAuth, closeLoginModal } from '../../store/slices/authSlice';
import FormInput from "./FormInput";
import Button from "./Button";

const LoginModal = () => {
  const dispatch = useDispatch();
  const { isLoginModalOpen } = useSelector(selectAuth);
  
  // RTK Query hooks
  const [loginUser, { isLoading: isLoginLoading, error: loginError }] = useLoginMutation();
  const [registerUser, { isLoading: isRegisterLoading, error: registerError }] = useRegisterMutation();
  
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async () => {
    setError('');
    
    // Валидация
    if (!formData.username) {
      setError('Заполните все поля');
      return;
    }

    if (!isLoginMode) {
      if (!formData.email || !formData.password) {
        setError('Заполните все поля');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Пароли не совпадают');
        return;
      }
      if (formData.password.length < 6) {
        setError('Пароль должен быть не менее 6 символов');
        return;
      }
    }

    try {
      if (isLoginMode) {
        await loginUser({ 
          username: formData.username, 
          password: formData.password 
        }).unwrap();
      } else {
        await registerUser({
          username: formData.username,
          email: formData.email,
          password: formData.password
        }).unwrap();
      }
      
      // После успешного логина/регистрации модальное окно закроется автоматически через Redux
      // и произойдет автоматическое перенаправление на чат
      
    } catch (error) {
      setError(error.data?.message || error.message || 'Произошла ошибка');
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setFormData({ username: '', email: '', password: '', confirmPassword: '' });
    setError('');
  };

  const handleClose = () => {
    dispatch(closeLoginModal());
    setFormData({ username: '', email: '', password: '', confirmPassword: '' });
    setIsLoginMode(true);
    setError('');
  };

  const isLoading = isLoginLoading || isRegisterLoading;
  const apiError = loginError || registerError;

  if (!isLoginModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-bg-primary flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md">
        {/* Form container */}
        <div className="rounded-lg p-8 bg-bg-tertiary relative">
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors p-1 absolute right-2 top-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-medium text-white mb-4">
              {isLoginMode ? 'Вход в аккаунт' : 'Регистрация'}
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              {isLoginMode 
                ? 'Введите почту и пароль для входа в аккаунт.'
                : 'Создайте новый аккаунт, введя данные ниже.'
              }
            </p>
          </div>
          
          {/* Ошибки */}
          {(error || apiError) && (
            <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg">
              <p className="text-red-400 text-sm">
                {error || apiError?.data?.message || apiError?.message || 'Произошла ошибка'}
              </p>
            </div>
          )}
          
          <div className="space-y-4">
            <FormInput
              type="text"
              name="username"
              placeholder="Ваше имя"
              value={formData.username}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            
            {!isLoginMode && (
              <FormInput
                type="email"
                name="email"
                placeholder="Почта"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            )}
            
            <FormInput
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleInputChange}
              disabled={isLoading}
            />

            {!isLoginMode && (
              <FormInput
                type="password"
                name="confirmPassword"
                placeholder="Подтвердите пароль"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            )}

            <div className="mt-6">
              <Button 
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading 
                  ? (isLoginMode ? 'Вход...' : 'Регистрация...') 
                  : (isLoginMode ? 'Войти' : 'Зарегистрироваться')
                }
              </Button>
            </div>
          </div>

          {isLoginMode && (
            <div className="text-center mt-6">
              <button className="text-gray-400 hover:text-white text-sm transition-colors">
                Восстановить доступ к аккаунту
              </button>
            </div>
          )}

          <div className="border-t border-gray-600 mt-8 pt-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-4">
                {isLoginMode ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
              </p>
              <Button 
                onClick={toggleMode} 
                variant="secondary"
                disabled={isLoading}
              >
                {isLoginMode ? 'Создать аккаунт' : 'Войти в аккаунт'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;