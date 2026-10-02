import React from 'react';

interface LoadingSkeletonProps {
  className?: string;
  count?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ className = 'h-6 w-full', count = 1 }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className={`animate-pulse bg-white/5 rounded-md ${className}`}
        />
      ))}
    </div>
  );
};
