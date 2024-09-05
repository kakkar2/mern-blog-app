import { handlePOSTData } from "../data/server.js";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/users/userSlice.js";
import { Alert } from "../components/index.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error: message } = useSelector((state) => state.user);

  const handleLoginUser = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    //getting form data
    const response = new FormData(e.target);
    const result = Object.fromEntries(response.entries());
    if (!result) return console.log(result, "All fields required");

    try {
      const severData = await handlePOSTData("/user/login", result);

      if (severData.success === true) {
        dispatch(signInSuccess(severData));
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        dispatch(signInFailure(severData));
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
    e.target.reset();
  };
  return (
    <div className="flex justify-center items-center mx-auto">
      {message != null && <Alert {...message} />}
      <div className="flex items-center flex-col gap-2 lg:gap-0 lg:flex-row shadow-xl rounded-2xl">
        <div className="w-1/2">
          <img
            loading="lazy"
            class="w-full lg:w-3/4 mx-auto drop-shadow-2xl"
            src="https://res.cloudinary.com/dmsv2aww5/image/upload/v1725376982/login_vqthgl.png"
            alt="LOGIN IMAGE"
          />
        </div>
        <div className=" w-full lg:w-1/2 mx-auto p-4">
          {/* <div className=" w-full mx-auto p-4"> */}
          <div className="logo text-center text-3xl mb-10">
            <h1 className="font-bold">{import.meta.env.VITE_WEBSITE_NAME}</h1>
          </div>
          <h2 className="text-center text-lg font-bold mb-5 uppercase">
            Welcome Back!
          </h2>

          <div className="mt-3 mb-7 text-center">
            <button
              className="inline-flex w-3/4 mx-auto items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none dark:bg-gray-800 dark:text-gray-100"
              type="button"
            >
              <span className="mr-2 inline-block">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-theme"
                >
                  <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                </svg>
              </span>
              Continue with Google
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-400 text-center mb-4 mx-auto">
            <p>or with email</p>
          </div>

          <form
            onSubmit={handleLoginUser}
            className="w-3/4 items-center mx-auto"
          >
            <div className="relative mb-5">
              <input
                type="email"
                placeholder="someone@example.com"
                name="email"
                className="w-full py-3 pl-8 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:border-theme dark:bg-gray-800 dark:text-gray-100"
                required
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute start-3 top-0 bottom-0 m-auto w-5 h-5 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1C274C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
            </div>
            <div className="relative mb-5">
              <input
                type="password"
                placeholder="*******"
                name="password"
                className="w-full py-3 pl-8 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:border-theme dark:bg-gray-800 dark:text-gray-100"
                required
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="absolute start-3 top-0 bottom-0 m-auto w-5 h-5 text-gray-500"
                fill="none"
                stroke="#1C274C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-theme rounded-md text-white font-semibold transition duration-300 ease-in-out hover:bg-theme hover:ring-2 hover:ring-theme hover:shadow-xl hover:shadow-theme focus:ring-green-300 focus:shadow-theme px-3.5 py-2.5"
              disabled={loading}
            >
              {loading === true ? "Logging In...." : "Login"}
            </button>
          </form>
          <div className="px-8 py-4 text-center">
            <span className="text-gray-400">Don't have an account?</span>
            <button
              type="button"
              className="font-medium text-theme hover:text-green-500"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
