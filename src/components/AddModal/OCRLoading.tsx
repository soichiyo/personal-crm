import React, { useEffect, useState } from 'react';
import { Loading } from '../common/Loading';

interface OCRLoadingProps {
  onComplete: () => void;
}

export const OCRLoading: React.FC<OCRLoadingProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // プログレスバーのアニメーション
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // 2-3秒後に完了
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center">
      {/* Screen Identifier */}
      <div className="absolute top-0 left-0 right-0 bg-yellow-400 px-3 py-1 flex items-center justify-center shrink-0">
        <span className="text-xs font-mono font-bold text-gray-900">
          MOB-ADD-OCR
        </span>
      </div>

      <Loading size="lg" message="名刺を読み取り中..." />

      {/* プログレスバー */}
      <div className="w-64 mt-8">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gray-900 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center text-xs text-gray-500 mt-2">{progress}%</p>
      </div>

      {/* ヒントテキスト */}
      <div className="mt-8 text-center max-w-xs">
        <p className="text-sm text-gray-600">
          名刺から情報を抽出しています...
        </p>
        <p className="text-xs text-gray-500 mt-2">
          名前、会社名、役職などを自動で認識します
        </p>
      </div>
    </div>
  );
};
