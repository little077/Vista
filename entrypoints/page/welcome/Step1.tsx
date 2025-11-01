import React, { useState } from "react";
import Button from "@/components/base/Button"; // 请根据您的文件结构调整路径
import { Behavior } from "@/src/storage/local-storage-schema";
import { useAsyncEffect, useUpdateEffect } from "ahooks";
import { LocalStorage } from "@/src/storage";

interface Step1Props {
  onNext: () => void;
}

const config = {
  text: "text-slate-900",
  textSecondary: "text-slate-600",
};

const options = [
  {
    id: Behavior.drag,
    title: "拖动打开",
    description: "将链接拖拽一小段距离即可预览。",
    icon: (
      // 新图标: 动态指针
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1776"
        stroke="currentColor"
        className="w-6 h-6"

      >
        <path
          fill="currentColor"
          d="M85.312 640V85.376h554.624v213.312H554.624v-128h-384v384h128V640H85.312z m256 213.376v-512h512V576h-85.376V426.688H426.624V768h149.312v85.376H341.312z m374.528 157.12L572.16 570.88l437.696 145.28-198.72 95.104-95.36 199.296z"
          p-id="1777"
        ></path>
      </svg>
    ),
  },
  {
    id: Behavior.longPress,
    title: "长按打开",
    description: "在链接上长按鼠标来触发。",
    icon: (
      // 新图标: 扩散的波纹
      <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <title>finger_press_line</title>
        <g id="finger_press_line" fill="none">
          <path d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z" />
          <path
            fill="currentColor"
            d="M10.5 6a2.5 2.5 0 0 1 2.495 2.336L13 8.5v4.605l4.455.606a4 4 0 0 1 3.54 3.772l.005.202V18a7.974 7.974 0 0 1-.77 3.43 1 1 0 0 1-1.807-.86 5.961 5.961 0 0 0 .57-2.265L19 18v-.315a2 2 0 0 0-1.621-1.964l-.183-.027-4.431-.603a2 2 0 0 1-1.759-1.827L11 13.105V8.5a.5.5 0 0 0-.992-.09L10 8.5V17a1 1 0 0 1-1.78.625l-.332-.407-.303-.354c-.579-.657-1.001-1.02-1.36-1.203a1.192 1.192 0 0 0-.694-.137l-.141.02 2.504 5.009a1 1 0 0 1-1.73.996l-.058-.102-2.777-5.553c-.36-.72-.093-1.683.747-2.028 1.043-.427 2.034-.506 3.055.012.222.113.44.252.654.414l.215.17V8.5A2.5 2.5 0 0 1 10.5 6m0-4a6.5 6.5 0 0 1 6.255 8.272 1 1 0 1 1-1.924-.544 4.5 4.5 0 1 0-8.34.817 1 1 0 0 1-1.782.91A6.5 6.5 0 0 1 10.5 2"
          />
        </g>
      </svg>
    ),
  },
  {
    id: Behavior.altClick,
    title: "Alt + 单击",
    description: "按住 Alt 键的同时，单击链接进行预览。",
    icon: (
      // 新图标: Alt键 + 指针
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

const Step1: React.FC<Step1Props> = ({ onNext }) => {
  const [selected, setSelected] = useState<Behavior | null>();
  useUpdateEffect(() => {
    LocalStorage.setItem('behavior', selected as Behavior);
  }, [selected])
  useAsyncEffect(async () => {
    const res = await LocalStorage.getItem('behavior');
    if (res) {
      setSelected(res);
    }
  }, [])


  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="text-center mb-12 md:mb-16">
        <h1
          className={`text-4xl md:text-5xl font-bold ${config.text} mb-4 tracking-tight`}
        >
          选择您的浏览方式
        </h1>
        <p
          className={`text-base md:text-lg ${config.textSecondary} max-w-2xl mx-auto leading-relaxed`}
        >
          选择最适合您的交互方式来预览链接内容，提升您的浏览体验
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelected(option.id)}
            className={`group relative p-6 rounded-2xl border-2 bg-white cursor-pointer text-left transition-all duration-300
              ${selected === option.id
                ? "border-indigo-400 shadow-lg scale-[1.03]"
                : "border-slate-200 hover:border-indigo-300"
              }`}
          >
            <div className="flex flex-col items-center text-center">
              {/* 图标容器尺寸减小 */}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300
                  ${selected === option.id
                    ? "bg-indigo-500 text-white scale-110 shadow-md shadow-indigo-500/30"
                    : "bg-slate-100 text-slate-700 group-hover:bg-indigo-100 group-hover:scale-105"
                  }`}
              >
                {/* 内部图标尺寸已在SVG中定义为 w-6 h-6 */}
                {option.icon}
              </div>
              <h3 className={`text-lg font-semibold ${config.text} mb-2`}>
                {option.title}
              </h3>
              <p className={`text-sm ${config.textSecondary} leading-relaxed`}>
                {option.description}
              </p>
            </div>

            {selected === option.id && (
              <div className="absolute top-4 right-4 animate-in fade-in zoom-in-95 duration-200">
                <svg
                  className="w-6 h-6 text-indigo-500"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12l5 5 8-8"
                  />
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

      <div
        className={`text-center mt-12 md:mt-16 ${config.textSecondary} text-sm`}
      >
        <p>您可以随时在设置中更改浏览方式</p>
      </div>
    </div>
  );
};

export default Step1;
