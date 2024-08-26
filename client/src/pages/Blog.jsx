import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { handleGETData } from "../data/server";

const Blog = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const serverData = await handleGETData(`/blog/all-blogs?slug=${slug}`);
      if (serverData.success == true) {
        console.log(serverData.blogs[0]);
        setBlog(serverData.blogs[0]);
      } else {
        console.log(serverData.message);
      }
    };
    fetchData();
    if (blog) {
      setLoading(false);
    }
  }, [slug]);
  return loading ? (
    <>Loading....</>
  ) : (
    <div className="w-4/5 mx-auto mt-10">
      <h1 className="font-bold capitalize mb-5 text-4xl text-center mb-3 font-primary">
        {blog && blog.title}
      </h1>
      <div className="flex justify-center gap-2 flex-wrap p-4 mb-5">
        <span className="bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 cursor-pointer">
          #{blog && blog.category}
        </span>
      </div>
      <div className="w-full h-96 mb-3">
        <img
          src={blog && blog.thumbnail}
          className="mx-auto w-full h-full object-cover"
          alt="BLOG-IMAGE"
        />
      </div>
      <div className="flex items-center justify-between py-3 border-b border-slate-500 mb-5">
        <span>Created On: {new Date(blog.createdAt).toLocaleDateString()}</span>
        <span>
          {(blog && blog.description?.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      {/* using dangerouslySetInnerHTML we can render the content as html code  */}
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: blog && blog.description }}
      ></div>
    </div>
  );
};

export default Blog;
