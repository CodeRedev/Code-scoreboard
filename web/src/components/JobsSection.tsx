import JobCard from './JobCard';

interface JobConfigData {
  label: string;
  icon: string;
  accentColor: string;
}

interface JobData {
  name: string;
  count: number;
  iconClass: string;
  accentColor: string;
}

interface JobsSectionProps {
  jobs: Record<string, JobConfigData>;
  jobCounts: Record<string, number>;
}

const fallbackJobs: JobData[] = [
  { name: 'Police', count: 8, iconClass: 'fa-solid fa-shield-halved', accentColor: '#3B82F6' },
  { name: 'Ambulance', count: 5, iconClass: 'fa-solid fa-briefcase-medical', accentColor: '#EF4444' },
  { name: 'Sheriff', count: 4, iconClass: 'fa-solid fa-shield-halved', accentColor: '#F59E0B' },
  { name: 'Taxi', count: 2, iconClass: 'fa-solid fa-taxi', accentColor: '#EAB308' },
];

export default function JobsSection({ jobs, jobCounts }: JobsSectionProps) {
  const jobList: JobData[] = Object.keys(jobs).length > 0
    ? Object.entries(jobs).map(([jobKey, jobConfig]) => ({
        name: jobConfig.label,
        count: jobCounts[jobKey] ?? 0,
        iconClass: jobConfig.icon,
        accentColor: jobConfig.accentColor,
      }))
    : fallbackJobs;

  const gridColsClass = jobList.length <= 4 ? 'grid-cols-2' : 'grid-cols-3';

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-4 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full" />
        <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Active Jobs</h2>
      </div>
      <div className={`grid ${gridColsClass} gap-3`}>
        {jobList.map((job, index) => (
          <JobCard
            key={job.name}
            name={job.name}
            count={job.count}
            iconClass={job.iconClass}
            accentColor={job.accentColor}
            delay={index * 50}
          />
        ))}
      </div>
    </div>
  );
}
