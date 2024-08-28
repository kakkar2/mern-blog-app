const CommentItem = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-900 dark:shadow-xl my-3">
      <div className="flex items-center mb-2">
        <img
          src="https://via.placeholder.com/40"
          alt="User Avatar"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h3 className="font-semibold">John Doe</h3>
          <p className="text-sm text-gray-500 dark:text-gray-100">
            Posted on March 15, 2024
          </p>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-100">
        Great product! I've been using it for a week now and I'm very satisfied
        with its performance.
      </p>
      <div className="flex items-center mt-2">
        <button className="text-blue-500 hover:text-blue-600 mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 inline"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
          </svg>
          Like
        </button>
        <button className="text-gray-500 hover:text-gray-600">Reply</button>
      </div>
    </div>
  );
};

export default CommentItem;
