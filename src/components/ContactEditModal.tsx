import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";
import { Contact } from "../types/Contact";
import { BasicInfo } from "./ContactEditModal/BasicInfo";
import { BioSection } from "./ContactEditModal/BioSection";
import { OrganizationInfo } from "./ContactEditModal/OrganizationInfo";
import { SocialInfo } from "./ContactEditModal/SocialInfo";
import { ContentUrlsInfo } from "./ContactEditModal/ContentUrlsInfo";
import { MetInfo } from "./ContactEditModal/MetInfo";
import { TagSection } from "./ContactEditModal/TagSection";
import { DeepSearchButton } from "./ContactEditModal/DeepSearchButton";

interface ContactEditModalProps {
  contact: Contact;
  onClose: () => void;
  onSave: (contact: Contact) => void;
  onDeepSearchClick?: () => void;
}

export const ContactEditModal: React.FC<ContactEditModalProps> = ({
  contact: initialContact,
  onClose,
  onSave,
  onDeepSearchClick,
}) => {
  const [contact, setContact] = useState<Contact>(initialContact);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [showDetailedInfo, setShowDetailedInfo] = useState(false);

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
    const newTag = prompt("タグを入力してください");
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

  const handleDeepSearch = () => {
    if (onDeepSearchClick) {
      onDeepSearchClick();
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

        {/* 自己紹介 */}
        <section>
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            自己紹介
          </h3>
          <BioSection contact={contact} onChange={handleChange} />
        </section>

        {/* 詳細情報（折りたたみ可能） */}
        <section>
          <button
            onClick={() => setShowDetailedInfo(!showDetailedInfo)}
            className="w-full flex items-center justify-between py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            type="button"
          >
            <h3 className="text-base font-semibold text-gray-900">
              詳細情報を{showDetailedInfo ? "非表示" : "追加"}
            </h3>
            {showDetailedInfo ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {showDetailedInfo && (
            <div className="mt-6 space-y-8">
              {/* 組織情報 */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-4">
                  組織情報
                </h4>
                <OrganizationInfo contact={contact} onChange={handleChange} />
              </div>

              {/* SNSリンク */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-4">
                  SNSアカウント
                </h4>
                <SocialInfo contact={contact} onChange={handleChange} />
              </div>

              {/* コンテンツURL */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-4">
                  コンテンツ・ポートフォリオ
                </h4>
                <ContentUrlsInfo contact={contact} onChange={handleChange} />
              </div>
            </div>
          )}
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

        {/* 人物検索ボタン */}
        <section>
          <DeepSearchButton onClick={handleDeepSearch} />
        </section>
      </div>
    </div>
  );
};
