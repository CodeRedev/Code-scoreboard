import { useState, useEffect, useRef } from 'react';

interface JobCardProps {
  name: string;
  count: number;
  iconClass: string;
  accentColor: string;
  delay?: number;
}

export default function JobCard({ name, count, iconClass, accentColor, delay = 0 }: JobCardProps) {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const mountTimeout = useRef<number | null>(null);

  useEffect(() => {
    mountTimeout.current = window.setTimeout(() => setMounted(true), 300 + delay);
    return () => {
      if (mountTimeout.current !== null) window.clearTimeout(mountTimeout.current);
    };
  }, [delay]);

  return (
    <div
      className={`transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div 
        className={`relative overflow-hidden rounded-xl bg-zinc-900/20 border border-zinc-800/70 backdrop-blur-sm p-3 transition-all duration-300 ${hovered ? 'border-zinc-700 bg-zinc-900/70 scale-[1.02]' : ''}`}
        style={{ boxShadow: hovered ? `0 0 30px -10px ${accentColor}40` : 'none' }}
      >
        <div 
          className="absolute inset-0 opacity-0 transition-opacity duration-300 rounded-xl"
          style={{ background: `linear-gradient(135deg, ${accentColor}10 0%, transparent 50%)`, opacity: hovered ? 1 : 0 }}
        />
        <div className="relative flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-300"
            style={{ 
              background: `linear-gradient(135deg, ${accentColor}20 0%, ${accentColor}05 100%)`,
              transform: hovered ? 'scale(110%)' : 'scale(100%)'
            }}
          >
            <i className={`${iconClass} text-white text-base`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-zinc-400 truncate">{name}</p>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-white">{count}</span>
              {count > 0 && (
                <span 
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: accentColor }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
