import React, { useState, useEffect } from 'react';
import { menuItems } from '../../utils/data';
import SvgIcon from './SvgIcons';

const NavigationSidebar = () => {
  const [activeItem, setActiveItem] = useState('chat');

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    console.log(`Клик на: ${itemId}`);
  };


  return (
    <div className="w-20 bg-bg-primary flex flex-col h-screen">
      {/* Logo/Brand */}
      <div className="p-4 flex justify-center">
        <div className="w-12 h-12 bg-green-gradient rounded-full flex items-center justify-center">
          {/* <MessageCircle className="text-white" size={24} /> */}
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 flex flex-col space-y-2 px-2 py-4 gap-[25px]">
        {menuItems.map((item) => {
          
          const isActive = activeItem === item.id;
          
          return (
            <div
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`relative group cursor-pointer transition-all duration-200`}
            >
              {/* Icon */}
              <div className="flex flex-col items-center">
                {/* <IconComponent size={20} /> */}
                <div class={`${isActive 
                  ? 'bg-green-gradient text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-500'} p-2 rounded-md`}>
                    <SvgIcon src={item.icon}/>
                  </div>
                <span className="text-[10px] mt-[5px] text-center leading-tight text-primary">
                  {item.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom section - Account */}
      <div className="p-2 border-t border-gray-700">
        <div
          onClick={() => handleItemClick('account')}
          className={`cursor-pointer p-3 rounded-lg transition-all duration-200 ${
            activeItem === 'account'
              ? 'bg-teal-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-500'
          }`}
        >
          <div className="flex flex-col items-center">
            <SvgIcon src="/img/user.svg"/>
            <span className="text-xs mt-1 text-center">
              Аккаунт
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationSidebar;