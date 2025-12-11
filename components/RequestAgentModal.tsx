import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';

interface RequestAgentModalProps {
  onClose: () => void;
}

const RequestAgentModal: React.FC<RequestAgentModalProps> = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send to backend. Here just mock.
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl relative overflow-hidden animate-slide-up">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">提交成功！</h3>
            <p className="text-slate-400">感谢你的反馈，我们会尽快评估该智能体需求。</p>
          </div>
        ) : (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-2">提交新智能体需求</h2>
            <p className="text-slate-400 text-sm mb-6">
              你有特定的 AI 场景需求吗？告诉我们，我们为你打造专属训练专家。
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  需求描述
                </label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="例如：我需要一个能帮我练习英语口语的智能体..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all resize-none h-32"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
                >
                  取消
                </button>
                <button
                  type="submit"
                  disabled={!description.trim()}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-lg font-bold transition-colors"
                >
                  <Send size={16} />
                  提交
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestAgentModal;
