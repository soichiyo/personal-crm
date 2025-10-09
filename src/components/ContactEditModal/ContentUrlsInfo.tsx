import React from 'react';
import { Contact } from '../../types/Contact';
import { Plus, X, Globe } from 'lucide-react';

interface ContentUrlsInfoProps {
  contact: Partial<Contact>;
  onChange: (field: keyof Contact, value: any) => void;
}

export const ContentUrlsInfo: React.FC<ContentUrlsInfoProps> = ({
  contact,
  onChange,
}) => {
  const contentUrls = contact.contentUrls || [];

  const handleAddUrl = () => {
    onChange('contentUrls', [...contentUrls, '']);
  };

  const handleRemoveUrl = (index: number) => {
    const newUrls = contentUrls.filter((_, i) => i !== index);
    onChange('contentUrls', newUrls);
  };

  const handleUrlChange = (index: number, value: string) => {
    const newUrls = [...contentUrls];
    newUrls[index] = value;
    onChange('contentUrls', newUrls);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          ポートフォリオ、ブログ、記事などのURLを追加できます
        </p>
      </div>

      {contentUrls.length === 0 ? (
        <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Globe className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500 mb-3">
            まだコンテンツURLが追加されていません
          </p>
          <button
            onClick={handleAddUrl}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
            type="button"
          >
            <Plus className="w-4 h-4" />
            URLを追加
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {contentUrls.map((url, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => handleUrlChange(index, e.target.value)}
                  placeholder="https://example.com/portfolio"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <button
                  onClick={() => handleRemoveUrl(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  type="button"
                  aria-label="URLを削除"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleAddUrl}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-gray-400 hover:text-gray-700 transition-colors text-sm"
            type="button"
          >
            <Plus className="w-4 h-4" />
            さらに追加
          </button>
        </>
      )}
    </div>
  );
};
