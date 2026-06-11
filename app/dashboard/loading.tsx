export default function DashboardLoading() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 md:p-6 animate-pulse">
      {/* Skeleton Header Block */}
      <div className="h-44 bg-white/2 border border-white/5 rounded-3xl w-full"></div>
      
      {/* Skeleton Mini Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 bg-white/2 border border-white/5 rounded-2xl w-full"></div>
        ))}
      </div>

      {/* Skeleton Actions Bar */}
      <div className="h-24 bg-white/2 border border-white/5 rounded-2xl w-full"></div>
    </div>
  )
}
