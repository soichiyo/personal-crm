import React from 'react';
import { Contact } from '../../types/Contact';

interface MetInfoProps {
  contact: Partial<Contact>;
  onChange: (field: keyof Contact, value: string | Date) => void;
}

export const MetInfo: React.FC<MetInfoProps> = ({ contact, onChange }) => {
  const formatDate = (date?: Date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  return (
    <div className="space-y-4">
      {/* 作成日付 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          作成日
        </label>
        <input
          type="date"
          value={formatDate(contact.createdDate)}
          onChange={(e) => onChange('createdDate', new Date(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      {/* 出会った場所 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          出会った場所
        </label>
        <input
          type="text"
          value={contact.metLocation || ''}
          onChange={(e) => onChange('metLocation', e.target.value)}
          placeholder="東京ビッグサイト、Tech Conference"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
    </div>
  );
};
