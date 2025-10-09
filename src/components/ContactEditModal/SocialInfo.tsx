import React from 'react';
import { Contact } from '../../types/Contact';
import { Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

interface SocialInfoProps {
  contact: Partial<Contact>;
  onChange: (field: keyof Contact, value: any) => void;
}

export const SocialInfo: React.FC<SocialInfoProps> = ({ contact, onChange }) => {
  const social = contact.social || {
    linkedin: '',
    twitter: '',
    facebook: '',
    instagram: '',
  };

  const handleSocialChange = (platform: string, value: string) => {
    onChange('social', {
      ...social,
      [platform]: value,
    });
  };

  const socialPlatforms = [
    {
      key: 'linkedin',
      label: 'LinkedIn',
      icon: Linkedin,
      placeholder: 'https://linkedin.com/in/...',
    },
    {
      key: 'twitter',
      label: 'Twitter/X',
      icon: Twitter,
      placeholder: 'https://twitter.com/...',
    },
    {
      key: 'facebook',
      label: 'Facebook',
      icon: Facebook,
      placeholder: 'https://facebook.com/...',
    },
    {
      key: 'instagram',
      label: 'Instagram',
      icon: Instagram,
      placeholder: 'https://instagram.com/...',
    },
  ];

  return (
    <div className="space-y-4">
      {socialPlatforms.map(({ key, label, icon: Icon, placeholder }) => (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <Icon className="w-4 h-4" />
            {label}
          </label>
          <input
            type="url"
            value={(social as any)[key] || ''}
            onChange={(e) => handleSocialChange(key, e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
      ))}
    </div>
  );
};
