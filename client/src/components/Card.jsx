import { useNavigate } from "react-router-dom";

const Card = ({ title, category, thumbnail, slug }) => {
  const navigate = useNavigate();
  return (
    // bg-neutral-800
    <div className="w-64 h-80 border dark:border-gray-700 rounded-2xl text-gray-900 p-4 flex flex-col items-start justify-center gap-3 hover:shadow-xl hover:shadow-theme transition-shadow dark:text-white">
      <div className="w-56 h-40 bg-gray-300 rounded-2xl">
        <img
          //   src="https://cdn.pixabay.com/photo/2024/05/20/13/28/ai-generated-8775232_1280.png"
          src={thumbnail}
          className="w-full h-full object-cover"
          alt="POST-IMAGE"
        />
      </div>
      <div className="">
        <p className="font-extrabold mb-2">{title}</p>
        <p className="">
          <span className="bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 cursor-pointer">
            #{category}
          </span>
        </p>
      </div>
      <button
        className="bg-theme text-white font-extrabold p-2 px-6 rounded-xl hover:bg-green-500 transition-colors"
        onClick={() => navigate(`/blog/${slug}`)}
      >
        View
      </button>
    </div>
  );
};

export default Card;
