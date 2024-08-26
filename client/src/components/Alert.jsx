const Alert = ({ success, message }) => {
  return (
    <div className="flex flex-col gap-2 w-60 sm:w-72 text-[10px] sm:text-xs z-50 absolute top-4 right-4 shadow-lg rounded-lg">
      <div className="error-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-white px-[10px] dark:bg-gray-800 dark:text-gray-100">
        <div className="flex items-center">
          <div
            className={`text-${
              success === true ? "theme" : "[#d65563]"
            } bg-white/5 backdrop-blur-xl p-1 rounded-lg`}
          >
            {success === true ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                ></path>
              </svg>
            )}
          </div>
          <div>
            <p className="text-dark text-md">{message}</p>
          </div>
        </div>
        {/* <button className="text-gray-600 hover:bg-white/10 p-1 rounded-md transition-colors ease-linear">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            ></path>
          </svg>
        </button> */}
      </div>
    </div>
  );
};

export default Alert;
