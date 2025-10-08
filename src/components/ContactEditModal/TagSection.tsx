import React from 'react';
import { Plus, X } from 'lucide-react';

interface TagSectionProps {
  tags: string[];
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
}

export const TagSection: React.FC<TagSectionProps> = ({
  tags,
  onAddTag,
  onRemoveTag,
}) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">タグ</label>

      {/* タグ表示 */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div
            key={tag}
            className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
          >
            <span>{tag}</span>
            <button
              onClick={() => onRemoveTag(tag)}
              className="hover:bg-gray-200 rounded-full p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        {/* タグ追加ボタン */}
        <button
          onClick={onAddTag}
          className="inline-flex items-center gap-1 px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded-full hover:bg-gray-50"
        >
          <Plus className="w-3 h-3" />
          <span>タグを追加</span>
        </button>
      </div>

      {/* 自動付与タグの説明 */}
      {tags.some((tag) => tag.includes('読み取り')) && (
        <p className="text-xs text-gray-500">
          ※ 「紙名刺読み取り」タグは自動付与されました
        </p>
      )}
    </div>
  );
};
