import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState
} from "react"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Copy, Highlighter, Sparkles, Book } from "lucide-react"

// --- ToolbarButton 子组件 ---
interface ToolbarButtonProps {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    onClick: () => void;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
    label,
    icon: Icon,
    onClick
}) => (
    <button
        title={label}
        className="size-[32px] flex items-center justify-center rounded-[6px] text-gray-600 transition-colors duration-200 hover:bg-gray-100 focus:outline-none"
        aria-label={label}
        onClick={onClick}
    >
        <Icon className="size-[16px]" />
    </button>
);

// --- 核心浮动工具栏组件 ---
const FloatingToolbar: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const toolbarRef = useRef<HTMLDivElement>(null);
    const rangeRef = useRef<Range | null>(null);
    // 添加一个强制更新位置的状态
    const [positionKey, setPositionKey] = useState(0);

    /**
     * 隐藏菜单并清理状态
     */
    const hideMenu = useCallback(() => {
        setIsVisible(false);
        rangeRef.current = null;
        // 清除当前选区
        const selection = window.getSelection();
        if (selection) {
            selection.removeAllRanges();
        }
    }, []);

    /**
     * 核心逻辑：计算工具栏的位置
     */
    const updatePosition = useCallback(() => {
        if (!toolbarRef.current || !rangeRef.current) return;

        const toolbarRect = toolbarRef.current.getBoundingClientRect();
        const rangeRect = rangeRef.current.getBoundingClientRect();

        // 如果选区不可见（例如滚动到屏幕外），则隐藏菜单
        if (rangeRect.width === 0 && rangeRect.height === 0) {
            hideMenu();
            return;
        }

        // 垂直定位：优先在下方显示，若空间不足则显示在上方
        const spaceBelow = window.innerHeight - rangeRect.bottom;
        const spaceAbove = rangeRect.top;
        const verticalMargin = 10;
        let top: number;

        if (
            spaceBelow < toolbarRect.height + verticalMargin &&
            spaceAbove > toolbarRect.height + verticalMargin
        ) {
            // 在上方显示
            top = rangeRect.top - toolbarRect.height - verticalMargin;
        } else {
            // 在下方显示
            top = rangeRect.bottom + verticalMargin;
        }

        // 水平定位：居中于选区，但要防止溢出屏幕
        const horizontalMargin = 10;
        let left =
            rangeRect.left + rangeRect.width / 2 - toolbarRect.width / 2;

        // 防止左侧溢出
        if (left < horizontalMargin) {
            left = horizontalMargin;
        }
        // 防止右侧溢出
        if (left + toolbarRect.width > window.innerWidth - horizontalMargin) {
            left = window.innerWidth - toolbarRect.width - horizontalMargin;
        }

        setPosition({ x: left, y: top });
    }, [hideMenu]);

    /**
     * 使用 useLayoutEffect 在菜单可见时或位置需要更新时计算位置
     */
    useLayoutEffect(() => {
        if (isVisible) {
            updatePosition();
        }
    }, [isVisible, positionKey, updatePosition]);

    /**
     * 管理所有 DOM 事件监听
     */
    useEffect(() => {
        const handleMouseUp = (event: MouseEvent) => {
            // 延迟以确保 window.getSelection() 获取到最新的选区
            setTimeout(() => {
                const selection = window.getSelection();
                const selectedText = selection?.toString().trim();

                if (selectedText && selection?.rangeCount) {
                    // 检查点击事件是否发生在工具栏内部，如果是，则不处理
                    if (toolbarRef.current?.contains(event.target as Node)) {
                        return;
                    }

                    const newRange = selection.getRangeAt(0);
                    const oldRange = rangeRef.current;

                    // 检查是否是新的选区
                    const isNewSelection = !oldRange ||
                        oldRange.startContainer !== newRange.startContainer ||
                        oldRange.startOffset !== newRange.startOffset ||
                        oldRange.endContainer !== newRange.endContainer ||
                        oldRange.endOffset !== newRange.endOffset;

                    rangeRef.current = newRange;

                    if (isNewSelection) {
                        // 如果是新选区，强制更新位置
                        setPositionKey(prev => prev + 1);
                    }

                    setIsVisible(true);
                } else {
                    // 如果没有选择文本，或者点击了其他地方，则隐藏菜单
                    if (!toolbarRef.current?.contains(event.target as Node)) {
                        hideMenu();
                    }
                }
            }, 10);
        };

        // 监听点击事件，点击工具栏外部时隐藏菜单
        const handleClickOutside = (event: MouseEvent) => {
            if (toolbarRef.current && !toolbarRef.current.contains(event.target as Node)) {
                // 延迟检查，确保不是正在进行文本选择
                setTimeout(() => {
                    const selection = window.getSelection();
                    const selectedText = selection?.toString().trim();
                    if (!selectedText) {
                        hideMenu();
                    }
                }, 10);
            }
        };

        const handleScroll = () => {
            if (isVisible) {
                updatePosition();
            }
        };

        // 处理窗口大小变化
        const handleResize = () => {
            if (isVisible) {
                updatePosition();
                setPositionKey(prev => prev + 1);
            }
        };

        // 监听键盘事件，按 Escape 键隐藏菜单
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isVisible) {
                hideMenu();
            }
        };

        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("click", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        window.addEventListener("scroll", handleScroll, true);
        window.addEventListener("resize", handleResize);

        return () => {
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("scroll", handleScroll, true);
            window.removeEventListener("resize", handleResize);
        };
    }, [isVisible, updatePosition, hideMenu]);

    // --- 菜单项点击事件处理 ---
    const handleCopy = useCallback(async () => {
        try {
            const text = window.getSelection()?.toString() || "";
            if (text) {
                await navigator.clipboard.writeText(text);
                console.log("已复制:", text);
            }
        } catch (error) {
            console.error("复制失败:", error);
        } finally {
            // 确保菜单被隐藏
            hideMenu();
        }
    }, [hideMenu]);

    const handleHighlight = useCallback(() => {
        console.log("执行高亮操作");
        // 在这里可以实现你的高亮逻辑
        hideMenu();
    }, [hideMenu]);

    const handleAIAction = useCallback(() => {
        console.log("执行AI操作，选中文本:", window.getSelection()?.toString());
        // 在这里可以触发AI总结、解释等
        hideMenu();
    }, [hideMenu]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    ref={toolbarRef}
                    key={positionKey}
                    className="bg-white rounded-[8px] shadow-lg border border-gray-200 flex items-center gap-[4px] p-[4px]"
                    style={{
                        position: "fixed",
                        top: `${position.y}px`,
                        left: `${position.x}px`,
                        zIndex: 2147483647
                    }}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300, duration: 0.1 }}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <ToolbarButton label="复制" icon={Copy} onClick={handleCopy} />
                    {/* <ToolbarButton label="高亮" icon={Highlighter} onClick={handleHighlight} />
                    <div className="w-px h-[24px] bg-gray-200 mx-[4px]"></div>
                    <ToolbarButton label="询问ai" icon={Sparkles} onClick={handleAIAction} />
                    <ToolbarButton label="添加到笔记" icon={Book} onClick={handleAIAction} /> */}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FloatingToolbar;