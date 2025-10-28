/*
 * @Author: connor connor@duomai.com
 * @Date: 2025-10-27 21:28:00
 * @LastEditors: connor connor@duomai.com
 * @LastEditTime: 2025-10-28 15:00:47
 * @FilePath: \react\entrypoints\page\welcome\ThemePreview.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 推荐您将此组件保存为 `components/ThemePreview.tsx`
import React from 'react';

interface ThemePreviewProps {
  themeId: string;
}

// 定义每个主题的预览样式
const previewStyles: { [key: string]: { bg: string; card: string; accent: string; text: string; special?: string } } = {
  light:     { bg: "bg-slate-100",   card: "bg-white",            accent: "bg-slate-800", text: "bg-slate-300" },
  dark:      { bg: "bg-slate-900",   card: "bg-slate-800",        accent: "bg-slate-200", text: "bg-slate-600" },
  indigo:    { bg: "bg-indigo-50",   card: "bg-white",            accent: "bg-indigo-500",text: "bg-indigo-200" },
  purple:    { bg: "bg-purple-50",   card: "bg-white",            accent: "bg-purple-500",text: "bg-purple-200" },
  bubblegum: { bg: "bg-pink-50",     card: "bg-white",            accent: "bg-pink-500",  text: "bg-pink-200" },
  glass:     { bg: "bg-sky-100",     card: "bg-white/40 backdrop-blur-md border border-white/50", accent: "bg-sky-500/80", text: "bg-white/60", special: "bg-sky-300" },
};

const ThemePreview: React.FC<ThemePreviewProps> = ({ themeId }) => {
  const style = previewStyles[themeId] || previewStyles.light;

  return (
    // 主容器，设定尺寸和基本样式
    <div className={`w-full h-[400px] bg-slate-500 rounded-xl p-4 flex items-center justify-center transition-colors duration-300 ${style.bg}`}>
      
   
    </div>
  );
};

export default ThemePreview;