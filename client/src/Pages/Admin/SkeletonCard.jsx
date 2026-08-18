export default function SkeletonCard() {
  return (
    <div className="bg-gray-200 p-6 rounded-xl animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="h-8 bg-gray-300 rounded w-1/3"></div>
    </div>
  );
}
