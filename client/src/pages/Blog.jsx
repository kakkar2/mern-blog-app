import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { handleGETData } from "../data/server";
import { useSelector } from "react-redux";
import CommentItem from "../components/commentItem";

const Blog = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(false);

  //getting current login user info
  const { currentuser } = useSelector((state) => state.user);

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
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 py-5">
            <div className="w-10 h-10 rounded-xl bg-gray-300">
              {/* <img src="" className="w-full h-full object-cover" alt="" /> */}
            </div>
            <div>
              <p className="font-semibold">USer</p>
            </div>
          </div>
          <span className="mx-1">|</span>
          <span>
            Created On: {new Date(blog.createdAt).toLocaleDateString()}
          </span>
        </div>
        <span>
          {(blog && blog.description?.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      {/* using dangerouslySetInnerHTML we can render the content as html code  */}
      <div
        className="post-content mb-5"
        dangerouslySetInnerHTML={{ __html: blog && blog.description }}
      ></div>
      <div className="border-t dark:border-gray-600 mt-2">
        <h1 className="font-bold font-primary text-2xl mt-4">Comments (0)</h1>

        <CommentItem />

        {currentuser && (
          <div className="relative w-full bg-white dark:bg-gray-800 rounded-lg border pt-4 mx-auto mt-20 dark:border-gray-600">
            <div className="absolute px-2 top-0 -left-[0.5] bg-theme rounded-tl-lg rounded-br-lg">
              <h2 className="text-md font-semibold text-white dark:text-gray-100">
                Add Comments
              </h2>
            </div>
            <form>
              <div className="w-full px-3 mb-2 mt-6">
                <textarea
                  className="bg-gray-100 rounded border border-gray-400 leading-normal w-full h-28 p-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white resize-none dark:bg-gray-800"
                  name="body"
                  placeholder="Your comment"
                  required=""
                ></textarea>
              </div>
              <div className="w-full flex justify-end px-3 my-3">
                <button className="px-2.5 py-1.5 rounded-md text-white text-sm bg-theme text-lg">
                  Comment
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
