// 推荐您将此组件保存为 `components/Button.tsx`
import React from 'react';

// 定义Props类型
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, ...props }) => {
  const baseClasses = "px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  // 固定为 "靛蓝" 主题的配色方案
  const styles = {
    primary: "bg-indigo-500 text-white hover:bg-indigo-600 shadow-md hover:shadow-lg shadow-indigo-500/30",
    secondary: "bg-indigo-100 text-indigo-600 border-2 border-indigo-200 hover:bg-indigo-200",
  };

  const variantClasses = styles[variant];

  return (
    <button className={`${baseClasses} ${variantClasses}`} {...props}>
      {children}
    </button>
  );
};

export default Button;