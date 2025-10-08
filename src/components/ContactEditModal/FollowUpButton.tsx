import React from 'react';
import { Sparkles } from 'lucide-react';

interface FollowUpButtonProps {
  onClick: () => void;
}

export const FollowUpButton: React.FC<FollowUpButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-colors"
    >
      <Sparkles className="w-5 h-5" />
      <span>フォローアップ文章を作成</span>
    </button>
  );
};
