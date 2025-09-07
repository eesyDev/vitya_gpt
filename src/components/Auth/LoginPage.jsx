import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import FormInput from "./FormInput";
import Button from "./Button";
const LoginModal = () => {
    const { isLoginOpen, closeLogin, login } = useAuth();
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      confirmPassword: ''
    });
  
    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
  
    const handleSubmit = () => {
      if (isLoginMode) {
        if (formData.email && formData.password) {
          login({
            email: formData.email,
            name: formData.email.split('@')[0]
          });
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          alert('Пароли не совпадают!');
          return;
        }
        if (formData.email && formData.password) {
          login({
            email: formData.email,
            name: formData.email.split('@')[0]
          });
        }
      }
    };
  
    const toggleMode = () => {
      setIsLoginMode(!isLoginMode);
      setFormData({ email: '', password: '', confirmPassword: '' });
    };
  
    const handleClose = () => {
      closeLogin();
      setFormData({ email: '', password: '', confirmPassword: '' });
      setIsLoginMode(true);
    };
  
    if (!isLoginOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-bg-primary flex items-center justify-center z-50 p-4">
        <div className="w-full max-w-md">
          {/* Close button */}
          <div className="flex justify-end mb-8">
            
          </div>
  
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
  
            <div className="space-y-4">
              <FormInput
                type="email"
                name="email"
                placeholder="Почта"
                value={formData.email}
                onChange={handleInputChange}
              />
  
              <FormInput
                type="password"
                name="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={handleInputChange}
              />
  
              {!isLoginMode && (
                <FormInput
                  type="password"
                  name="confirmPassword"
                  placeholder="Подтвердите пароль"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              )}
  
              <div className="mt-6">
                <Button onClick={handleSubmit}>
                  {isLoginMode ? 'Войти' : 'Зарегистрироваться'}
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
                <Button onClick={toggleMode} variant="secondary">
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