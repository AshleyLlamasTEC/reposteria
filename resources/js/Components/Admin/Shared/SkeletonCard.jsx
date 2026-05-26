export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-10 bg-gray-200 rounded w-1/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
    </div>
  );
}
