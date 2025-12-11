import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import ChatInterface from './components/ChatInterface';
import OnboardingOverlay from './components/OnboardingOverlay';
import { AgentConfig } from './types';
import { AGENTS } from './constants';

const App: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<AgentConfig | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(true); // Always start as true
  const [isTutorialMode, setIsTutorialMode] = useState(false);

  const handleSelectAgent = (agent: AgentConfig) => {
    setSelectedAgent(agent);
  };

  const handleBack = () => {
    setSelectedAgent(null);
    setIsTutorialMode(false);
  };

  const handleTutorialStart = (agentId: string) => {
    const agent = AGENTS.find(a => a.id === agentId);
    if (agent) {
      setShowOnboarding(false); // Hide overlay
      setIsTutorialMode(true); // Enable tutorial UI in Chat
      setSelectedAgent(agent);
    }
  };

  const handleTutorialComplete = () => {
    setIsTutorialMode(false);
  };

  const handleSkipOnboarding = () => {
    setShowOnboarding(false);
  }

  return (
    <div className="w-full min-h-screen bg-slate-950">
      {showOnboarding && (
        <OnboardingOverlay 
          onComplete={handleSkipOnboarding}
          onStartExperience={handleTutorialStart}
        />
      )}

      {selectedAgent ? (
        <ChatInterface 
          agent={selectedAgent} 
          onBack={handleBack} 
          isTutorialMode={isTutorialMode}
          onTutorialComplete={handleTutorialComplete}
        />
      ) : (
        <LandingPage onSelectAgent={handleSelectAgent} />
      )}
    </div>
  );
};

export default App;