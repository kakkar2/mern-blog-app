const BackToTop = () => {
  return (
    <div className="fixed bottom-0 right-0 p-4">
      <button
        className="bg-theme text-white rounded-full w-10 h-10 flex items-center justify-center"
        onclick="backToTop()"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default BackToTop;
