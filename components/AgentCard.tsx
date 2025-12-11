import React from 'react';
import { AgentConfig } from '../types';
import { ArrowRight } from 'lucide-react';
import IconDisplay from './IconDisplay';

interface AgentCardProps {
  agent: AgentConfig;
  onSelect: (agent: AgentConfig) => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, onSelect }) => {
  // Map internal color names to actual Tailwind classes for the card
  const getColorClasses = () => {
    switch (agent.themeColor) {
      case 'orange':
        return {
          hoverBorder: 'group-hover:border-orange-500/50',
          iconBg: 'bg-orange-500/20',
          iconText: 'text-orange-400',
          title: 'group-hover:text-orange-400',
          gradient: 'from-orange-500/10 to-transparent',
          button: 'text-orange-400 group-hover:translate-x-1',
        };
      case 'blue':
        return {
          hoverBorder: 'group-hover:border-blue-500/50',
          iconBg: 'bg-blue-500/20',
          iconText: 'text-blue-400',
          title: 'group-hover:text-blue-400',
          gradient: 'from-blue-500/10 to-transparent',
          button: 'text-blue-400 group-hover:translate-x-1',
        };
      case 'emerald':
        return {
          hoverBorder: 'group-hover:border-emerald-500/50',
          iconBg: 'bg-emerald-500/20',
          iconText: 'text-emerald-400',
          title: 'group-hover:text-emerald-400',
          gradient: 'from-emerald-500/10 to-transparent',
          button: 'text-emerald-400 group-hover:translate-x-1',
        };
      case 'pink':
        return {
          hoverBorder: 'group-hover:border-pink-500/50',
          iconBg: 'bg-pink-500/20',
          iconText: 'text-pink-400',
          title: 'group-hover:text-pink-400',
          gradient: 'from-pink-500/10 to-transparent',
          button: 'text-pink-400 group-hover:translate-x-1',
        };
      default:
        return {
            hoverBorder: 'group-hover:border-white/50',
            iconBg: 'bg-white/10',
            iconText: 'text-white',
            title: 'text-white',
            gradient: '',
            button: 'text-white',
        };
    }
  };

  const colors = getColorClasses();

  return (
    <button
      onClick={() => onSelect(agent)}
      className={`group relative flex flex-col p-6 h-full w-full text-left transition-all duration-300 rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-md hover:bg-slate-800/60 hover:shadow-2xl ${colors.hoverBorder}`}
    >
      {/* Gradient Background Effect */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colors.iconBg} ${colors.iconText} shadow-lg`}>
            <IconDisplay iconKey={agent.iconKey} size={28} />
          </div>
          <div className={`transition-transform duration-300 ${colors.button}`}>
            <ArrowRight size={24} />
          </div>
        </div>

        {/* Content */}
        <div className="mt-2">
            <h3 className={`text-2xl font-bold text-slate-100 mb-1 transition-colors ${colors.title}`}>
                {agent.name}
            </h3>
            <p className={`text-xs font-semibold uppercase tracking-wider mb-3 opacity-70 ${colors.iconText}`}>
                {agent.roleName}
            </p>
            <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                {agent.description}
            </p>
        </div>
      </div>
    </button>
  );
};

export default AgentCard;
