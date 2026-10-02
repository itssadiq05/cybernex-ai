import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-30 px-2.5 py-1 text-xs font-medium text-slate-200 bg-[#151619] border border-white/10 rounded shadow-xl whitespace-nowrap pointer-events-none">
          {content}
        </div>
      )}
    </div>
  );
};
