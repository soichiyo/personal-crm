import React from "react";
import { X, Upload } from "lucide-react";

interface CapturedPhoto {
  id: string;
  timestamp: number;
}

interface PhotoPreviewGridProps {
  photos: CapturedPhoto[];
  onRemove: (id: string) => void;
  onConfirm: () => void;
  onBack: () => void;
}

export const PhotoPreviewGrid: React.FC<PhotoPreviewGridProps> = ({
  photos,
  onRemove,
  onConfirm,
  onBack,
}) => {
  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col overflow-hidden">
      {/* Screen Identifier */}
      <div className="bg-purple-50 border-b border-purple-200 px-3 py-1 flex items-center justify-center shrink-0 relative z-[9998]">
        <span className="text-xs font-mono font-semibold text-purple-900">
          MOB-ADD-PREVIEW
        </span>
      </div>

      {/* Header */}
      <div className="p-4 flex items-center justify-between bg-white border-b border-gray-200 shrink-0">
        <h2 className="text-lg font-semibold text-gray-900">
          撮影した名刺を確認
        </h2>
        <button
          onClick={onBack}
          className="text-sm text-gray-600 hover:text-gray-900 font-medium"
        >
          戻る
        </button>
      </div>

      {/* Photo Grid */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {photos.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 text-sm">撮影した写真がありません</p>
              <button
                onClick={onBack}
                className="mt-4 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800"
              >
                撮影画面に戻る
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-4">
              {photos.length}枚の名刺を撮影しました
            </p>
            <div className="grid grid-cols-2 gap-3">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative aspect-[1.6/1] bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-xl overflow-hidden shadow-md group"
                >
                  {/* モック画像（グラデーション） */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <div className="text-4xl mb-2">📇</div>
                      <p className="text-xs font-mono">
                        Photo #{photo.id.slice(-4)}
                      </p>
                    </div>
                  </div>

                  {/* 削除ボタン */}
                  <button
                    onClick={() => onRemove(photo.id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 active:scale-95"
                    aria-label="削除"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* ホバー時のオーバーレイ */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Bottom Actions */}
      {photos.length > 0 && (
        <div className="p-4 bg-white border-t border-gray-200 shrink-0">
          <button
            onClick={onConfirm}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg active:scale-95"
          >
            <Upload className="w-5 h-5" />
            取り込む ({photos.length}枚)
          </button>

          <button
            onClick={onBack}
            className="w-full mt-2 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            さらに撮影する
          </button>
        </div>
      )}
    </div>
  );
};
