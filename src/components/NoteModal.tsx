import { Modal } from "./common/Modal";

interface NoteModalProps {
  isOpen: boolean;
  note: {
    id: string;
    date: string;
    type: string;
    content: string;
  };
  onClose: () => void;
}

export const NoteModal = ({ isOpen, note, onClose }: NoteModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="ノート詳細">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="font-medium">{note.date}</span>
          <span className="px-2 py-1 bg-gray-100 rounded text-xs">
            {note.type === "note" ? "ノート" : note.type}
          </span>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
            {note.content}
          </p>
        </div>
      </div>
    </Modal>
  );
};
