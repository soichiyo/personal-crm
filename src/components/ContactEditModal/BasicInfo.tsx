import React, { useRef } from 'react';
import { Camera } from 'lucide-react';
import { Contact } from '../../types/Contact';

interface BasicInfoProps {
  contact: Partial<Contact>;
  onChange: (field: keyof Contact, value: string) => void;
}

export const BasicInfo: React.FC<BasicInfoProps> = ({ contact, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // ファイルをData URLに変換
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        onChange('photoUrl', result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      {/* プロフィール写真/絵文字 */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div
            className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-5xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handlePhotoClick}
          >
            {contact.photoUrl ? (
              <img
                src={contact.photoUrl}
                alt={contact.name || 'Profile'}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{contact.profileEmoji || contact.avatar || '👤'}</span>
            )}
          </div>
          <button
            onClick={handlePhotoClick}
            className="absolute bottom-0 right-0 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
            type="button"
          >
            <Camera className="w-4 h-4 text-white" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </div>
      </div>

      {contact.photoUrl && (
        <div className="flex justify-center">
          <button
            onClick={() => onChange('photoUrl', '')}
            className="text-sm text-red-600 hover:text-red-700"
            type="button"
          >
            写真を削除
          </button>
        </div>
      )}

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

      {/* 読み仮名 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          読み仮名
        </label>
        <input
          type="text"
          value={contact.nameReading || ''}
          onChange={(e) => onChange('nameReading', e.target.value)}
          placeholder="やまだ たろう"
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

      {/* キャッチフレーズ */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          キャッチフレーズ
        </label>
        <input
          type="text"
          value={contact.tagline || ''}
          onChange={(e) => onChange('tagline', e.target.value)}
          placeholder="例: デジタルマーケティングの専門家"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      {/* メール（オプション） */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          メールアドレス
        </label>
        <input
          type="email"
          value={contact.email || ''}
          onChange={(e) => onChange('email', e.target.value)}
          placeholder="example@company.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      {/* 電話（オプション） */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          電話番号
        </label>
        <input
          type="tel"
          value={contact.phone || ''}
          onChange={(e) => onChange('phone', e.target.value)}
          placeholder="03-1234-5678"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      {/* 誕生日 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          誕生日 🎂
        </label>
        <input
          type="date"
          value={
            contact.birthday
              ? new Date(contact.birthday).toISOString().split('T')[0]
              : ''
          }
          onChange={(e) => {
            const dateValue = e.target.value ? new Date(e.target.value) : undefined;
            onChange('birthday', dateValue as any);
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
        {contact.birthday && (
          <p className="text-xs text-gray-500 mt-1">
            {new Date(contact.birthday).toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}
      </div>
    </div>
  );
};
