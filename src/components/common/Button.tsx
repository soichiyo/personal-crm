import React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  fullWidth = false,
  disabled,
  className = '',
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-700';
      case 'secondary':
        return 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300';
      case 'outline':
        return 'bg-white border-2 border-gray-300 text-gray-900 hover:bg-gray-50 active:bg-gray-100';
      case 'ghost':
        return 'bg-transparent text-gray-900 hover:bg-gray-100 active:bg-gray-200';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'md':
        return 'px-4 py-2 text-base';
      case 'lg':
        return 'px-6 py-3 text-lg';
    }
  };

  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`
        ${getVariantClass()}
        ${getSizeClass()}
        ${fullWidth ? 'w-full' : ''}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
        rounded-lg font-medium transition-colors
        flex items-center justify-center gap-2
        ${className}
      `}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
};
