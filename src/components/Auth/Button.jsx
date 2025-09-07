const Button = ({ onClick, children, variant = "primary", className = "" }) => {
    const baseStyles = "w-full py-3 rounded-lg font-medium transition-all duration-200";
    
    const variants = {
      primary: "bg-green-gradient text-white hover:opacity-90",
      secondary: "bg-transparent border border-gray-600 text-white hover:bg-gray-700"
    };
  
    return (
      <button
        onClick={onClick}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  export default Button;