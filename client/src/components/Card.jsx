import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ title, category, thumbnail, slug, updatedAt, createdBy }) => {
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
      className="w-[10rem] md:w-[16rem] lg:w-[16rem] h-80 border dark:border-gray-700 rounded-2xl text-gray-900 p-4 flex flex-col items-start justify-center gap-3 hover:shadow-xl hover:shadow-theme transition-shadow dark:text-white cursor-pointer card overflow-hidden"
      onClick={() => navigate(`/blog/${slug}`)}
    >
      <div className="w-32 md:w-52 lg:w-56 h-36 md:h-40 lg:h-40 bg-gray-300 rounded-2xl">
        <img
          //   src="https://cdn.pixabay.com/photo/2024/05/20/13/28/ai-generated-8775232_1280.png"
          src={thumbnail}
          className="w-full h-full lg:object-cover object-contain rounded-xl"
          alt="POST-IMAGE"
        />
      </div>
      <div>
        <p
          className="font-extrabold capitalize mb-2 line-clamp-1"
          title={title}
        >
          {title}
        </p>
        <p className="py-1">
          <span className="bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 cursor-pointer text-sm">
            #{category}
          </span>
        </p>
      </div>
      <div className="flex w-full items-center justify-between my-1">
        <div className="flex items-center gap-1 hidden lg:block">
          <div className="w-8 h-8">
            <img
              src={createdBy?.profileImage}
              className="w-full h-full object-cover rounded-xl"
              alt="PROFILE_IMAGE"
            />
          </div>
          <span>{createdBy?.fullName}</span>
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
          <span className="mx-1 text-sm">{timeAgo}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
