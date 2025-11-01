import { Behavior as TriggerMode } from "@/src/storage/local-storage-schema"
export interface LinkDetectionConfig {
    /** 触发方式 */
    mode: TriggerMode;
    /** 长按触发时间(毫秒) */
    longPressDelay?: number;
    /** 拖拽触发距离(像素) */
    dragThreshold?: number;
    /** 链接检测回调 */
    onLinkDetected: (url: string, element: Element) => void;
}

// 鼠标按下状态
interface MouseDownState {
    startX: number;
    startY: number;
    startTime: number;
    targetElement: Element;
    timer?: number;
}

/**
 * 链接检测 hooks
 * 支持三种触发方式：长按、拖拽、Alt+点击
 */
export const useLinkDetection = (config: LinkDetectionConfig) => {
    const {
        mode,
        longPressDelay = 800,
        dragThreshold = 10,
        onLinkDetected
    } = config;

    // 存储鼠标按下时的状态
    const mouseStateRef = useRef<MouseDownState | null>(null);
    // 防止重复触发的标记
    const preventClickRef = useRef<boolean>(false);

    /**
     * 从元素中提取链接URL
     * 支持多种链接形式：<a>标签、父级<a>标签、data-*属性等
     */
    const extractLinkUrl = useCallback((element: Element): string | null => {
        // 检查当前元素是否为链接
        if (element.tagName === 'A') {
            const href = (element as HTMLAnchorElement).href;
            return href || null;
        }

        // 向上查找父级链接元素
        let parent = element.parentElement;
        while (parent) {
            if (parent.tagName === 'A') {
                const href = (parent as HTMLAnchorElement).href;
                return href || null;
            }
            parent = parent.parentElement;
        }

        // 检查自定义链接属性
        const customUrl = element.getAttribute('data-href') ||
            element.getAttribute('data-url') ||
            element.getAttribute('data-link');

        if (customUrl) {
            // 如果是相对路径，转换为绝对路径
            try {
                return new URL(customUrl, window.location.href).href;
            } catch {
                return customUrl;
            }
        }

        return null;
    }, []);

    /**
     * 阻止点击事件冒泡（防止触发默认链接行为）
     */
    const preventDefaultClick = useCallback((event: Event) => {
        if (preventClickRef.current) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            // 重置标记
            preventClickRef.current = false;
        }
    }, []);

    /**
     * Alt + 点击处理
     */
    const handleAltClick = useCallback((event: MouseEvent) => {
        // 只在 Alt+点击模式下处理
        if (mode !== TriggerMode.altClick) return;

        // 检查是否按下 Alt 键
        if (!event.altKey) return;

        const target = event.target as Element;
        const url = extractLinkUrl(target);

        if (url) {
            // 阻止默认行为
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            onLinkDetected(url, target);
        }
    }, [mode, extractLinkUrl, onLinkDetected]);

    /**
     * 鼠标按下处理（长按和拖拽模式）
     */
    const handleMouseDown = useCallback((event: MouseEvent) => {
        // 只在长按或拖拽模式下处理
        if (mode !== TriggerMode.longPress && mode !== TriggerMode.drag) return;

        // 只处理鼠标左键
        if (event.button !== 0) return;

        const target = event.target as Element;
        const url = extractLinkUrl(target);

        // 只有检测到链接时才处理
        if (!url) return;

        // 阻止默认行为（如文本选择、链接跳转等）
        event.preventDefault();

        // 记录鼠标按下状态
        mouseStateRef.current = {
            startX: event.clientX,
            startY: event.clientY,
            startTime: Date.now(),
            targetElement: target
        };

        // 设置防止点击标记
        preventClickRef.current = true;

        // 长按模式：设置定时器
        if (mode === TriggerMode.longPress) {
            mouseStateRef.current.timer = window.setTimeout(() => {
                if (mouseStateRef.current) {
                    onLinkDetected(url, target);

                    // （可选但推荐）可以清理一下定时器自身，防止重复
                    if (mouseStateRef.current.timer) {
                        clearTimeout(mouseStateRef.current.timer);
                        mouseStateRef.current.timer = undefined;
                    }
                }
            }, longPressDelay);
        }

    }, [mode, extractLinkUrl, onLinkDetected, longPressDelay]);

    /**
     * 鼠标移动处理（拖拽模式）
     */
    const handleMouseMove = useCallback((event: MouseEvent) => {
        // 只在拖拽模式下处理
        if (mode !== TriggerMode.drag || !mouseStateRef.current) return;

        const state = mouseStateRef.current;

        // 计算拖拽距离
        const deltaX = event.clientX - state.startX;
        const deltaY = event.clientY - state.startY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // 如果拖拽距离超过阈值
        if (distance >= dragThreshold) {
            const url = extractLinkUrl(state.targetElement);

            if (url) {
                onLinkDetected(url, state.targetElement);
            }

            // 清理状态
            if (state.timer) {
                clearTimeout(state.timer);
            }
            mouseStateRef.current = null;
        }
    }, [mode, dragThreshold, extractLinkUrl, onLinkDetected]);

    /**
     * 鼠标松开处理
     */
    const handleMouseUp = useCallback(() => {
        if (mouseStateRef.current) {
            // 清理长按定时器
            if (mouseStateRef.current.timer) {
                clearTimeout(mouseStateRef.current.timer);
            }

            // 清理状态
            mouseStateRef.current = null;
            preventClickRef.current = false;
        }
    }, []);

    /**
     * 清理函数
     */
    const cleanup = useCallback(() => {
        if (mouseStateRef.current?.timer) {
            clearTimeout(mouseStateRef.current.timer);
        }
        mouseStateRef.current = null;
    }, []);
    // 注册事件监听器
    useEffect(() => {
        // 始终监听点击事件以防止默认行为
        if (mode === TriggerMode.altClick || mode === TriggerMode.longPress) {
            document.addEventListener('click', preventDefaultClick,true);
        }


        // 根据模式注册相应的事件监听器
        if (mode === TriggerMode.altClick) {
            document.addEventListener('click', handleAltClick, true);
        } else {
            document.addEventListener('mousedown', handleMouseDown, true);
            document.addEventListener('mousemove', handleMouseMove, true);
            document.addEventListener('mouseup', handleMouseUp, true);
            // 页面失去焦点时也要清理状态
            document.addEventListener('visibilitychange', cleanup);
            document.addEventListener('blur', cleanup);
        }

        // 清理函数
        return () => {
            if (mode === TriggerMode.altClick || mode === TriggerMode.longPress) {
                document.removeEventListener('click', preventDefaultClick, true);
            }

            document.removeEventListener('click', handleAltClick, true);
            document.removeEventListener('mousedown', handleMouseDown, true);
            document.removeEventListener('mousemove', handleMouseMove, true);
            document.removeEventListener('mouseup', handleMouseUp, true);
            document.removeEventListener('visibilitychange', cleanup);
            document.removeEventListener('blur', cleanup);

            // 最终清理
            cleanup();
        };
    }, [mode, preventDefaultClick, handleAltClick, handleMouseDown, handleMouseMove, handleMouseUp, cleanup]);

    return {
        cleanup,
        // 暴露当前状态用于调试
        isActive: mouseStateRef.current !== null
    };
};