import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';


import SharedBackground from './welcome/SharedBackground';
import Step1 from './welcome/Step1';
import Step2 from './welcome/Step2';
import Step3 from './welcome/Step3';


const fadeVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5, // 控制渐入速度
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3, // 控制渐出速度
    },
  },
};

const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // 确保 currentStep 是一个有效的数字，默认为 1
  const currentStep = parseInt(searchParams.get('step') || '1', 10) || 1;

  const goToStep = (step: number) => {
    setSearchParams({ step: step.toString() });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 onNext={() => goToStep(2)} />;
      case 2:
        return <Step2 onNext={() => goToStep(3)} onPrev={() => goToStep(1)} />;
      case 3:
        // 在步骤3，我们可能只需要完成按钮，所以不传递 props
        return <Step3 />;
      default:
        // 如果 URL 中的 step 无效，默认显示第一步
        return <Step1 onNext={() => goToStep(2)} />;
    }
  };

  return (
    <SharedBackground>
      <div className="w-full max-w-4xl relative">
        {/* AnimatePresence 用于处理组件进入和退出的动画 */}
        {/* mode="wait" 确保上一个组件完全退出后，下一个才进入 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep} // key 很重要，它告诉 React 和 Framer Motion 何时重新渲染和执行动画
            variants={fadeVariants} 
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 步骤指示器 */}
      {/* <div className="flex gap-3 mt-8 absolute bottom-10 left-1/2 -translate-x-1/2">
        {[1, 2, 3].map(step => (
          <button
            key={step}
            onClick={() => goToStep(step)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentStep === step ? 'bg-slate-800 scale-125' : 'bg-slate-300 hover:bg-slate-400'}`}
            aria-label={`Go to step ${step}`}
          />
        ))}
      </div> */}
    </SharedBackground>
  );
};

export default App;