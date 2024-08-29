import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ title, category, thumbnail, slug, updatedAt }) => {
  const navigate = useNavigate();
  const [timeAgo, setTimeAgo] = useState(null);
  //calculating time that how long the blog post is posted
  const checkingTime = () => {
    const postedTime = new Date(updatedAt);
    const currentTime = new Date();
    const diffTime = currentTime - postedTime;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Convert to days
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60)); // Convert to hours
    const diffMinutes = Math.floor(diffTime / (1000 * 60)); // Convert to minutes

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
    } else {
      return "just now";
    }
  };
  useEffect(() => {
    const timeAgo = checkingTime();
    setTimeAgo(timeAgo);
  }, []);
  return (
    // bg-neutral-800
    <div
      className="w-[14rem] md:w-[16rem] lg:w-[17rem] h-80 border dark:border-gray-700 rounded-2xl text-gray-900 p-4 flex flex-col items-start justify-center gap-3 hover:shadow-xl hover:shadow-theme transition-shadow dark:text-white cursor-pointer card"
      onClick={() => navigate(`/blog/${slug}`)}
    >
      <div className="w-42 md:w-52 lg:w-60 h-40 bg-gray-300 rounded-2xl">
        <img
          //   src="https://cdn.pixabay.com/photo/2024/05/20/13/28/ai-generated-8775232_1280.png"
          src={thumbnail}
          className="w-full h-full object-cover rounded-xl"
          alt="POST-IMAGE"
        />
      </div>
      <div className="">
        <p className="font-extrabold capitalize mb-2">{title}</p>
        <p className="py-1">
          <span className="bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 cursor-pointer text-sm">
            #{category}
          </span>
        </p>
      </div>
      <div className="flex w-full items-center justify-between my-1">
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
          <span className="mx-1 text-sm">{timeAgo}</span>
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
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span className="mx-1 text-sm">10</span>
        </div>
      </div>
      {/* <button
        className="bg-theme text-white font-extrabold p-2 px-6 rounded-xl hover:bg-green-500 transition-colors"
        onClick={() => navigate(`/blog/${slug}`)}
      >
        View
      </button> */}
    </div>
  );
};

export default Card;
