export default function Skeleton({ className = '', variant = 'rect' }) {
  const base = 'skeleton rounded-lg';
  const variants = {
    rect: '',
    circle: 'rounded-full',
    text: 'h-4 w-full',
  };
  return <div className={`${base} ${variants[variant]} ${className}`} />;
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <Skeleton className="h-10 w-10" variant="circle" />
      <Skeleton className="mt-4 h-4 w-24" />
      <Skeleton className="mt-2 h-8 w-16" />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  );
}
