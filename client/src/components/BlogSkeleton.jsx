const BlogSkeleton = () => {
  return (
    <div className="w-4/5 mx-auto mt-10 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-2/3 mx-auto"></div>
      <div className="flex justify-center gap-2 flex-wrap p-4 mb-5">
        <span className="bg-gray-100 h-4 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 cursor-pointer"></span>
      </div>
      <div className="w-full h-96 bg-gray-600 rounded mb-3"></div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>

        <div className="animate-pulse space-y-4 mt-12">
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default BlogSkeleton;
