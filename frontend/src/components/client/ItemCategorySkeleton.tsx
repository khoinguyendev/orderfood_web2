const ItemCategorySkeleton = () => {
  return (
    <div className="flex flex-col items-center animate-pulse">
      <div className="overflow-hidden rounded bg-gray-300 w-[285px] h-[176px]" />
      <div className="mt-2 h-4 w-32 bg-gray-300 rounded" />
    </div>
  );
};

export default ItemCategorySkeleton;
