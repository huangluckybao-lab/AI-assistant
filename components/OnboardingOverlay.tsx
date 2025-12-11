import React, { useState } from 'react';
import { AGENTS } from '../constants';
import IconDisplay from './IconDisplay';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';

interface OnboardingOverlayProps {
  onComplete: () => void;
  onStartExperience: (agentId: string) => void;
}

const OnboardingOverlay: React.FC<OnboardingOverlayProps> = ({ onComplete, onStartExperience }) => {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep(prev => prev + 1);

  // Step 1: Welcome Intro
  if (step === 0) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-xl animate-fade-in text-center px-6">
        <div className="max-w-2xl w-full">
           <div className="mb-8 flex justify-center">
             <div className="w-20 h-20 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/50 animate-pulse-glow">
                <span className="text-4xl">🚀</span>
             </div>
           </div>
           
           <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-slide-up delay-100">
             欢迎来到 <span className="text-indigo-400">AI Nexus</span>
           </h1>
           <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed animate-slide-up delay-200">
             这里不是普通的聊天工具，而是一个由 4 位专家智能体组成的<br/>
             <strong className="text-white">高阶 AI 实战训练营</strong>。
           </p>

           <div className="animate-slide-up delay-300">
             <button 
                onClick={nextStep}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
             >
                开启训练之旅
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </button>
           </div>
        </div>
      </div>
    );
  }

  // Step 2: Agent Showcase
  if (step === 1) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-xl animate-fade-in px-4">
        <div className="max-w-5xl w-full">
            <h2 className="text-3xl font-bold text-center text-white mb-12 animate-slide-up">
              认识你的导师团队
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 animate-slide-up delay-200">
              {AGENTS.map((agent, index) => (
                <div key={agent.id} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center hover:border-indigo-500/50 transition-colors">
                   <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-4 bg-${agent.themeColor}-500/20 text-${agent.themeColor}-400`}>
                      <IconDisplay iconKey={agent.iconKey} size={24} />
                   </div>
                   <h3 className="font-bold text-white mb-1">{agent.name}</h3>
                   <p className="text-xs text-slate-400 font-medium uppercase mb-2">{agent.roleName}</p>
                   <p className="text-xs text-slate-500 leading-snug">{agent.description.slice(0, 30)}...</p>
                </div>
              ))}
            </div>

            <div className="text-center animate-slide-up delay-500">
              <p className="text-slate-400 mb-6">为了让你快速上手，我们推荐从 <strong className="text-blue-400">发发 (战略顾问)</strong> 开始。</p>
              <button 
                onClick={() => {
                  onStartExperience('fafa'); // Auto-select Fafa
                }}
                className="group inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-all shadow-lg shadow-blue-900/50"
              >
                开始第一次实战体验
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={onComplete} // Skip tutorial
                className="block mx-auto mt-6 text-sm text-slate-500 hover:text-slate-300 underline underline-offset-4"
              >
                我已熟悉，直接进入
              </button>
            </div>
        </div>
      </div>
    );
  }

  return null;
};

export default OnboardingOverlay;
