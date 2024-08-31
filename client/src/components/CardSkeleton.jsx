const CardSkeleton = () => {
  return (
    // bg-neutral-800
    <div className="w-[14rem] md:w-[16rem] lg:w-[17rem] h-80 border dark:border-gray-700 rounded-2xl text-gray-900 p-4 flex flex-col items-start justify-center gap-3 hover:shadow-xl hover:shadow-theme transition-shadow dark:text-white animate-pulse">
      <div className="w-42 md:w-52 lg:w-60 h-40 bg-gray-300 rounded-2xl"></div>
      <div>
        <div className="mb-2 h-4 bg-gray-300 rounded w-full"></div>
        <p>
          <span className="bg-gray-100 rounded-full h-2 px-3 py-1 text-sm font-semibold text-gray-600 cursor-pointer"></span>
        </p>
      </div>
      <div className="flex w-full items-center justify-between my-1">
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
          <span className="bg-gray-100 rounded-full h-2 px-3 py-1 text-sm font-semibold text-gray-600 cursor-pointer"></span>
        </div>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span className="bg-gray-100 rounded-full h-2 px-3 py-1 text-sm font-semibold text-gray-600 cursor-pointer"></span>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
