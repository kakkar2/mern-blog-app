import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleGETData } from "../data/server";
import { useSelector } from "react-redux";
import { Table, CreateBlog } from "../layout/index";

const Blogs = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const urlPrams = new URLSearchParams(location.search);
    const tabFromUrl = urlPrams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    handleGETData(`/blog/all-blogs?userId=${currentUser.data._id}`).then(
      (data) => {
        setBlogs(data.blogs);
        if (data.blogs.length < 8) {
          setShowMore(false);
        }
      }
    );
  }, []);

  const pages = {
    blogs: (
      <Table
        blogs={blogs}
        showMore={showMore}
        blogSetChanger={setBlogs}
        showMoreSetChanger={setShowMore}
      />
    ),
    "blog-add-new": <CreateBlog />,
  };
  return (
    <div>
      <div className="flex items-center justify-between py-2 mb-5">
        <h2 className="font-semibold uppercase text-xl underline cursor-default">
          blogs
        </h2>
        <button
          type="button"
          onClick={() => navigate("/dashboard?tab=blog-add-new")}
          className="py-2 px-2 cursor-pointer bg-theme rounded-md text-white font-semibold transition duration-300 ease-in-out hover:bg-theme hover:ring-2 hover:ring-theme hover:shadow-xl hover:shadow-theme focus:ring-green-300 focus:shadow-theme"
        >
          Add New Blog
        </button>
      </div>
      {pages[tab]}
    </div>
  );
};

export default Blogs;
