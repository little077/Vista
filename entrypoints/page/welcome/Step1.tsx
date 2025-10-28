// src/components/Onboarding/Step1.tsx (替换您的原有文件)
import React, { useState } from 'react';
import Button from '@components/Button'; // 请根据您的文件结构调整路径

interface Step1Props {
  onNext: () => void;
}

const config = {
  text: "text-slate-900",
  textSecondary: "text-slate-600",
};

// 包含全新设计的、更小巧精致的图标
const options = [
  {
    id: "drag",
    title: "拖动打开",
    description: "将链接或文本拖拽一小段距离即可预览。",
    icon: (
      // 新图标: 动态指针
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: "long-press",
    title: "长按打开",
    description: "在链接上长按鼠标超过300毫秒来触发。",
    icon: (
      // 新图标: 扩散的波纹
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v.01" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 12h7.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14.25v.01" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12h.01M8.25 12H7.5a2.25 2.25 0 01-2.25-2.25V7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v1.5a2.25 2.25 0 01-2.25 2.25h-.75" />
      </svg>
    ),
  },
  {
    id: "alt-click",
    title: "Alt + 单击",
    description: "按住 Alt 键的同时，单击链接进行预览。",
    icon: (
      // 新图标: Alt键 + 指针
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];


const Step1: React.FC<Step1Props> = ({ onNext }) => {
  const [selected, setSelected] = useState<string | null>("drag");

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="text-center mb-12 md:mb-16">
        <h1 className={`text-4xl md:text-5xl font-bold ${config.text} mb-4 tracking-tight`}>选择您的浏览方式</h1>
        <p className={`text-base md:text-lg ${config.textSecondary} max-w-2xl mx-auto leading-relaxed`}>
          选择最适合您的交互方式来预览链接内容，提升您的浏览体验
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelected(option.id)}
            className={`group relative p-6 rounded-2xl border-2 bg-white cursor-pointer text-left transition-all duration-300
              ${ selected === option.id
                  ? "border-indigo-400 shadow-lg scale-[1.03]"
                  : "border-slate-200 hover:border-indigo-300"
              }`}
          >
            <div className="flex flex-col items-center text-center">
              {/* 图标容器尺寸减小 */}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300
                  ${ selected === option.id
                      ? "bg-indigo-500 text-white scale-110 shadow-md shadow-indigo-500/30"
                      : "bg-slate-100 text-slate-700 group-hover:bg-indigo-100 group-hover:scale-105"
                  }`}
              >
                {/* 内部图标尺寸已在SVG中定义为 w-6 h-6 */}
                {option.icon}
              </div>
              <h3 className={`text-lg font-semibold ${config.text} mb-2`}>{option.title}</h3>
              <p className={`text-sm ${config.textSecondary} leading-relaxed`}>{option.description}</p>
            </div>

            {selected === option.id && (
              <div className="absolute top-4 right-4 animate-in fade-in zoom-in-95 duration-200">
                <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" d="M6 12l5 5 8-8" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="flex gap-4 justify-center">
        <Button variant="secondary" disabled={!selected}>
          试一试
        </Button>
        <Button variant="primary" onClick={onNext} disabled={!selected}>
          下一步
        </Button>
      </div>

      <div className={`text-center mt-12 md:mt-16 ${config.textSecondary} text-sm`}>
        <p>您可以随时在设置中更改浏览方式</p>
      </div>
    </div>
  );
};

export default Step1;