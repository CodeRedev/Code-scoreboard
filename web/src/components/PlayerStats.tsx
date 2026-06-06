import { useEffect, useState, useRef } from 'react';

interface PlayerStatsProps {
  totalPlayers: number;
  maxPlayers: number;
  emergencyCount: number;
}

function AnimatedCounter({ value, duration = 1000 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const displayValueRef = useRef(displayValue);
  const startTime = useRef<number | null>(null);
  const startValue = useRef(0);
  const frameId = useRef<number | null>(null);

  useEffect(() => {
    displayValueRef.current = displayValue;
  }, [displayValue]);

  useEffect(() => {
    startValue.current = displayValueRef.current;
    startTime.current = null;

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(startValue.current + (value - startValue.current) * easeOutQuart);

      setDisplayValue(current);

      if (progress < 1) {
        frameId.current = requestAnimationFrame(animate);
      }
    };

    frameId.current = requestAnimationFrame(animate);

    return () => {
      if (frameId.current !== null) cancelAnimationFrame(frameId.current);
    };
  }, [value, duration]);

  return <span>{displayValue}</span>;
}

export default function PlayerStats({ totalPlayers, maxPlayers, emergencyCount }: PlayerStatsProps) {
  const [mounted, setMounted] = useState(false);
  const mountTimeout = useRef<number | null>(null);

  useEffect(() => {
    mountTimeout.current = window.setTimeout(() => setMounted(true), 200);
    return () => {
      if (mountTimeout.current !== null) window.clearTimeout(mountTimeout.current);
    };
  }, []);

  const percentage = (totalPlayers / maxPlayers) * 100;

  return (
    <div className={`transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="grid grid-cols-2 gap-4 mb-6 items-stretch">
        <div className="relative group h-full">
          <div className="absolute bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl blur-sm" />
          <div className="relative h-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-5 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Players Online</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">
                  <AnimatedCounter value={totalPlayers} />
                </span>
                <span className="text-zinc-600 text-lg">/ {maxPlayers}</span>
              </div>
              <div className="mt-3 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative group h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-orange-500/10 rounded-2xl blur-sm" />
          <div className="relative h-full bg-gradient-to-br from-rose-500/10 to-orange-500/10 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-5 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Emergency Services</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">
                  <AnimatedCounter value={emergencyCount} />
                </span>
                <span className="text-xs text-zinc-600">active</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-zinc-500">On Duty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
