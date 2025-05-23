import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  name: string;
  options: Option[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  id,
  name,
  options,
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
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`
            w-full px-4 py-2 bg-[#0A0717] text-[#E0E0FF] 
            border ${error ? 'border-[#FF0000]' : 'border-[#2D1B69]'} 
            rounded-md focus:outline-none focus:ring-1 
            focus:ring-[#FF00FF] focus:border-[#FF00FF]
            transition-colors appearance-none
          `}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Custom arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="w-4 h-4 text-[#FF00FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        
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