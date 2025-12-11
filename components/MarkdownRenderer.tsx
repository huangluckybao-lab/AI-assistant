import React from 'react';

// A lightweight renderer to handle basic formatting without heavy dependencies
// Handles: Bold, Code Blocks, Headers, Lists, Paragraphs
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  
  const renderText = (text: string) => {
    // Basic bold parsing (**text**)
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="text-white font-bold">{part.slice(2, -2)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  const lines = content.split('\n');
  const renderedElements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code Blocks
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        // End of code block
        inCodeBlock = false;
        renderedElements.push(
          <div key={`code-${i}`} className="my-4 bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto border border-gray-700">
             <pre className="text-emerald-400">{codeBlockContent.join('\n')}</pre>
          </div>
        );
        codeBlockContent = [];
      } else {
        // Start of code block
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Headers
    if (line.startsWith('### ')) {
      renderedElements.push(<h3 key={i} className="text-lg font-bold mt-4 mb-2 text-blue-300">{renderText(line.slice(4))}</h3>);
    } else if (line.startsWith('## ')) {
      renderedElements.push(<h2 key={i} className="text-xl font-bold mt-6 mb-3 text-blue-200 border-b border-gray-700 pb-1">{renderText(line.slice(3))}</h2>);
    } else if (line.startsWith('# ')) {
      renderedElements.push(<h1 key={i} className="text-2xl font-bold mt-6 mb-4 text-white">{renderText(line.slice(2))}</h1>);
    }
    // List Items
    else if (line.trim().startsWith('- ')) {
       renderedElements.push(<li key={i} className="ml-4 list-disc pl-2 mb-1 text-gray-300">{renderText(line.trim().slice(2))}</li>);
    }
    // Tables (Very basic detection, renders as pre-wrap mono for safety)
    else if (line.includes('|') && line.includes('-')) {
       renderedElements.push(<div key={i} className="font-mono text-xs md:text-sm whitespace-pre-wrap overflow-x-auto text-gray-300 my-2">{line}</div>);
    }
    // Empty lines
    else if (line.trim() === '') {
      renderedElements.push(<div key={i} className="h-2"></div>);
    }
    // Paragraphs / Normal text
    else {
      renderedElements.push(<div key={i} className="mb-1 text-gray-300 leading-relaxed">{renderText(line)}</div>);
    }
  }

  return <div className="markdown-content w-full">{renderedElements}</div>;
};

export default MarkdownRenderer;
