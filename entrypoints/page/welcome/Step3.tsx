import React from 'react';

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
      <h2 className="text-3xl font-bold mb-4">开始体验吧！</h2>
      <p className="text-slate-600 mb-8">所有设置已完成，您可以关闭此页面开始使用插件了。</p>
      <button
        onClick={handleFinish}
        className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors"
      >
        完成并关闭
      </button>
    </div>
  );
};

export default Step3;