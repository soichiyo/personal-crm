import React from 'react';
import { Contact } from '../../types/Contact';

interface OrganizationInfoProps {
  contact: Partial<Contact>;
  onChange: (field: keyof Contact, value: any) => void;
}

export const OrganizationInfo: React.FC<OrganizationInfoProps> = ({
  contact,
  onChange,
}) => {
  const organization = contact.organization || {
    name: '',
    title: '',
    address: '',
    url: '',
  };

  const handleOrgChange = (field: string, value: string) => {
    onChange('organization', {
      ...organization,
      [field]: value,
    });
  };

  return (
    <div className="space-y-4">
      {/* 組織名 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          組織名
        </label>
        <input
          type="text"
          value={organization.name || ''}
          onChange={(e) => handleOrgChange('name', e.target.value)}
          placeholder="例: ABC株式会社"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      {/* 組織での役職 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          組織での役職
        </label>
        <input
          type="text"
          value={organization.title || ''}
          onChange={(e) => handleOrgChange('title', e.target.value)}
          placeholder="例: マーケティング部長"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      {/* 住所 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          住所
        </label>
        <input
          type="text"
          value={organization.address || ''}
          onChange={(e) => handleOrgChange('address', e.target.value)}
          placeholder="例: 東京都渋谷区..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      {/* 組織URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          組織のウェブサイト
        </label>
        <input
          type="url"
          value={organization.url || ''}
          onChange={(e) => handleOrgChange('url', e.target.value)}
          placeholder="https://example.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
    </div>
  );
};
