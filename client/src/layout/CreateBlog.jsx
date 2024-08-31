import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { handlePOSTData, handleImageUpload } from "../data/server";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components";

const CreateBlog = () => {
  const categories = [
    "others",
    "Coding",
    "Technology",
    "Food",
    "Lifestyle",
    "vehicles",
  ];

  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [localImageUrl, setLocalImageUrl] = useState("");
  const [loader, setLoader] = useState(false);

  //taking image from user and uploading to the cloudinary
  const handleUpload = async () => {
    try {
      if (!image) return console.log("image not found");
      const imageFormData = new FormData();
      imageFormData.append("file", image);
      imageFormData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
      const result = await handleImageUpload(imageFormData);
      return result.secure_url;
    } catch (error) {
      console.log("error occur while uploading the image");
    }
  };

  //generating local image so that user can see the image
  const handleLocalUpload = async (e) => {
    setImage(e.target.files[0]);
    setLocalImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  //sending data to backend
  const handleData = async (result) => {
    const serverData = await handlePOSTData("/blog/add-new", result);
    if (serverData.success == true) {
      navigate(`/blog/${serverData.slug}`);
    } else {
      console.log(serverData.message);
    }
  };

  //creating blog post
  const handleCreateBlog = async (e) => {
    setLoader(true);
    e.preventDefault();
    const result = new FormData();
    for (let [key, value] of Object.entries(formData)) {
      result.append(key, value);
    }
    if (image) {
      const imageUrl = await handleUpload();
      result.append("thumbnail", imageUrl);
      await handleData(Object.fromEntries(result.entries()));
    } else {
      await handleData(Object.fromEntries(result.entries()));
    }
    setLoader(false);
  };

  return loader ? (
    <Loader />
  ) : (
    <>
      <h2 className="font-semibold text-xl uppercase underline mb-5">
        Create New Post
      </h2>
      <form
        onSubmit={handleCreateBlog}
        className="w-4/5 mx-auto p-5 shadow-lg rounded-xl dark:shadow-2xl relative"
        encType="multipart/form-data"
      >
        <label htmlFor="thumbnail">Thumbnail:</label>
        <div className="w-full flex items-center gap-2 mb-4">
          <div className="w-full">
            <div>
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                accept="image/png,image/jpeg"
                className="w-full py-3 pl-8 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:border-theme dark:bg-gray-800 dark:text-gray-100"
                onChange={handleLocalUpload}
              />
            </div>
          </div>
          {/* <button
            type="button"
            onClick={handleLocalUpload}
            className="bg-theme text-white py-3 pl-8 pr-4 w-3/12 rounded-xl"
          >
            uploadImage
          </button> */}
        </div>
        {localImageUrl && (
          <div className="mb-4 p-5 border rounded-xl">
            <img
              src={localImageUrl}
              alt="POST_IMAGE"
              className="w-full h-60 rounded-xl object-cover"
              loading="lazy"
            />
          </div>
        )}

        <div className="flex mb-4 items-center gap-2">
          <div className="w-full">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              placeholder="Enter Title"
              id="title"
              name="title"
              className="w-full py-3 pl-8 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:border-theme capitalize dark:bg-gray-800 dark:text-gray-100"
              required
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className="w-full">
            <label htmlFor="category">Category:</label>
            <select
              name="category"
              className="w-full py-3 pl-8 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:border-theme dark:bg-gray-800 dark:text-gray-100"
              id="category"
              required
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              {categories.map((category, index) => (
                <option value={category} key={index}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="description">Description:</label>
          <ReactQuill
            theme="snow"
            id="description"
            placeholder="Enter description here..."
            className="h-64 mb-14"
            required
            onChange={(value) => setFormData({ ...formData, desc: value })}
          />
        </div>
        <button
          type="submit"
          className="w-full cursor-pointer bg-gradient-to-r from-green-600 to-theme rounded-md text-white font-semibold transition duration-300 ease-in-out hover:bg-theme hover:ring-2 hover:ring-theme hover:shadow-xl hover:shadow-theme focus:ring-green-300 focus:shadow-theme px-3.5 py-2.5"
        >
          Create Post
        </button>
      </form>
    </>
  );
};

export default CreateBlog;
