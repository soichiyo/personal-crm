import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Contact } from '../types/Contact';
import { BasicInfo } from './ContactEditModal/BasicInfo';
import { MetInfo } from './ContactEditModal/MetInfo';
import { TagSection } from './ContactEditModal/TagSection';
import { NoteSection } from './ContactEditModal/NoteSection';
import { FollowUpButton } from './ContactEditModal/FollowUpButton';

interface ContactEditModalProps {
  contact: Contact;
  onClose: () => void;
  onSave: (contact: Contact) => void;
  onFollowUpClick?: () => void;
}

export const ContactEditModal: React.FC<ContactEditModalProps> = ({
  contact: initialContact,
  onClose,
  onSave,
  onFollowUpClick,
}) => {
  const [contact, setContact] = useState<Contact>(initialContact);
  const [note, setNote] = useState('');
  const [isFirstRender, setIsFirstRender] = useState(true);

  // 初回レンダリング時はスキップするフラグ
  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  // 自動保存: contactが変更されたら自動的にonSaveを呼ぶ（初回レンダリング時を除く）
  useEffect(() => {
    if (isFirstRender) return;

    const timer = setTimeout(() => {
      onSave(contact);
    }, 500); // 500ms後に自動保存（デバウンス）

    return () => clearTimeout(timer);
  }, [contact]); // onSaveを依存配列から除外

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

  const handleFollowUp = () => {
    if (onFollowUpClick) {
      onFollowUpClick();
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col">
      {/* Screen Identifier */}
      <div className="bg-yellow-400 px-3 py-1 flex items-center justify-center shrink-0">
        <span className="text-xs font-mono font-bold text-gray-900">
          MOB-ADD-EDIT
        </span>
      </div>

      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center shrink-0">
        <button
          onClick={onClose}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-base font-medium">戻る</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* 自動保存メッセージ */}
        <div className="text-center">
          <p className="text-xs text-gray-400">変更は自動で保存されます</p>
        </div>
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
