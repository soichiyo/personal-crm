import { useState, useRef } from "react";
import { Camera, FileText, Edit3, ArrowLeft } from "lucide-react";

interface AddModalProps {
  onClose: () => void;
}

type ModalStep = "menu" | "card-scan" | "manual-form";

export const AddModal = ({ onClose }: AddModalProps) => {
  const [step, setStep] = useState<ModalStep>("menu");
  const [cardImage, setCardImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCardScan = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCardImage(reader.result as string);
        setStep("card-scan");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleManualInput = () => {
    setStep("manual-form");
  };

  const handleBack = () => {
    setStep("menu");
    setCardImage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    console.log("Form submitted");
    onClose();
  };

  const renderContent = () => {
    if (step === "menu") {
      return (
        <>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            新しいContactを追加
          </h3>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            onClick={handleCardScan}
            className="w-full bg-blue-50 hover:bg-blue-100 rounded-2xl p-4 mb-3 flex items-center gap-3 transition-colors"
          >
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800">名刺をスキャン</p>
              <p className="text-sm text-gray-600">画像をアップロード</p>
            </div>
          </button>

          <button className="w-full bg-green-50 hover:bg-green-100 rounded-2xl p-4 mb-3 flex items-center gap-3 transition-colors">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800">Prairie Card読み取り</p>
              <p className="text-sm text-gray-600">デジタル名刺から</p>
            </div>
          </button>

          <button
            onClick={handleManualInput}
            className="w-full bg-gray-50 hover:bg-gray-100 rounded-2xl p-4 mb-4 flex items-center gap-3 transition-colors"
          >
            <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
              <Edit3 className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800">手動で入力</p>
              <p className="text-sm text-gray-600">フォームから追加</p>
            </div>
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 text-gray-600 font-medium"
          >
            キャンセル
          </button>
        </>
      );
    }

    if (step === "card-scan") {
      return (
        <>
          <div className="flex items-center mb-4">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h3 className="text-xl font-bold text-gray-800 ml-2">名刺スキャン</h3>
          </div>

          {cardImage && (
            <div className="mb-4">
              <img
                src={cardImage}
                alt="Business card"
                className="w-full rounded-xl object-cover max-h-48"
              />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                名前 *
              </label>
              <input
                type="text"
                required
                placeholder="山田 太郎"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                会社名
              </label>
              <input
                type="text"
                placeholder="株式会社〇〇"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                役職
              </label>
              <input
                type="text"
                placeholder="営業部長"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                出会った場所
              </label>
              <input
                type="text"
                placeholder="〇〇セミナー"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                メモ
              </label>
              <textarea
                rows={3}
                placeholder="メモを追加..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                戻る
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                追加
              </button>
            </div>
          </form>
        </>
      );
    }

    if (step === "manual-form") {
      return (
        <>
          <div className="flex items-center mb-4">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h3 className="text-xl font-bold text-gray-800 ml-2">手動で入力</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                名前 *
              </label>
              <input
                type="text"
                required
                placeholder="山田 太郎"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                会社名
              </label>
              <input
                type="text"
                placeholder="株式会社〇〇"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                役職
              </label>
              <input
                type="text"
                placeholder="営業部長"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                出会った場所
              </label>
              <input
                type="text"
                placeholder="〇〇セミナー"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                タグ
              </label>
              <input
                type="text"
                placeholder="営業, IT業界"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                メモ
              </label>
              <textarea
                rows={3}
                placeholder="メモを追加..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                戻る
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                追加
              </button>
            </div>
          </form>
        </>
      );
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 py-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-6 w-full max-w-sm max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {renderContent()}
      </div>
    </div>
  );
};
