import React from 'react';
import Button from '@/components/base/Button';

const config = {
  text: "text-slate-900",
  textSecondary: "text-slate-600",
};

const Step3: React.FC = () => {
  const handleFinish = () => {
    // 关闭当前标签页
    browser.tabs.getCurrent(tab => {
        if (tab?.id) {
            browser.tabs.remove(tab.id);
        }
    });
  };

  return (
    <div className="text-center animate-in fade-in duration-500">
      <h2 className={`text-3xl font-bold mb-4 ${config.text}`}>开始体验吧！</h2>
      <p className={`${config.textSecondary} mb-8`}>所有设置已完成，您可以关闭此页面开始使用插件了。</p>
      <Button
        variant="primary"
        onClick={handleFinish}
      >
        完成并关闭
      </Button>
    </div>
  );
};

export default Step3;