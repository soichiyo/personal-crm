import React from 'react';
import { Contact } from '../../types/Contact';

interface BasicInfoProps {
  contact: Partial<Contact>;
  onChange: (field: keyof Contact, value: string) => void;
}

export const BasicInfo: React.FC<BasicInfoProps> = ({ contact, onChange }) => {
  return (
    <div className="space-y-4">
      {/* プロフィール絵文字 */}
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-5xl">
          {contact.profileEmoji || contact.avatar || '👤'}
        </div>
      </div>

      {/* 名前 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          名前 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={contact.name || ''}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="山田 太郎"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      {/* 会社 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          会社
        </label>
        <input
          type="text"
          value={contact.company || ''}
          onChange={(e) => onChange('company', e.target.value)}
          placeholder="ABC株式会社"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      {/* 役職 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          役職
        </label>
        <input
          type="text"
          value={contact.title || ''}
          onChange={(e) => onChange('title', e.target.value)}
          placeholder="営業部長"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      {/* メール（オプション） */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          メールアドレス
        </label>
        {contact.name ? (
          <input
            type="email"
            placeholder="example@company.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        ) : (
          <button className="text-sm text-gray-500 hover:text-gray-900">
            [追加する]
          </button>
        )}
      </div>

      {/* 電話（オプション） */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          電話番号
        </label>
        {contact.name ? (
          <input
            type="tel"
            placeholder="03-1234-5678"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        ) : (
          <button className="text-sm text-gray-500 hover:text-gray-900">
            [追加する]
          </button>
        )}
      </div>
    </div>
  );
};
