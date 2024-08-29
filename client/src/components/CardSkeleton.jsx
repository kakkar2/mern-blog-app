const CardSkeleton = () => {
  return (
    // bg-neutral-800
    <div className="w-[14rem] md:w-[16rem] lg:w-[17rem] h-80 border dark:border-gray-700 rounded-2xl text-gray-900 p-4 flex flex-col items-start justify-center gap-3 hover:shadow-xl hover:shadow-theme transition-shadow dark:text-white animate-pulse">
      <div className="w-42 md:w-52 lg:w-60 h-40 bg-gray-300 rounded-2xl"></div>
      <div className="">
        <div className="mb-2 h-4 bg-gray-300 rounded w-5/6"></div>
        <p className="">
          <span className="bg-gray-100 rounded-full h-2 px-3 py-1 text-sm font-semibold text-gray-600 cursor-pointer"></span>
        </p>
      </div>
      <button className="bg-gray-300 h-10 w-14 text-white font-extrabold p-2 px-6 rounded-xl hover:bg-green-500 transition-colors"></button>
    </div>
  );
};

export default CardSkeleton;
