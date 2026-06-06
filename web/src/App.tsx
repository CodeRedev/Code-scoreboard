import { useState, useEffect } from 'react';
import { isDebug, useNuiEvent, fetchNui } from './hooks/useNui';
import Header from './components/Header';
import PlayerStats from './components/PlayerStats';
import JobsSection from './components/JobsSection';
import RobberySection from './components/RobberySection';

interface IllegalActionData {
  minimumPolice: number;
  busy: boolean;
  label: string;
  icon?: string;
}

interface JobConfigData {
  label: string;
  icon: string;
  accentColor: string;
}

interface ScoreboardData {
  totalPlayers: number;
  maxPlayers: number;
  emergencyCount: number;
  requiredCops?: Record<string, IllegalActionData>;
  currentCops?: number;
  jobs?: Record<string, JobConfigData>;
  jobCounts?: Record<string, number>;
}

export default function App() {
  const [visible, setVisible] = useState(isDebug);
  const [closing, setClosing] = useState(false);
  const [data, setData] = useState<ScoreboardData>({
    totalPlayers: 42,
    maxPlayers: 128,
    emergencyCount: 18,
    requiredCops: {},
    currentCops: 0,
    jobs: {},
    jobCounts: {},
  });

  useNuiEvent<ScoreboardData>('open', (incomingData) => {
    if (incomingData && Object.keys(incomingData).length > 0) {
      setData((prev) => ({
        totalPlayers: incomingData.totalPlayers ?? prev.totalPlayers,
        maxPlayers: incomingData.maxPlayers ?? prev.maxPlayers,
        emergencyCount: incomingData.emergencyCount ?? prev.emergencyCount,
        requiredCops: incomingData.requiredCops ?? prev.requiredCops,
        currentCops: incomingData.currentCops ?? prev.currentCops,
        jobs: incomingData.jobs ?? prev.jobs,
        jobCounts: incomingData.jobCounts ?? prev.jobCounts,
      }));
    }
    setVisible(true);
    setClosing(false);
  });

  useNuiEvent('close', () => {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
    }, 300);
  });

  useNuiEvent<ScoreboardData>('updateData', (incomingData) => {
    if (incomingData) {
      setData(incomingData);
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchNui<ScoreboardData>(
        'getScoreboardData',
        {},
        { totalPlayers: 42, maxPlayers: 128, emergencyCount: 18, currentCops: 0 }
      );
      if (result) setData(result);
    };
    if (visible) fetchData();
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-y-0 right-0 flex items-center justify-end p-4 scoreboard-root">
      <div className={`relative w-[520px] max-w-[95vw] max-h-[calc(100vh-2rem)] glass-bg glass-glow rounded-3xl overflow-hidden ${closing ? 'scoreboard-exit' : 'scoreboard-enter'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/3 via-transparent to-blue-500/3 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative p-6">
          <Header />
          <PlayerStats 
            totalPlayers={data.totalPlayers}
            maxPlayers={data.maxPlayers}
            emergencyCount={data.emergencyCount}
          />
          <JobsSection jobs={data.jobs ?? {}} jobCounts={data.jobCounts ?? {}} />
          <RobberySection
            actions={data.requiredCops ?? {}}
            currentCops={data.currentCops ?? 0}
          />
        </div>
      </div>
    </div>
  );
}
