import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { handleGETData, handlePOSTData } from "../data/server";
import { useSelector } from "react-redux";
import { CommentItem } from "../components/index";

const Blog = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState({});
  const [blogId, setBlogId] = useState(null);
  const [comments, setComments] = useState({});
  const [comment, setComment] = useState("");

  //getting current login user info
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      const serverData = await handleGETData(`/blog/all-blogs?slug=${slug}`);
      if (serverData.success == true) {
        // console.log(serverData.blogs[0]);
        setBlog(serverData.blogs[0]);
        setBlogId(serverData.blogs[0]?._id);
      } else {
        console.log(serverData.message);
      }
    };
    fetchData();
  }, [slug]);

  const readingTime = (content) => {
    if (content) {
      const wordCount = content.trim().split(/\s+/).length;
      //250 word per minute read speed
      const wordPerMinute = 200;
      const minute = Math.ceil(wordCount / wordPerMinute);
      return `${minute} minute${minute > 1 ? "s read" : ""}`;
    }
  };

  const fetchComment = async (id) => {
    console.log(id);
    const serverData = await handleGETData(`/comment/${id}`);
    if (serverData.success == true) {
      setComments(serverData);
    } else {
      console.log(serverData.message);
    }
  };

  useEffect(() => {
    if (blogId) {
      fetchComment(blogId);
    }
  }, [blogId]);

  const handleComment = async (e) => {
    e.preventDefault();
    const result = new FormData();
    result.append("description", comment);
    const serverData = await handlePOSTData(
      `/comment/add-comment/${blog._id}`,
      Object.fromEntries(result.entries())
    );
    if (serverData.success == false) {
      console.log(serverData.message);
    } else {
      // fetchComment();
      setComment("");
    }
  };

  return blog.length > 0 ? (
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
        <div className="flex items-center gap-1 lg:gap-2">
          <div className="flex items-center gap-1 lg:gap-2 py-1.5">
            <div className="w-5 h-5 lg:w-10 lg:h-10 rounded-xl bg-gray-300">
              <img
                src={blog && blog.createdBy?.profileImage}
                className="w-full h-full object-cover rounded-xl"
                alt="PROFILE_IMAGE"
              />
            </div>
            <div>
              <p className="font-semibold text-sm md:text-md lg:text-md">
                {blog && blog.createdBy?.fullName}
              </p>
            </div>
          </div>
          <span className="mx-1">|</span>
          <span className="text-sm md:text-md lg:text-md">
            Created On: {new Date(blog.createdAt).toLocaleDateString()}
          </span>
        </div>
        <span className="text-sm md:text-md lg:text-md">
          {blog && readingTime(blog?.description)}
        </span>
      </div>
      {/* using dangerouslySetInnerHTML we can render the content as html code  */}
      <div
        className="post-content mb-5"
        dangerouslySetInnerHTML={{ __html: blog && blog.description }}
      ></div>
      <div className="border-t dark:border-gray-600 mt-2">
        <h1 className="font-bold font-primary text-2xl mt-4">
          Comments ({comments != {} ? comments?.totalComments : 0}){" "}
          {console.log(comments)}
        </h1>
        {currentUser && (
          <div className="relative w-full bg-white dark:bg-gray-800 rounded-lg border pt-4 mx-auto mt-10 dark:border-gray-600">
            <div className="absolute px-2 top-0 -left-[0.5] bg-theme rounded-tl-lg rounded-br-lg">
              <h2 className="text-md font-semibold text-white dark:text-gray-100">
                Add Comments
              </h2>
            </div>
            <form onSubmit={handleComment}>
              <div className="w-full px-3 mb-2 mt-6">
                <textarea
                  className="bg-gray-100 rounded border border-gray-400 leading-normal w-full h-28 p-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white resize-none dark:bg-gray-800"
                  name="description"
                  placeholder="Your comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="w-full flex justify-between px-3 my-3">
                <div className="flex items-center gap-2 py-1.5">
                  <div className="w-10 h-10 rounded-xl bg-gray-300">
                    <img
                      src={currentUser.data.profileImage}
                      className="w-full h-full object-cover rounded-xl"
                      alt="PROFILE_IMAGE"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{currentUser.data.fullName}</p>
                  </div>
                </div>
                <button
                  className="px-2.5 py-1.5 rounded-md text-white text-sm bg-theme text-lg"
                  type="submit"
                >
                  Comment
                </button>
              </div>
            </form>
          </div>
        )}
        {comments?.comments?.length > 0 ? (
          comments?.comments?.map((comment) => (
            <CommentItem {...comment} key={comment._id} />
          ))
        ) : (
          <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-900 dark:shadow-xl my-3">
            <p className="dark:text-gray-100">
              {!currentUser
                ? " No Comments Yet. Login to comment.."
                : "No Comments Yet. Be the first to comment..."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
