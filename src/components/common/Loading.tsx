import React from 'react';
import { Loader2 } from 'lucide-react';

export type LoadingSize = 'sm' | 'md' | 'lg';
export type LoadingVariant = 'spinner' | 'overlay';

interface LoadingProps {
  size?: LoadingSize;
  variant?: LoadingVariant;
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  variant = 'spinner',
  message,
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'md':
        return 'w-8 h-8';
      case 'lg':
        return 'w-12 h-12';
    }
  };

  const spinner = (
    <div className="flex flex-col items-center gap-2">
      <Loader2 className={`${getSizeClass()} text-gray-900 animate-spin`} />
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </div>
  );

  if (variant === 'overlay') {
    return (
      <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
};
