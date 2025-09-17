/*
 * REFACTOR CHANGES:
 * 1. Replicated exact grid structure from dashboard/page.tsx
 * 2. Matched skeleton heights and dimensions to prevent layout shift
 * 3. Used flex flex-col gap-* structure to match refactored page
 * 4. Added proper skeleton for all dashboard sections
 * 5. Ensured seamless transition from loading to rendered state
 */

export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="h-8 w-64 bg-muted rounded animate-pulse mb-2" />
          <div className="h-4 w-96 bg-muted rounded animate-pulse" />
        </div>
        <div className="h-10 w-40 bg-muted rounded animate-pulse" />
      </div>

      {/* Quick Actions Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-32 bg-muted rounded-xl animate-pulse" />
        <div className="h-32 bg-muted rounded-xl animate-pulse" />
        <div className="h-32 bg-muted rounded-xl animate-pulse" />
      </div>

      {/* Main Content Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Projects Overview Skeleton */}
        <div className="lg:col-span-2">
          <div className="bg-muted rounded-xl p-6 animate-pulse">
            <div className="flex items-center justify-between mb-6">
              <div className="h-6 w-32 bg-muted-foreground/20 rounded" />
              <div className="h-8 w-8 bg-muted-foreground/20 rounded" />
            </div>
            <div className="flex flex-col gap-4">
              <div className="h-20 bg-muted-foreground/20 rounded-lg" />
              <div className="h-20 bg-muted-foreground/20 rounded-lg" />
              <div className="h-20 bg-muted-foreground/20 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Right Column Skeleton */}
        <div className="flex flex-col gap-6">
          {/* Today's Tasks Skeleton */}
          <div className="bg-muted rounded-xl p-6 animate-pulse">
            <div className="h-6 w-32 bg-muted-foreground/20 rounded mb-6" />
            <div className="flex flex-col gap-3">
              <div className="h-16 bg-muted-foreground/20 rounded-lg" />
              <div className="h-16 bg-muted-foreground/20 rounded-lg" />
              <div className="h-16 bg-muted-foreground/20 rounded-lg" />
            </div>
          </div>

          {/* Upcoming Events Skeleton */}
          <div className="bg-muted rounded-xl p-6 animate-pulse">
            <div className="h-6 w-24 bg-muted-foreground/20 rounded mb-6" />
            <div className="flex flex-col gap-3">
              <div className="h-14 bg-muted-foreground/20 rounded-lg" />
              <div className="h-14 bg-muted-foreground/20 rounded-lg" />
              <div className="h-14 bg-muted-foreground/20 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
