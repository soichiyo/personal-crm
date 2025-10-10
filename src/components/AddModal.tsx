import { useState } from "react";
import { Camera, Edit3 } from "lucide-react";
import {
  BusinessCardScanner,
  CapturedPhoto,
} from "./AddModal/BusinessCardScanner";
import { PhotoPreviewGrid } from "./AddModal/PhotoPreviewGrid";
import { OCRLoading } from "./AddModal/OCRLoading";
import { ContactEditModal } from "./ContactEditModal";
import { Flash, FlashType } from "./common/Flash";
import { Contact } from "../types/Contact";

interface AddModalProps {
  onClose: () => void;
  onAddContacts?: (contacts: Contact[]) => void; // 複数コンタクト追加用コールバック
}

type FlowStep =
  | "menu"
  | "scanner"
  | "preview"
  | "ocr-loading"
  | "edit"
  | "success";

export const AddModal = ({ onClose, onAddContacts }: AddModalProps) => {
  const [step, setStep] = useState<FlowStep>("menu");
  const [newContact, setNewContact] = useState<Partial<Contact>>({});
  const [showFlash, setShowFlash] = useState(false);
  const [flashType, setFlashType] = useState<FlashType>("success");
  const [flashMessage, setFlashMessage] = useState("");
  const [capturedPhotos, setCapturedPhotos] = useState<CapturedPhoto[]>([]); // 撮影した写真

  const handleCardScan = () => {
    setStep("scanner");
  };

  const handleManualInput = () => {
    setNewContact({
      id: Date.now(), // 一時的なID
      name: "",
      company: "",
      title: "",
      source: "手動入力",
      metAt: `${new Date().toLocaleDateString("ja-JP")} - 手動入力`,
      createdDate: new Date(),
      tags: [],
      status: "new",
      avatar: "👤",
      profileEmoji: "👤",
      priority: "medium",
    });
    setStep("edit");
  };

  const handleScanCapture = (photos: CapturedPhoto[]) => {
    // スキャナーからプレビュー画面へ（撮影した写真を記録）
    setCapturedPhotos(photos);
    setStep("preview");
  };

  const handlePhotoRemove = (photoId: string) => {
    // 写真を削除
    setCapturedPhotos(capturedPhotos.filter((p) => p.id !== photoId));
  };

  const handlePreviewConfirm = () => {
    // プレビュー確認後、OCRローディングへ
    setStep("ocr-loading");
  };

  const handlePreviewBack = () => {
    // プレビューからスキャナーに戻る
    setStep("scanner");
  };

  const generateMockContact = (index: number): Contact => {
    const mockNames = [
      {
        name: "山田 太郎",
        company: "ABC株式会社",
        title: "営業部長",
        emoji: "👨‍💼",
      },
      {
        name: "佐藤 花子",
        company: "XYZ Corporation",
        title: "マーケティング担当",
        emoji: "👩‍💼",
      },
      {
        name: "鈴木 次郎",
        company: "Tech Innovations",
        title: "エンジニア",
        emoji: "👨‍💻",
      },
      {
        name: "田中 美咲",
        company: "Design Studio",
        title: "デザイナー",
        emoji: "🎨",
      },
      {
        name: "高橋 健一",
        company: "Venture Capital",
        title: "投資家",
        emoji: "💼",
      },
    ];

    const contact = mockNames[index % mockNames.length];

    return {
      id: Date.now() + index,
      name: contact.name,
      company: contact.company,
      title: contact.title,
      source: "名刺スキャン",
      metAt: `${new Date().toLocaleDateString("ja-JP")} - 名刺読み取り`,
      createdDate: new Date(),
      tags: ["紙名刺読み取り", "未開封"],
      status: "new",
      avatar: contact.emoji,
      profileEmoji: contact.emoji,
      priority: "medium",
    };
  };

  const handleOCRComplete = () => {
    const photoCount = capturedPhotos.length;

    // 複数枚の場合、編集画面をスキップしてHomeに直接追加
    if (photoCount > 1) {
      const newContacts: Contact[] = [];
      for (let i = 0; i < photoCount; i++) {
        newContacts.push(generateMockContact(i));
      }

      // 親コンポーネントに複数コンタクトを渡す
      if (onAddContacts) {
        onAddContacts(newContacts);
      }

      // Flash表示（上部から）
      setFlashType("success");
      setFlashMessage(`${photoCount}件のコンタクトが作成されました！`);
      setShowFlash(true);

      // 1.5秒後にFlashを非表示にしてモーダルを閉じる
      setTimeout(() => {
        setShowFlash(false);
        onClose();
      }, 1500);
    } else {
      // 1枚の場合は従来通り編集画面へ
      setNewContact(generateMockContact(0));

      // Flash表示
      setFlashType("success");
      setFlashMessage("コンタクトが作成されました！");
      setShowFlash(true);

      // 1秒後にFlashを非表示
      setTimeout(() => {
        setShowFlash(false);
      }, 1000);

      setStep("edit");
    }
  };

  const handleSave = (contact: Partial<Contact>) => {
    // 自動保存時の処理（編集中の一時保存）
    setNewContact(contact);
  };

  const handleCloseScanner = () => {
    setStep("menu");
  };

  const handleCloseEdit = () => {
    // 編集画面を閉じるときの処理
    console.log("Saved contact:", newContact);
    onClose();
  };

  // メニュー画面
  if (step === "menu") {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 py-6"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-3xl w-full max-w-sm overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Screen Identifier */}
          <div className="bg-purple-50 border-b border-purple-200 px-3 py-1 flex items-center justify-center relative z-[9998]">
            <span className="text-xs font-mono font-semibold text-purple-900">
              MOB-ADD-MENU
            </span>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              新しい連絡先を追加
            </h3>

            <button
              onClick={handleCardScan}
              className="w-full bg-white hover:bg-gray-50 border border-gray-300 rounded-xl p-4 mb-3 flex items-center gap-3 transition-colors"
            >
              <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">名刺をスキャン</p>
                <p className="text-sm text-gray-600">カメラで撮影</p>
              </div>
            </button>

            <button
              onClick={handleManualInput}
              className="w-full bg-white hover:bg-gray-50 border border-gray-300 rounded-xl p-4 mb-4 flex items-center gap-3 transition-colors"
            >
              <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                <Edit3 className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">手動で入力</p>
                <p className="text-sm text-gray-600">フォームから追加</p>
              </div>
            </button>

            <button
              onClick={onClose}
              className="w-full py-3 text-gray-600 font-medium hover:text-gray-900"
            >
              キャンセル
            </button>
          </div>
        </div>
      </div>
    );
  }

  // スキャナー画面
  if (step === "scanner") {
    return (
      <BusinessCardScanner
        onClose={handleCloseScanner}
        onCapture={handleScanCapture}
      />
    );
  }

  // プレビュー画面
  if (step === "preview") {
    return (
      <PhotoPreviewGrid
        photos={capturedPhotos}
        onRemove={handlePhotoRemove}
        onConfirm={handlePreviewConfirm}
        onBack={handlePreviewBack}
      />
    );
  }

  // OCRローディング画面
  if (step === "ocr-loading") {
    return (
      <>
        <OCRLoading
          onComplete={handleOCRComplete}
          cardCount={capturedPhotos.length}
        />
        <Flash
          type={flashType}
          message={flashMessage}
          isVisible={showFlash}
          onClose={() => setShowFlash(false)}
        />
      </>
    );
  }

  // 編集画面
  if (step === "edit" && newContact.id) {
    return (
      <>
        <ContactEditModal
          contact={newContact as Contact}
          onClose={handleCloseEdit}
          onSave={handleSave}
        />
        <Flash
          type={flashType}
          message={flashMessage}
          isVisible={showFlash}
          onClose={() => setShowFlash(false)}
        />
      </>
    );
  }

  return null;
};
