import React from 'react';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className={`${sizeClasses[size]} relative`}>
        <div className="absolute top-0 left-0 right-0 bg-red-500 rounded-t-full h-1/2"></div>
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-b-full h-1/2"></div>
        <div
          className={`absolute inset-0 border-4 border-gray-300 rounded-full animate-spin`}
          style={{ borderTopColor: 'transparent' }}
        ></div>
      </div>
    </div>
  );
};

export default Loader;