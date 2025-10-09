import React from 'react';
import { Search } from 'lucide-react';

interface DeepSearchButtonProps {
  onClick: () => void;
}

export const DeepSearchButton: React.FC<DeepSearchButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
      type="button"
    >
      <Search className="w-5 h-5" />
      <span>この人物を深く掘る</span>
    </button>
  );
};
