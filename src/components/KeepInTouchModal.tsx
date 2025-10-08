import React, { useState } from 'react';
import { Contact } from '../types/Contact';
import { Modal } from './common/Modal';
import { X } from 'lucide-react';

interface KeepInTouchModalProps {
  isOpen: boolean;
  contact: Contact;
  onClose: () => void;
  onConfirm: (interval: string) => void;
}

export const KeepInTouchModal: React.FC<KeepInTouchModalProps> = ({
  isOpen,
  contact,
  onClose,
  onConfirm,
}) => {
  const [selectedInterval, setSelectedInterval] = useState<string | null>(null);

  const intervals = [
    { value: '1week', label: '1週間後' },
    { value: '3weeks', label: '3週間後' },
    { value: '1month', label: '1ヶ月後' },
    { value: 'ai', label: '✨ AIにおまかせ' },
  ];

  const handleConfirm = () => {
    if (selectedInterval) {
      onConfirm(selectedInterval);
      setSelectedInterval(null);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-t-2xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">
            {contact.name}さん
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1">
          <p className="text-sm text-gray-700 mb-4">いつ連絡しますか？</p>

          <div className="space-y-2">
            {intervals.map((interval) => (
              <button
                key={interval.value}
                onClick={() => setSelectedInterval(interval.value)}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  selectedInterval === interval.value
                    ? 'bg-blue-50 border-2 border-blue-600'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
              >
                <span className="text-base font-medium text-gray-900">
                  {interval.label}
                </span>
                {interval.value === 'ai' && (
                  <p className="text-xs text-gray-600 mt-1">
                    ビジネス関係の初回フォローアップに最適です
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-100 text-gray-900 font-medium rounded-xl hover:bg-gray-200 transition-colors"
          >
            キャンセル
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedInterval}
            className={`flex-1 px-4 py-3 font-medium rounded-xl transition-colors ${
              selectedInterval
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            設定する
          </button>
        </div>
      </div>
    </Modal>
  );
};
