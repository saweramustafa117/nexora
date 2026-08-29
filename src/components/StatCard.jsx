import CountUp from './CountUp';

export default function StatCard({ icon: IconComp, label, value, suffix = '', trend, color = 'brand', animate = true }) {
  const colorMap = {
    brand: 'bg-brand-50 text-brand-600',
    accent: 'bg-cyan-50 text-cyan-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
  };
  const numValue = typeof value === 'string' ? parseInt(value, 10) : value;
  const isPercent = typeof value === 'string' && value.includes('%');

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className={`rounded-xl p-2.5 ${colorMap[color]}`}>
          <IconComp className="h-5 w-5" />
        </div>
        {trend != null && (
          <span className={`text-xs font-medium ${trend > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <p className="mt-4 text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">
        {animate && !isNaN(numValue) ? <CountUp end={numValue} suffix={isPercent ? '%' : suffix} /> : <>{value}{suffix}</>}
      </p>
    </div>
  );
}
