import React, { useState } from 'react';
import { AGENTS } from '../constants';
import { AgentConfig } from '../types';
import AgentCard from '../components/AgentCard';
import RequestAgentModal from '../components/RequestAgentModal';
import { Sparkles, Cpu, Zap, BrainCircuit, PlusCircle } from 'lucide-react';

interface LandingPageProps {
  onSelectAgent: (agent: AgentConfig) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelectAgent }) => {
  const [showRequestModal, setShowRequestModal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden font-sans selection:bg-indigo-500/30">
      
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 py-12 md:py-20 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-medium text-slate-400 mb-6 uppercase tracking-widest animate-fade-in">
            <Sparkles size={12} className="text-indigo-400" />
            AI Nexus 智能体实战训练营
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight animate-slide-up delay-100">
            掌握 AI 核心实战能力 <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              与专家智能体并肩作战
            </span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed mb-8 animate-slide-up delay-200">
            接入由四位顶尖专家组成的 AI 顾问团队，全方位提升你的战略规划、提示词工程及场景落地能力。
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-slate-500 text-sm font-medium animate-slide-up delay-300">
             <div className="flex items-center gap-2"><Cpu size={16}/> Gemini 3 Pro 驱动</div>
             <div className="flex items-center gap-2"><Zap size={16}/> 实时战略分析</div>
             <div className="flex items-center gap-2"><BrainCircuit size={16}/> 多智能体协同</div>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20 animate-slide-up delay-500">
          {AGENTS.map((agent) => (
            <div key={agent.id} className="h-full">
              <AgentCard agent={agent} onSelect={onSelectAgent} />
            </div>
          ))}
        </div>
        
        {/* New Request Button */}
        <div className="text-center animate-slide-up delay-700">
           <button 
             onClick={() => setShowRequestModal(true)}
             className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 hover:bg-slate-800 transition-all text-sm font-semibold"
           >
             <PlusCircle size={16} />
             我有新想法？提交智能体需求
           </button>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-slate-600 text-sm">
            <p>© 2024 AI Nexus. Powered by Google Gemini 3 Pro Preview.</p>
        </footer>
      </div>

      {showRequestModal && (
        <RequestAgentModal onClose={() => setShowRequestModal(false)} />
      )}
    </div>
  );
};

export default LandingPage;
