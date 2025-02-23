import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { signInFailure, signoutSuccess } from "../redux/users/userSlice";
import { handleGETData } from "../data/server";
import { toggleTheme } from "../redux/theme/ThemeSlice";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  //want to know the page name
  const location = useLocation();
  const currentPage = location.pathname;
  //to show or unshow other options
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { currentUser } = useSelector((state) => state.user);

  const handleSignOut = async () => {
    try {
      const checkLogout = confirm("Are you sure you want to logout?");
      if (checkLogout) {
        const serverData = await handleGETData("/user/logout");
        if (serverData.success == true) {
          dispatch(signoutSuccess());
          return setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          console.log("some error occur");
        }
      }
    } catch (error) {
      return dispatch(signInFailure(error.message));
    }
  };

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    if (isVisible) setIsVisible(!isVisible);
  }, [currentPage]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery != "" && searchQuery != " ") {
      navigate(`/search?query=${searchQuery}`);
      // return setSearchQuery("");
    }
  };

  return (
    <div className="p-3 sticky top-0 z-10 bg-white flex justify-between items-center border-b dark:border-gray-600 shadow-lg dark:bg-gradient-to-r from-gray-900 to-gray-800 dark:text-gray-100">
      <div className="logo cursor-pointer">
        <h1
          className="font-bold text-md md:text-lg lg:text-xl hover:text-theme transition-all duration-200 uppercase tracking-wide"
          onClick={() => navigate("/")}
        >
          {import.meta.env.VITE_WEBSITE_NAME}.
        </h1>
      </div>
      <div className="flex gap-2 items-center">
        <div className="relative hidden md:block lg:block">
          <form onSubmit={handleSearch}>
            <input
              placeholder="Search..."
              className="input shadow border-gray-300 px-5 py-3 rounded-xl w-56 transition-all focus:w-64 outline-none dark:bg-gray-800"
              name="search"
              type="search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="size-6 absolute top-3 right-3 text-gray-500"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>
          </form>
        </div>
        {currentUser?.data ? (
          <div className="flex gap-2 items-center">
            <button
              className="relative border dark:border-gray-600 rounded-xl cursor-pointer flex items-center gap-1 px-2 py-2 md:w-24 lg:w-28"
              title={currentUser.data?.fullName}
              onClick={handleToggleVisibility}
            >
              <img
                src={currentUser.data?.profileImage}
                className="w-8 h-8 rounded-xl"
                alt="USERIMAGE"
              />
              <span className="text-sm">{currentUser.data?.fullName}</span>
            </button>
            {isVisible && (
              <div className="absolute w-40 top-16 right-4 z-10 bg-white dark:bg-gray-800 flex flex-col items-center gap-2 rounded p-2">
                <button
                  className="py-1.5 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 w-full"
                  onClick={() => {
                    navigate("/dashboard?tab=blogs");
                  }}
                >
                  View Dashboard
                </button>
                <button className="py-1.5 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 w-full">
                  View Profile
                </button>
                <button
                  className="py-1.5 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 w-full"
                  onClick={() => handleSignOut()}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <button
              type="button"
              className="py-2 px-2 cursor-pointer rounded-md font-semibold transition duration-300 ease-in-out hover:ring-2 hover:ring-theme hover:shadow-xl hover:shadow-theme focus:ring-green-300 focus:shadow-theme mx-1"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
            <button
              type="button"
              className="py-2 px-2 cursor-pointer bg-theme rounded-md text-white font-semibold transition duration-300 ease-in-out hover:bg-theme hover:ring-2 hover:ring-theme hover:shadow-xl hover:shadow-theme focus:ring-green-300 focus:shadow-theme mx-1 hidden lg:inline"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        )}
        <button
          className="p-3 border dark:border-gray-600 rounded-xl"
          onClick={() => dispatch(toggleTheme())}
        >
          {theme == "dark" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#333"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;
