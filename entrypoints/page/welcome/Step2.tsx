import React, { useState } from 'react';
// 引入新创建的组件
import Button from '@components/Button'; // 请根据您的文件结构调整路径
import ThemePreview from './ThemePreview'; // 请根据您的文件结构调整路径

interface StepProps {
  onNext: () => void;
  onPrev: () => void;
}

// 包含全新“玻璃”图标的主题数组 (与上次相同)
const themeColors = [
    {id: "light", name: "浅色", icon: (<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="6" fill="#f1f5f9" /><rect x="6" y="6" width="16" height="16" rx="3" fill="#ffffff" /><rect x="9" y="9" width="4" height="2" rx="1" fill="#64748b" /><rect x="9" y="13" width="10" height="2" rx="1" fill="#cbd5e1" /></svg>)},
    {id: "dark", name: "深色", icon: (<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="6" fill="#1e293b" /><rect x="6" y="6" width="16" height="16" rx="3" fill="#334155" /><rect x="9" y="9" width="4" height="2" rx="1" fill="#94a3b8" /><rect x="9" y="13" width="10" height="2" rx="1" fill="#475569" /></svg>)},
    {id: "glass", name: "玻璃", icon: (<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="28" height="28" rx="6" fill="#f0f9ff"/><circle cx="21" cy="7" r="8" fill="#7dd3fc"/><circle cx="7" cy="21" r="10" fill="#bae6fd"/><rect width="28" height="28" rx="6" fill="white" fillOpacity="0.6"/><rect x="0.75" y="0.75" width="26.5" height="26.5" rx="5.25" stroke="white" strokeOpacity="0.7" strokeWidth="1.5"/></svg>)},
    {id: "indigo", name: "靛蓝", icon: (<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="6" fill="#eef2ff" /><rect x="6" y="6" width="16" height="16" rx="3" fill="#ffffff" /><rect x="9" y="9" width="6" height="3" rx="1.5" fill="#6366f1" /><rect x="9" y="14" width="10" height="2" rx="1" fill="#e0e7ff" /></svg>)},
    {id: "purple", name: "紫色", icon: (<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="6" fill="#f5f3ff" /><rect x="6" y="6" width="16" height="16" rx="3" fill="#ffffff" /><rect x="9" y="9" width="6" height="3" rx="1.5" fill="#a855f7" /><rect x="9" y="14" width="10" height="2" rx="1" fill="#ede9fe" /></svg>)},
    {id: "bubblegum", name: "泡泡糖", icon: (<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="6" fill="#fdf2f8" /><rect x="6" y="6" width="16" height="16" rx="3" fill="#ffffff" /><rect x="9" y="9" width="6" height="3" rx="1.5" fill="#ec4899" /><rect x="9" y="14" width="10" height="2" rx="1" fill="#fce7f3" /></svg>)},
];

const Step2: React.FC<StepProps> = ({ onNext, onPrev }) => {
  const [selectedTheme, setSelectedTheme] = useState<string>('light');

  const config = {
    text: "text-slate-900",
    textSecondary: "text-slate-600",
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className={`text-4xl font-bold ${config.text} mb-4 tracking-tight`}>个性化设置</h1>
        <p className={`text-base ${config.textSecondary} max-w-2xl mx-auto leading-relaxed`}>
          选择喜欢的主题色，并在右侧预览效果
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* 左侧主题色选择 */}
        <div className="flex flex-col">
          <h2 className={`text-xl font-semibold ${config.text} mb-6`}>主题色</h2>
          <div className="grid grid-cols-2 gap-3">
            {themeColors.map(theme => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg bg-white border transition-all duration-150 cursor-pointer
                ${
                  selectedTheme === theme.id
                    ? "border-indigo-400 shadow-md scale-[1.03]" // 选中状态使用主题色
                    : "border-slate-200 hover:border-indigo-300"
                }
                `}
                style={{ minHeight: 48 }}
              >
                <span className="flex items-center justify-center w-8 h-8">{theme.icon}</span>
                <span className={`text-base font-medium ${config.text}`}>{theme.name}</span>
                {selectedTheme === theme.id && (
                  <span className="ml-auto">
                    <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" d="M5 10l4 4 6-7" />
                    </svg>
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 右侧动态预览窗口 */}
        <div className="mt-0 md:mt-12">
            <ThemePreview themeId={selectedTheme} />
        </div>
      </div>

      <div className="flex gap-4 justify-center mt-12">
        <Button variant="secondary" onClick={onPrev}>
          上一步
        </Button>
        <Button variant="primary" onClick={onNext}>
          完成设置
        </Button>
      </div>

      <div className={`text-center mt-8 ${config.textSecondary} text-sm`}>
        <p>您可以随时在设置中更改主题色和其他偏好</p>
      </div>
    </div>
  );
};

export default Step2;