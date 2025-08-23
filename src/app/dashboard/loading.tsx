export default function DashboardLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-7 w-48 bg-ds-skeleton rounded" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="h-40 bg-ds-skeleton rounded-xl" />
        <div className="h-40 bg-ds-skeleton rounded-xl" />
        <div className="h-40 bg-ds-skeleton rounded-xl" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-72 bg-ds-skeleton rounded-xl" />
        <div className="h-72 bg-ds-skeleton rounded-xl" />
      </div>
    </div>
  );
}
