import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
  type = 'button'
}) => {
  // Base classes
  const baseClasses = 'relative font-medium rounded-md transition-all duration-200 focus:outline-none';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-[#2D1B69] hover:bg-[#3D2B75] text-white border border-[#4D3B85]',
    secondary: 'bg-[#FF00FF]/20 hover:bg-[#FF00FF]/30 text-[#FF00FF] border border-[#FF00FF]/50',
    outline: 'bg-transparent hover:bg-[#2D1B69]/20 text-[#E0E0FF] border border-[#4D3B85]',
    ghost: 'bg-transparent hover:bg-[#2D1B69]/20 text-[#E0E0FF]'
  };
  
  // Disabled classes
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Combine all classes
  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${disabledClasses}
    ${widthClasses}
    ${className}
  `;
  
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {/* Add subtle glow effect for primary buttons */}
      {variant === 'primary' && !disabled && (
        <div className="absolute inset-0 rounded-md bg-[#9900FF]/20 filter blur-sm -z-10"></div>
      )}
      
      {/* Button content */}
      <div className="relative z-10 flex items-center justify-center">
        {children}
      </div>
    </button>
  );
};