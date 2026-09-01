import React from 'react';

interface PujyaLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  height?: number | string;
}

export const PujyaLogo: React.FC<PujyaLogoProps> = ({ 
  className = '', 
  variant = 'light',
  height = 56
}) => {
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/logo.png"
        alt="Pujya Agritech Logo"
        className={`object-contain transition-opacity duration-300 ${
          variant === 'dark' ? 'brightness-0 invert' : ''
        }`}
        style={{
          height: typeof height === 'number' ? `${height}px` : height,
          width: 'auto',
          maxHeight: '140px',
        }}
      />
    </div>
  );
};

export default PujyaLogo;
