import { useRef, useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const profileImageRef = useRef();
  const { currentUser } = useSelector((state) => state.user);
  const [updatedImage, setUpdatedImage] = useState(null);
  const [updatedImageURL, setUpdatedImageURL] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    profileImage: "",
  });

  const handleChange = (e) => {
    const { fullName, email, password, profileImage } = e.target;
    setFormData({
      ...formData,
      [fullName]: fullName,
      [email]: email,
      [password]: password,
      [profileImage]: profileImage,
    });
  };

  const handleImageChanger = (e) => {
    const image = e.target.files[0];
    if (image) {
      setUpdatedImage(image);
      //   tempory image url file
      setUpdatedImageURL(URL.createObjectURL(image));
    }
    console.log(image);
  };
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="lg:p-10 md:p-5">
      <h2 className="font-semibold uppercase text-xl underline cursor-default">
        Edit Profile
      </h2>
      <form onSubmit={handleUpdateProfile}>
        <input
          type="file"
          accept="image/*"
          name="profileImage"
          ref={profileImageRef}
          hidden
          onChange={handleImageChanger}
        />
        <div
          className="w-40 h-40 mb-10 mx-auto cursor-pointer hover:brightness-90 transition duration-300 ease-in-out group relative"
          onClick={() => profileImageRef.current.click()}
        >
          <div className="invisible group-hover:visible absolute left-5 top-16 font-bold uppercase text-center dark:text-gray-500">
            Choose Image
          </div>
          <img
            src={
              updatedImageURL ? updatedImageURL : currentUser.data.profileImage
            }
            className="w-full h-full border rounded-full"
            alt="PROFILEIMAGE"
          />
        </div>
        <div className="relative mb-5">
          <input
            type="text"
            placeholder="John Deo"
            name="fullName"
            className="w-full py-3 pl-8 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:border-theme dark:bg-gray-800 dark:text-gray-100 capitalize"
            value={currentUser.data.fullName}
            onChange={handleChange}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="absolute start-3 top-0 bottom-0 m-auto w-5 h-5 text-gray-500"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <div className="relative mb-5">
          <input
            type="email"
            placeholder="someone@example.com"
            name="email"
            className="w-full py-3 pl-8 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:border-theme dark:bg-gray-800 dark:text-gray-100"
            value={currentUser.data.email}
            onChange={handleChange}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="absolute start-3 top-0 bottom-0 m-auto w-5 h-5 text-gray-500"
          >
            <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              id="SVGRepo_tracerCarrier"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <circle
                strokeWidth="1.5"
                stroke="currentColor"
                r="4"
                cy="6"
                cx="10"
              ></circle>
              <path
                strokeLinecap="round"
                strokeWidth="1.5"
                stroke="currentColor"
                d="M21 10H19M19 10H17M19 10L19 8M19 10L19 12"
              ></path>
              <path
                strokeLinecap="round"
                strokeWidth="1.5"
                stroke="currentColor"
                d="M17.9975 18C18 17.8358 18 17.669 18 17.5C18 15.0147 14.4183 13 10 13C5.58172 13 2 15.0147 2 17.5C2 19.9853 2 22 10 22C12.231 22 13.8398 21.8433 15 21.5634"
              ></path>
            </g>
          </svg>
        </div>
        <div className="relative mb-5">
          <input
            type="password"
            placeholder="*******"
            name="password"
            className="w-full py-3 pl-8 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:border-theme dark:bg-gray-800 dark:text-gray-100"
            onChange={handleChange}
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
          className="w-full cursor-pointer bg-theme rounded-md text-white font-semibold transition duration-300 ease-in-out hover:bg-theme hover:ring-2 hover:ring-theme hover:shadow-xl hover:shadow-theme focus:ring-green-300 focus:shadow-theme px-3.5 py-2.5 mb-5"
        >
          Update Profile
        </button>
      </form>
      <small className="text-gray-400 block">
        <b>Hover on Image</b> in order to upload new image.
      </small>
    </div>
  );
};

export default Profile;
