import React from 'react';
import { Scale, Compass, ScanEye, Terminal, Bot } from 'lucide-react';

interface IconDisplayProps {
  iconKey: string;
  className?: string;
  size?: number;
}

const IconDisplay: React.FC<IconDisplayProps> = ({ iconKey, className, size = 24 }) => {
  switch (iconKey) {
    case 'Scale':
      return <Scale size={size} className={className} />;
    case 'Compass':
      return <Compass size={size} className={className} />;
    case 'ScanEye':
      return <ScanEye size={size} className={className} />;
    case 'Terminal':
      return <Terminal size={size} className={className} />;
    default:
      return <Bot size={size} className={className} />;
  }
};

export default IconDisplay;
