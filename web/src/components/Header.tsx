import { useEffect, useState } from 'react';

export default function Header() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  return (
    <div className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full" />
          <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 overflow-hidden">
            <img src="./logo.png" alt="Logo" className="w-10 h-10 object-cover rounded-lg" />
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent tracking-tight">
            NOVA RP
          </h1>
          <p className="text-xs text-zinc-500 tracking-[0.3em] uppercase mt-1">Premium Roleplay</p>
        </div>
      </div>
    </div>
  );
}
