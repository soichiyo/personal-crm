import { useState } from "react";
import { Camera, Edit3 } from "lucide-react";
import { BusinessCardScanner } from "./AddModal/BusinessCardScanner";
import { OCRLoading } from "./AddModal/OCRLoading";
import { ContactEditModal } from "./ContactEditModal";
import { Toast, ToastType } from "./common/Toast";
import { Contact } from "../types/Contact";

interface AddModalProps {
  onClose: () => void;
}

type FlowStep = "menu" | "scanner" | "ocr-loading" | "edit" | "success";

export const AddModal = ({ onClose }: AddModalProps) => {
  const [step, setStep] = useState<FlowStep>("menu");
  const [newContact, setNewContact] = useState<Partial<Contact>>({});
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<ToastType>("success");
  const [toastMessage, setToastMessage] = useState("");

  const handleCardScan = () => {
    setStep("scanner");
  };

  const handleManualInput = () => {
    setNewContact({
      source: "手動入力",
      createdDate: new Date(),
      tags: [],
      status: "new",
    });
    setStep("edit");
  };

  const handleScanCapture = () => {
    // スキャナーからOCRローディングへ
    setStep("ocr-loading");
  };

  const handleOCRComplete = () => {
    // OCR完了後、モックデータを設定して編集画面へ
    setNewContact({
      name: "山田 太郎",
      company: "ABC株式会社",
      title: "営業部長",
      source: "名刺スキャン",
      createdDate: new Date(),
      tags: ["紙名刺読み取り"],
      status: "new",
      avatar: "👨‍💼",
    });
    setStep("edit");
  };

  const handleSave = (contact: Partial<Contact>) => {
    // 保存処理（モック）
    console.log("Saved contact:", contact);

    // Toastを表示
    setToastType("success");
    setToastMessage("作成されました！");
    setShowToast(true);

    // 0.8秒後にモーダルを閉じる
    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 800);
  };

  const handleCloseScanner = () => {
    setStep("menu");
  };

  const handleCloseEdit = () => {
    setStep("menu");
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
          <div className="bg-yellow-400 px-3 py-1 flex items-center justify-center">
            <span className="text-xs font-mono font-bold text-gray-900">
              MOB-ADD-MENU
            </span>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              新しいContactを追加
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

  // OCRローディング画面
  if (step === "ocr-loading") {
    return <OCRLoading onComplete={handleOCRComplete} />;
  }

  // 編集画面
  if (step === "edit") {
    return (
      <>
        <ContactEditModal
          isOpen={true}
          onClose={handleCloseEdit}
          onSave={handleSave}
          initialContact={newContact}
        />
        <Toast
          type={toastType}
          message={toastMessage}
          isVisible={showToast}
          onClose={() => setShowToast(false)}
        />
      </>
    );
  }

  return null;
};
