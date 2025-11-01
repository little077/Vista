import React, { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { Icon } from '@/entrypoints/page/welcome/ThemePreview';

const CopyIconElegant = ({
    text,
    onCopy,
    className
}: {
    text?: string; // 要复制的文本
    onCopy?: () => void; // 可选的外部复制处理函数
    className?: string;
}) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        try {
            if (onCopy) {
                // 如果传入了外部处理函数，使用外部逻辑
                onCopy();
            } else if (text) {
                // 否则使用内部复制逻辑
                await navigator.clipboard.writeText(text);
            }
            setIsCopied(true);
        } catch (error) {
            console.error('复制失败:', error);
            // 可以在这里添加错误处理，比如显示错误提示
        }
    };

    useEffect(() => {
        if (isCopied) {
            const timer = setTimeout(() => {
                setIsCopied(false);
            }, 2000); // 3秒后恢复

            return () => clearTimeout(timer);
        }
    }, [isCopied]);

    return (
        <Icon onClick={handleCopy}>
            {/* 使用相对定位容器来堆叠图标 */}
            <div className="relative size-[16px]">
                {/* 对勾图标 */}
                <Check
                    size={16}
                    className={`
            absolute transition-opacity duration-300
            ${isCopied ? 'opacity-100' : 'opacity-0'}
            text-green-500
            ${className}
          `}
                />
                {/* 复制图标 */}
                <Copy
                    size={16}
                    className={`
            absolute transition-opacity duration-300
            ${isCopied ? 'opacity-0' : 'opacity-100'}
            ${className}
          `}
                />
            </div>
        </Icon>
    );
};

export default CopyIconElegant;
