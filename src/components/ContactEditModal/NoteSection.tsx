import React from 'react';

interface NoteSectionProps {
  note: string;
  onChange: (note: string) => void;
}

export const NoteSection: React.FC<NoteSectionProps> = ({ note, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">メモ</label>
      <textarea
        value={note}
        onChange={(e) => onChange(e.target.value)}
        placeholder="どんな話をしましたか？印象に残ったことは？"
        rows={5}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
      />
      <p className="text-xs text-gray-500">
        会話の内容やフォローアップのヒントを記録しましょう
      </p>
    </div>
  );
};
