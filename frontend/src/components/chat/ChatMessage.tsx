import React from 'react';
import { CodeBlock } from './CodeBlock';
import { Bot, User, ShieldAlert, Zap } from 'lucide-react';

export interface Message {
  id: string;
  sender: 'AI' | 'USER';
  text: string;
  timestamp: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  contextLogId?: string;
}

interface ChatMessageProps {
  message: Message;
  onExecuteAction?: (actionText: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onExecuteAction }) => {
  const isAI = message.sender === 'AI';

  return (
    <div className={`flex gap-3 my-4 ${isAI ? 'items-start' : 'items-start flex-row-reverse'}`}>
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
          isAI
            ? 'bg-[#00F0FF]/10 border-[#00F0FF]/30 text-[#00F0FF]'
            : 'bg-white/10 border-white/20 text-white'
        }`}
      >
        {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
      </div>

      {/* Message Content Bubble */}
      <div
        className={`max-w-[80%] rounded-xl p-4 font-mono text-xs leading-relaxed border ${
          isAI
            ? 'bg-[#0B0B0D] border-white/10 text-gray-200'
            : 'bg-[#1C1C1E] border-white/15 text-white'
        }`}
      >
        <div className="flex items-center justify-between gap-4 mb-1.5 border-b border-white/5 pb-1">
          <span className="font-bold text-[11px] text-gray-400">
            {isAI ? 'CYBERNEX CO-PILOT' : 'SECURITY ANALYST'}
          </span>
          <span className="text-[10px] text-gray-500">{message.timestamp}</span>
        </div>

        {message.contextLogId && (
          <div className="mb-2 px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-[#00F0FF] flex items-center gap-1.5">
            <ShieldAlert className="w-3 h-3" />
            <span>Attached Context: Log #{message.contextLogId}</span>
          </div>
        )}

        <p className="whitespace-pre-wrap">{message.text}</p>

        {message.codeSnippet && (
          <CodeBlock
            language={message.codeSnippet.language}
            code={message.codeSnippet.code}
          />
        )}

        {isAI && onExecuteAction && (
          <div className="mt-3 pt-2 border-t border-white/5 flex gap-2">
            <button
              onClick={() => onExecuteAction('Apply Isolation Firewall Rule')}
              className="px-2.5 py-1 rounded bg-[#FF3366]/20 border border-[#FF3366]/40 text-[#FF3366] hover:bg-[#FF3366]/30 transition-all text-[10px] flex items-center gap-1 font-bold"
            >
              <Zap className="w-3 h-3" />
              Auto-Execute Firewall Block
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
