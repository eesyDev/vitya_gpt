import React, { useState } from 'react';

const FormInput = ({ type, name, placeholder, value, onChange, className = "" }) => (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors ${className}`}
    />
  );
  

export default FormInput;