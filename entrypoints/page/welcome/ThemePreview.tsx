import { Tv, Pin, Maximize, X, BookOpen } from "lucide-react";
import React from "react";

interface ThemePreviewProps {
  themeId: string;
}

// 定义每个主题的预览样式
const previewStyles: {
  [key: string]: {
    bg: string;
    iconColor: string;
    urlBox: string;
    urlText: string;
  };
} = {
  light: {
    bg: "bg-white",
    iconColor: "text-slate-600",
    urlBox: "bg-slate-100/80 border-slate-200/50",
    urlText: "text-slate-700",
  },
  indigo: {
    bg: "bg-[#E4EBFF]",
    iconColor: "text-[#666]",
    urlBox: "bg-white/80 border-slate-200/50",
    urlText: "text-slate-700",
  },
  purple: {
    bg: "bg-[#F4EAFF]",
    iconColor: "text-slate-600",
    urlBox: "bg-white/80 border-slate-200/50",
    urlText: "text-slate-700",
  },
  bubblegum: {
    bg: "bg-[#FFE6E9]",
    iconColor: "text-[#666]",
    urlBox: "bg-white/80 border-slate-200/50",
    urlText: "text-slate-700",
  },
  dark: {
    bg: "bg-[#666770]",
    iconColor: "text-white",
    urlBox: "bg-white/90 border-white/20",
    urlText: "text-slate-300",
  },
  glass: {
    bg: "bg-[#B5B5B5]",
    iconColor: "text-white",
    urlBox: "bg-white/90 border-white/30",
    urlText: "text-slate-300",
  },
};

const ThemePreview: React.FC<ThemePreviewProps> = ({ themeId }) => {
  const style = previewStyles[themeId] || previewStyles.light;
console.log(themeId)
  return (
    <div className="w-full flex h-full gap-2 items-center">
      <Toolbar themeId={themeId} />

      {/* 主题色背景 */}
      <div
        className={`w-4/5 h-[400px] shadow-2xl rounded-xl transition-all duration-300 p-2 ${style.bg}`}
      >
        {/* 内容窗口 */}
        <div className="w-full h-full rounded-lg overflow-hidden">

          {/* Header */}
          <div className="px-2 pb-3 flex items-center justify-between min-h-[48px]">
            <div className="flex items-center gap-3 flex-1 mr-4">
              {/* <div className="w-2 h-2 rounded-full bg-slate-400 flex-shrink-0"></div> */}

              {/* URL框 - 固定样式确保可见性 */}
              <div className="relative max-w-xs">
                <div
                  className={`
                    px-3 py-1.5 text-sm ${style.urlText}
                    ${style.urlBox} backdrop-blur-sm 
                    rounded-lg shadow-sm
                  `}
                  style={{
                    boxShadow: `
                      inset 0 1px 2px rgba(0, 0, 0, 0.05),
                      0 1px 3px rgba(0, 0, 0, 0.1)
                    `
                  }}
                >
                  https://example.com
                </div>

                {/* 玻璃反光效果 */}
                <div className="
                  absolute inset-x-0 top-0 h-1/2 
                  bg-gradient-to-b from-white/20 to-transparent 
                  rounded-t-lg pointer-events-none
                "></div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Icon>
                <Tv size={16} className={style.iconColor} />
              </Icon>
              <Icon>
                <Pin size={16} className={style.iconColor} />
              </Icon>
              <Icon>
                <Maximize size={16} className={style.iconColor} />
              </Icon>
              <Icon>
                <X size={16} className={style.iconColor} />
              </Icon>
            </div>
          </div>

          {/* 内容区域 - 固定颜色，不跟随主题 */}
          <div className="relative h-96 bg-slate-50  rounded-md overflow-hidden p-8">
            <div className="animate-pulse h-full flex flex-col gap-3">
              <div className="w-2/5 h-4 bg-slate-200 rounded-full"></div>
              <div className="w-1/5 h-4 bg-slate-300 rounded-full opacity-60"></div>
              <div className="w-4/5 h-4 bg-slate-200 rounded-full"></div>
              <div className="w-2/5 h-4 bg-slate-200 rounded-full"></div>
              <div className="w-3/5 h-4 bg-slate-300 rounded-full opacity-60"></div>
              <div className="w-4/5 h-4 bg-slate-200 rounded-full"></div>
              <div className="w-3/5 h-4 bg-slate-200 rounded-full"></div>
              <div className="w-2/5 h-4 bg-slate-300 rounded-full opacity-60"></div>
              <div className="w-3/5 h-4 bg-slate-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemePreview;

const Icon = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="size-6 flex items-center justify-center">
      {children}
    </div>
  );
};

const Toolbar = ({ themeId }: { themeId: string }) => {
  const style = previewStyles[themeId] || previewStyles.light;

  return (
    <div className={`w-[42px] h-fit shadow-lg border border-slate-200 rounded-lg p-2 ${style.bg}`}>
      <div className="flex flex-col items-center gap-2">
        <Icon>
          <BookOpen size={16} className={style.iconColor} />
        </Icon>
      </div>
    </div>
  );
};

export { Toolbar };