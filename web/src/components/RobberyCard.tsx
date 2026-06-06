import { useState, useEffect, useRef } from 'react';

interface RobberyCardProps {
  name: string;
  status: 'available' | 'cooldown' | 'active';
  iconClass: string;
  delay?: number;
}

export default function RobberyCard({ name, status, iconClass, delay = 0 }: RobberyCardProps) {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const mountTimeout = useRef<number | null>(null);

  useEffect(() => {
    mountTimeout.current = window.setTimeout(() => setMounted(true), 500 + delay);
    return () => {
      if (mountTimeout.current !== null) window.clearTimeout(mountTimeout.current);
    };
  }, [delay]);

  const statusConfig = {
    available: {
      color: '#10B981',
      bgClass: 'bg-emerald-500/10',
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    cooldown: {
      color: '#EF4444',
      bgClass: 'bg-rose-500/10',
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
        </svg>
      ),
    },
    active: {
      color: '#EF4444',
      bgClass: 'bg-rose-500/10',
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className={`transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div 
        className={`relative overflow-hidden rounded-xl bg-zinc-900/20 border border-zinc-800/70 backdrop-blur-sm p-3 transition-all duration-300 ${hovered ? 'border-zinc-700 bg-zinc-900/70' : ''}`}
        style={{ boxShadow: hovered ? `0 0 25px -10px ${config.color}30` : 'none' }}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div 
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-300 ${hovered ? 'scale-110' : ''}`}
              style={{ background: `${config.color}15` }}
            >
              <i className={`${iconClass} text-white text-sm`} />
            </div>
            <span className="text-sm font-medium text-zinc-300">{name}</span>
          </div>
          <div 
            className={`w-7 h-7 rounded-lg flex items-center justify-center ${config.bgClass} ${status === 'active' ? 'animate-pulse' : ''}`}
            style={{ color: config.color }}
          >
            {config.icon}
          </div>
        </div>
      </div>
    </div>
  );
}
