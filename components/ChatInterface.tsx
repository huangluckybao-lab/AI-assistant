import React, { useState, useEffect, useRef } from 'react';
import { AgentConfig, Message } from '../types';
import { startChat, sendMessage } from '../services/geminiService';
import MarkdownRenderer from './MarkdownRenderer';
import { Send, ArrowLeft } from 'lucide-react';
import IconDisplay from './IconDisplay';

interface ChatInterfaceProps {
  agent: AgentConfig;
  onBack: () => void;
  isTutorialMode?: boolean;
  onTutorialComplete?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  agent, 
  onBack, 
  isTutorialMode = false,
  onTutorialComplete 
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chat with Welcome message
    const init = async () => {
      try {
        await startChat(agent.id, agent.systemPrompt);
        setMessages([
          {
            id: 'welcome',
            role: 'model',
            content: agent.welcomeMessage,
            timestamp: Date.now(),
          },
        ]);
      } catch (e) {
        console.error("Failed to start chat", e);
      }
    };
    init();
  }, [agent]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    
    // Mark tutorial as complete on first message
    if (isTutorialMode && onTutorialComplete) {
      onTutorialComplete();
    }

    try {
      const responseText = await sendMessage(userMsg.content);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: responseText,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'model',
          content: '⚠️ 连接错误，请重试。',
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendClick = () => {
    handleSendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(input);
    }
  };

  // Dynamic theme colors based on agent configuration
  const getThemeColors = () => {
    switch(agent.themeColor) {
        case 'orange': return { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', button: 'bg-orange-600 hover:bg-orange-700', bubble: 'bg-orange-600/20 border-orange-500/30' };
        case 'blue': return { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', button: 'bg-blue-600 hover:bg-blue-700', bubble: 'bg-blue-600/20 border-blue-500/30' };
        case 'emerald': return { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', button: 'bg-emerald-600 hover:bg-emerald-700', bubble: 'bg-emerald-600/20 border-emerald-500/30' };
        case 'pink': return { bg: 'bg-pink-500/10', border: 'border-pink-500/30', text: 'text-pink-400', button: 'bg-pink-600 hover:bg-pink-700', bubble: 'bg-pink-600/20 border-pink-500/30' };
        default: return { bg: 'bg-slate-500/10', border: 'border-slate-500/30', text: 'text-slate-400', button: 'bg-slate-600 hover:bg-slate-700', bubble: 'bg-slate-600/20 border-slate-500/30' };
    }
  }

  const theme = getThemeColors();

  return (
    <div className="flex flex-col h-screen w-full bg-slate-950 relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className={`absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-${agent.themeColor}-900 via-slate-950 to-slate-950`} />

        {/* Header */}
        <header className="z-10 flex items-center justify-between px-6 py-4 glass-panel border-b border-slate-800">
            <div className="flex items-center gap-4">
                <button 
                    onClick={onBack}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-300"
                >
                    <ArrowLeft size={20} />
                </button>
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${theme.bg} border ${theme.border}`}>
                        <IconDisplay iconKey={agent.iconKey} className={theme.text} size={20} />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg text-slate-100">{agent.name}</h1>
                        <p className={`text-xs ${theme.text} uppercase tracking-wider font-semibold`}>{agent.roleName}</p>
                    </div>
                </div>
            </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 z-10 scroll-smooth">
            {messages.map((msg) => (
                <div 
                    key={msg.id} 
                    className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                    <div 
                        className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-4 md:p-5 shadow-lg backdrop-blur-sm border 
                        ${msg.role === 'user' 
                            ? 'bg-slate-700 text-slate-100 rounded-tr-none border-slate-600' 
                            : `glass-panel rounded-tl-none ${theme.border} text-slate-200`
                        }`}
                    >
                        {msg.role === 'model' ? (
                            <MarkdownRenderer content={msg.content} />
                        ) : (
                            <div className="whitespace-pre-wrap">{msg.content}</div>
                        )}
                    </div>
                </div>
            ))}
            {isLoading && (
                <div className="flex justify-start w-full">
                    <div className={`glass-panel p-4 rounded-2xl rounded-tl-none ${theme.border} flex items-center gap-2`}>
                         <div className={`w-2 h-2 rounded-full ${theme.button} animate-bounce`} style={{ animationDelay: '0ms' }}/>
                         <div className={`w-2 h-2 rounded-full ${theme.button} animate-bounce`} style={{ animationDelay: '150ms' }}/>
                         <div className={`w-2 h-2 rounded-full ${theme.button} animate-bounce`} style={{ animationDelay: '300ms' }}/>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="z-10 p-4 md:p-6 glass-panel border-t border-slate-800">
            {isTutorialMode && (
              <div className="absolute bottom-full left-0 w-full flex justify-center pb-4 pointer-events-none">
                <button 
                  onClick={() => handleSendMessage("你好，我想做一个 AI 应用")}
                  className="pointer-events-auto animate-slide-up bg-indigo-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-indigo-400 hover:bg-indigo-500 hover:scale-105 transition-all cursor-pointer"
                >
                   <span className="animate-pulse">👆</span> 
                   <span className="font-bold">试着发第一条消息：</span>
                   <span className="opacity-90">"你好，我想做一个 AI 应用"</span>
                </button>
              </div>
            )}

            <div className={`max-w-4xl mx-auto relative flex items-end gap-2 bg-slate-900/50 border rounded-2xl p-2 focus-within:border-slate-500 transition-colors ${isTutorialMode ? 'border-indigo-500 ring-2 ring-indigo-500/20 animate-pulse-glow' : 'border-slate-700'}`}>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={`回复 ${agent.name}...`}
                    className="w-full bg-transparent border-none focus:ring-0 text-slate-200 placeholder-slate-500 resize-none min-h-[44px] max-h-32 py-3 px-2"
                    rows={1}
                />
                <button
                    onClick={handleSendClick}
                    disabled={!input.trim() || isLoading}
                    className={`p-3 rounded-xl transition-all duration-200 flex-shrink-0 mb-0.5
                        ${input.trim() && !isLoading 
                            ? `${theme.button} text-white shadow-lg shadow-${agent.themeColor}-900/50` 
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                >
                   <Send size={20} />
                </button>
            </div>
            <p className="text-center text-xs text-slate-600 mt-3">
                AI 可能会犯错，请核实重要信息。
            </p>
        </div>
    </div>
  );
};

export default ChatInterface;