const ProductSkeleton = () => {
  return (
    <div className="animate-pulse bg-white rounded-md overflow-hidden shadow-lg">
      <div className="w-full h-[230px] bg-gray-300 mb-2" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-300 rounded w-1/2" />
      </div>
    </div>
  );
};
export default ProductSkeleton;
