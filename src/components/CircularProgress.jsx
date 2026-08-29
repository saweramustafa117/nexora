export default function CircularProgress({ value, size = 64, strokeWidth = 5 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = value >= 80 ? '#10b981' : value >= 60 ? '#6366f1' : '#f59e0b';

  return (
    <div className="relative inline-flex">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color}
          strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" className="transition-all duration-700"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-slate-800">
        {value}%
      </span>
    </div>
  );
}
