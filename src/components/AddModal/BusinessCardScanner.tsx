import React, { useState } from 'react';
import { X, Camera } from 'lucide-react';

interface BusinessCardScannerProps {
  onClose: () => void;
  onCapture: () => void;
}

export const BusinessCardScanner: React.FC<BusinessCardScannerProps> = ({
  onClose,
  onCapture,
}) => {
  const [isCapturing, setIsCapturing] = useState(false);

  const handleCapture = () => {
    setIsCapturing(true);
    // アニメーション効果のため少し遅延
    setTimeout(() => {
      setIsCapturing(false);
      onCapture();
    }, 300);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black flex flex-col overflow-hidden">
      {/* Screen Identifier */}
      <div className="bg-yellow-400 px-3 py-1 flex items-center justify-center shrink-0">
        <span className="text-xs font-mono font-bold text-gray-900">
          MOB-ADD-SCAN
        </span>
      </div>

      {/* Header */}
      <div className="p-4 flex items-center justify-between bg-black/50 backdrop-blur-sm shrink-0">
        <h2 className="text-white font-semibold">名刺をスキャン</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          aria-label="閉じる"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Camera Preview Area (Mock) */}
      <div className="flex-1 relative flex items-center justify-center bg-gray-900 overflow-hidden">
        {/* カメラプレビューのモック - グラデーション背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black opacity-80" />

        {/* ガイド枠 */}
        <div className="relative z-10 w-[85%] aspect-[1.6/1] border-4 border-white rounded-2xl shadow-2xl">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Camera className="w-16 h-16 text-white/50 mx-auto mb-4" />
              <p className="text-white/70 text-sm">名刺をこの枠に収めてください</p>
            </div>
          </div>

          {/* コーナーマーカー */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-500 rounded-tl-xl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-500 rounded-tr-xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-500 rounded-bl-xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-500 rounded-br-xl" />
        </div>

        {/* キャプチャフラッシュエフェクト */}
        {isCapturing && (
          <div className="absolute inset-0 bg-white animate-in fade-in duration-150" />
        )}
      </div>

      {/* Controls */}
      <div className="p-6 bg-black/50 backdrop-blur-sm flex items-center justify-center gap-8 shrink-0">
        <button
          onClick={onClose}
          className="px-6 py-3 text-white text-sm font-medium hover:bg-white/10 rounded-lg transition-colors"
        >
          キャンセル
        </button>
        <button
          onClick={handleCapture}
          disabled={isCapturing}
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-transform disabled:opacity-50"
        >
          <div className="w-14 h-14 bg-gray-900 rounded-full" />
        </button>
        <div className="w-20" /> {/* Spacer for balance */}
      </div>
    </div>
  );
};
