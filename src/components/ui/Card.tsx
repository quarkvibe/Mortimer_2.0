import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'glowing' | 'dark';
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = ''
}) => {
  // Base classes
  const baseClasses = 'rounded-lg p-6 transition-all duration-300';
  
  // Variant classes
  const variantClasses = {
    default: 'bg-[#1A1030]/90 border border-[#2D1B69]',
    glowing: 'bg-[#1A1030]/90 border border-[#FF00FF] shadow-[0_0_15px_rgba(255,0,255,0.3)]',
    dark: 'bg-[#0A0717]/90 border border-[#2D1B69]'
  };
  
  // Combine all classes
  const cardClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${className}
  `;
  
  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
};