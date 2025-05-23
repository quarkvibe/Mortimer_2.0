import React from 'react';

interface InputProps {
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  id,
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  label,
  error,
  required = false,
  className = ''
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label 
          htmlFor={id} 
          className="block mb-2 text-sm font-medium text-[#E0E0FF]/80"
        >
          {label} {required && <span className="text-[#FF00FF]">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`
            w-full px-4 py-2 bg-[#0A0717] text-[#E0E0FF] 
            border ${error ? 'border-[#FF0000]' : 'border-[#2D1B69]'} 
            rounded-md focus:outline-none focus:ring-1 
            focus:ring-[#FF00FF] focus:border-[#FF00FF]
            transition-colors
          `}
        />
        
        {/* Show a subtle glow effect on focus */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity peer-focus:opacity-100">
          <div className="absolute inset-0 rounded-md bg-[#FF00FF]/10 filter blur-sm"></div>
        </div>
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-[#FF0000]">{error}</p>
      )}
    </div>
  );
};