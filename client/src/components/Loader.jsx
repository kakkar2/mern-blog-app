const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="bg-gray-100 bg-opacity-5 w-full flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-theme mx-auto"></div>
        <h2 className="text-zinc-900 dark:text-white mt-4">{message}</h2>
      </div>
    </div>
  );
};

export default Loader;
