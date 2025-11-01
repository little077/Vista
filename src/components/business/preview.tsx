import { useCallback, useEffect, useRef } from 'react';
import React, { useState } from 'react';
import { ThemeId, Behavior as TriggerMode } from "@/src/storage/local-storage-schema"
import { useLinkDetection } from '@/src/hooks/useLinkDetection';
import { Rnd } from 'react-rnd';
import { Icon, previewStyles } from '@/entrypoints/page/welcome/ThemePreview';
import { useAsyncEffect, useUpdateEffect } from 'ahooks';
import { LocalStorage } from '@/src/storage';
import { Maximize, Pin, Tv, X, Copy } from 'lucide-react';
import CopyToClipboard from './copy';
import { Tooltip, TooltipContent, TooltipTrigger } from '../base/tooltip';
import Ai from "@/assets/ai.svg?react"

const LinkPreviewComponent: React.FC = () => {
    const [currentMode, setCurrentMode] = useState<TriggerMode>();
    useAsyncEffect(async () => {
        const res = await LocalStorage.getItem('behavior');
        if (res) {
            setCurrentMode(res);
        }
    }, [])
    const [url, setUrl] = useState("")
    const [selectedTheme, setSelectedTheme] = useState<string>("");
    useAsyncEffect(async () => {
        const res = await LocalStorage.getItem("theme");
        if (res) {
            console.log(res)
            setSelectedTheme(res);
        }
    }, [])
    const style = previewStyles[selectedTheme] || previewStyles.light;

    const handleLinkDetected = (url: string, element: Element) => {
        console.log('🔗 检测到链接:', url);
        if (url?.startsWith("javascript")) return

        else if (url.startsWith("http://")) {
            const reUrl = url.replace("http://", "https://")

            setUrl(reUrl)
            return
        }
        else {
            setUrl(url)
        }
    };

    const { isActive } = useLinkDetection({
        mode: currentMode as TriggerMode,
        longPressDelay: 300,
        dragThreshold: 10,
        onLinkDetected: handleLinkDetected
    });

    if (!url) return null

    return (
        <div
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 2147483647 }}
        >
            <Rnd
                className={`border rounded-[12px] relative shadow-[0_25px_50px_-12px_rgb(0,0,0/0.25)] pointer-events-auto ${style.bg}`}
                bounds="window"
                default={{
                    x: Math.max(50, window.innerWidth - 610),
                    y: 50,
                    width: 560,
                    height: Math.min(670, window.innerHeight - 100),
                }}
                minWidth={350}
                minHeight={200}
                maxWidth={Math.min(1400, window.innerWidth - 100)}
                maxHeight={Math.min(800, window.innerHeight - 100)}
                dragHandleClassName="drag-handle"
            >
                <div className="drag-handle h-[52px] px-[16px] box-border flex gap-[16px] items-center cursor-move">
                    <div className="relative flex w-full justify-between">
                        <div
                            className={`
                                px-[12px] py-[6px] truncate rounded-[6px] box-border overflow-hidden
                                max-w-[30%] text-[14px] ${style.urlText}
                                ${style.urlBox} shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.04)]
                            `}
                        >
                            {url ? url : "https://example.com "}
                        </div>
                        <div className='h-[32px] ml-[6px] size-full flex items-center'>
                            <CopyToClipboard
                                text={url}
                                className={style.iconColor}
                            />
                        </div>
                        <div className="flex items-center gap-[8px]">
                            <Icon>
                                <Tv size={16} className={style.iconColor} />
                            </Icon>
                            <Icon>
                                <Pin size={16} className={style.iconColor} />
                            </Icon>
                            <Icon>
                                <Maximize size={16} className={style.iconColor} />
                            </Icon>
                            <Icon onClick={() => { setUrl("") }}>
                                <X size={16} className={style.iconColor} />
                            </Icon>
                        </div>
                    </div>
                </div>
                <div className="px-[6px] pb-[6px] h-[calc(100%-52px)]">
                    <iframe
                        src={url}
                        className="flex-1 border-none w-full h-full"
                        title="预览窗口"
                        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                    />
                </div>
                <div className={
                    ` absolute -left-[42px] top-1/2 -translate-y-1/2 h-[108px]  w-[42px] px-[4px]  rounded-[12px] `
                }>
                    <div className={`${style.bg} flex gap-[4px] px-[2px] py-[4px] rounded-[8px] flex-col items-center h-full`}>
                        <Icon>
                            <Ai className={style.iconColor} width={24} height={24} />
                        </Icon>
                    </div>
                </div>
            </Rnd>

        </div>
    );
};

export default LinkPreviewComponent;