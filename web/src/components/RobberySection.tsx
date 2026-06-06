import RobberyCard from './RobberyCard';

interface IllegalActionData {
  minimumPolice: number;
  busy: boolean;
  label: string;
  icon?: string;
}

interface RobberySectionProps {
  actions: Record<string, IllegalActionData>;
  currentCops: number;
}

const mockRobberies = [
  { name: 'Store Robbery', status: 'available' as const, icon: 'fa-solid fa-shop' },
  { name: 'Bank Robbery', status: 'cooldown' as const, icon: 'fa-solid fa-building-columns' },
  { name: 'Jewelery', status: 'active' as const, icon: 'fa-solid fa-gem' },
  { name: 'Pacific Bank', status: 'available' as const, icon: 'fa-solid fa-ship' },
  { name: 'Paleto Bay Bank', status: 'cooldown' as const, icon: 'fa-solid fa-warehouse' },
  { name: 'Museum Heist', status: 'available' as const, icon: 'fa-solid fa-landmark' },
  { name: 'Casino Job', status: 'cooldown' as const, icon: 'fa-solid fa-dice' },
  { name: 'Armored Truck', status: 'available' as const, icon: 'fa-solid fa-shield-halved' },
  { name: 'Drug Run', status: 'cooldown' as const, icon: 'fa-solid fa-droplet' },
  { name: 'Gallery Job', status: 'active' as const, icon: 'fa-solid fa-paint-brush' },
];

const actionOrder = ['storerobbery', 'bankrobbery', 'jewellery', 'pacific', 'paleto', 'museum', 'casino', 'armored', 'drugrun', 'gallery'];

export default function RobberySection({ actions, currentCops }: RobberySectionProps) {
  const hasActions = Object.keys(actions).length > 0;

  const robberies = hasActions
    ? actionOrder
        .filter((key) => actions[key])
        .map((key) => {
          const action = actions[key];
          let status: 'available' | 'cooldown' | 'active' = 'available';

          if (action.busy) {
            status = 'active';
          } else if (currentCops < action.minimumPolice) {
            status = 'cooldown';
          }

          return {
            name: action.label,
            status,
            icon: action.icon ?? 'fa-solid fa-question',
          };
        })
    : mockRobberies;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-4 bg-gradient-to-b from-rose-400 to-orange-500 rounded-full" />
        <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Robbery Status</h2>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {robberies.map((robbery, index) => (
          <RobberyCard
            key={robbery.name}
            name={robbery.name}
            status={robbery.status}
            iconClass={robbery.icon}
            delay={index * 50}
          />
        ))}
      </div>
    </div>
  );
}
