import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface CodeBlockProps {
  language: string;
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 rounded-lg overflow-hidden border border-white/10 bg-black/80 font-mono text-xs">
      <div className="flex items-center justify-between px-3 py-1.5 bg-white/5 border-b border-white/10 text-gray-400 text-[11px]">
        <span className="flex items-center gap-1.5 text-gray-300">
          <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
          {language.toUpperCase()}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-white transition-colors text-[10px]"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-[#CCFF00]" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-3 overflow-x-auto text-gray-200 leading-relaxed">
        <pre>{code}</pre>
      </div>
    </div>
  );
};
