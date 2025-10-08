import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Contact } from '../types/Contact';
import { BasicInfo } from './ContactEditModal/BasicInfo';
import { MetInfo } from './ContactEditModal/MetInfo';
import { TagSection } from './ContactEditModal/TagSection';
import { NoteSection } from './ContactEditModal/NoteSection';
import { FollowUpButton } from './ContactEditModal/FollowUpButton';

interface ContactEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contact: Partial<Contact>) => void;
  initialContact?: Partial<Contact>;
}

export const ContactEditModal: React.FC<ContactEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialContact = {},
}) => {
  const [contact, setContact] = useState<Partial<Contact>>({
    createdDate: new Date(),
    tags: ['紙名刺読み取り'],
    status: 'new',
    ...initialContact,
  });
  const [note, setNote] = useState('');

  const handleChange = (field: keyof Contact, value: any) => {
    setContact((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    // タグ追加のモック - 実際はモーダルを開く
    const newTag = prompt('タグを入力してください');
    if (newTag && contact.tags) {
      setContact((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), newTag],
      }));
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setContact((prev) => ({
      ...prev,
      tags: (prev.tags || []).filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSave = () => {
    if (!contact.name) {
      alert('名前を入力してください');
      return;
    }
    onSave(contact);
  };

  const handleFollowUp = () => {
    alert('フォローアップ提案機能は後で実装します');
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col">
      {/* Screen Identifier */}
      <div className="bg-yellow-400 px-3 py-1 flex items-center justify-center shrink-0">
        <span className="text-xs font-mono font-bold text-gray-900">
          MOB-ADD-EDIT
        </span>
      </div>

      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between shrink-0">
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-900" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">コンタクト編集</h2>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          保存
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* 基本情報 */}
        <section>
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            基本情報
          </h3>
          <BasicInfo contact={contact} onChange={handleChange} />
        </section>

        {/* 出会い情報 */}
        <section>
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            出会い情報
          </h3>
          <MetInfo contact={contact} onChange={handleChange} />
        </section>

        {/* タグ */}
        <section>
          <h3 className="text-base font-semibold text-gray-900 mb-4">タグ</h3>
          <TagSection
            tags={contact.tags || []}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
          />
        </section>

        {/* メモ */}
        <section>
          <h3 className="text-base font-semibold text-gray-900 mb-4">メモ</h3>
          <NoteSection note={note} onChange={setNote} />
        </section>

        {/* フォローアップボタン */}
        <section>
          <FollowUpButton onClick={handleFollowUp} />
        </section>
      </div>
    </div>
  );
};
