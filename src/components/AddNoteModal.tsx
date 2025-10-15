import { useState } from "react";
import { Plus } from "lucide-react";
import { Contact } from "../types/Contact";
import { Modal } from "./common/Modal";

interface AddNoteModalProps {
  isOpen: boolean;
  contact: Contact;
  onClose: () => void;
  onAddNote: (note: string) => void;
}

export const AddNoteModal = ({
  isOpen,
  contact,
  onClose,
  onAddNote,
}: AddNoteModalProps) => {
  const [noteText, setNoteText] = useState("");

  const handleAddNote = () => {
    if (!noteText.trim()) return;
    onAddNote(noteText);
    setNoteText("");
    // onClose()は親コンポーネント(MobileView)のhandleAddNote内で呼ばれる
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${contact.name}さんにメモを追加`}
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          メモ内容
        </label>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="会話で印象に残ったこと、今後のアクション、その他のメモを入力してください..."
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-900"
          rows={4}
          autoFocus
        />
      </div>

      {/* Footer */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <button
          onClick={onClose}
          className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          キャンセル
        </button>
        <button
          onClick={handleAddNote}
          disabled={!noteText.trim()}
          className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          追加
        </button>
      </div>
    </Modal>
  );
};
