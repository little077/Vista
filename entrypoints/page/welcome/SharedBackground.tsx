// src/components/Onboarding/SharedBackground.tsx

import React from 'react';

interface SharedBackgroundProps {
  children: React.ReactNode;
}

const SharedBackground: React.FC<SharedBackgroundProps> = ({ children }) => {
  return (
    // 'relative' 以便绝对定位的子元素相对于此容器
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-8 overflow-hidden">
      {/* --- 背景遮罩层 (独立) --- */}
      {/* 这个层负责半透明的背景网格效果，它不会影响其他兄弟元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 0, 0, 0.02) 2px, rgba(0, 0, 0, 0.02) 4px), repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.02) 2px, rgba(0, 0, 0, 0.02) 4px)"
          }}
          className="absolute inset-0" 
        />
      </div>
      {/* 所有的页面内容都放在这里，它们将是完全不透明和清晰的 */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-full pt-9">
        {children}
      </div>
    </div>
  );
};

export default SharedBackground;