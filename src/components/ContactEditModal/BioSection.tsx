import React from 'react';
import { Contact } from '../../types/Contact';

interface BioSectionProps {
  contact: Partial<Contact>;
  onChange: (field: keyof Contact, value: string) => void;
}

export const BioSection: React.FC<BioSectionProps> = ({ contact, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        自己紹介
      </label>
      <textarea
        value={contact.bio || ''}
        onChange={(e) => onChange('bio', e.target.value)}
        placeholder="自己紹介やプロフィールを入力してください..."
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
        rows={4}
      />
      <p className="text-xs text-gray-500 mt-1">
        経歴、専門分野、興味関心などを記載できます
      </p>
    </div>
  );
};
