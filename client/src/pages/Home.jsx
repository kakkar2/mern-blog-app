import { useEffect, useState } from "react";
import { Card, CardSkeleton } from "../components/index";
import { handleGETData } from "../data/server";

const Home = () => {
  const [blogs, setBlog] = useState([]);

  //how many skeleton that we want to show to user before page load
  const loaderCount = 4;

  useEffect(() => {
    try {
      const fetchData = async () => {
        const serverData = await handleGETData("/blog/all-blogs");
        if (serverData?.success == true) {
          setBlog(serverData.blogs);
          console.log(serverData);
        }
      };
      fetchData();
      // console.log(serverData);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div className="w-4/5 mx-auto">
      <div className="mb-5">
        <div className="recent mb-3">
          <h1 className="font-primary fornt-semibold text-xl">Recent Blogs</h1>
        </div>
        <div className="flex items-center mx-auto flex-wrap md:gap-5 lg:gap-5">
          {blogs.length > 0 ? (
            blogs.slice(0, 8).map((blog) => <Card key={blog.slug} {...blog} />)
          ) : (
            <>
              {Array.from({ length: loaderCount }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </>
          )}
        </div>
      </div>
      <div className="mb-5">
        <div className="coding mb-3">
          <h1 className="font-primary font-semibold text-xl">
            Recent Coding Blogs
          </h1>
        </div>
        <div className="flex items-center mx-auto flex-wrap md:gap-5 lg:gap-5">
          {blogs.length > 0 ? (
            blogs
              .filter((blog) => blog.category == "Coding")
              .slice(0, 4)
              .map((blog) => <Card key={blog.slug} {...blog} />)
          ) : (
            <>
              {Array.from({ length: loaderCount }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </>
          )}
        </div>
      </div>
      <div className="mb-5">
        <div className="coding mb-3">
          <h1 className="font-primary font-semibold text-xl">
            Recent Food Blogs
          </h1>
        </div>
        <div className="flex items-center mx-auto flex-wrap md:gap-5 lg:gap-5">
          {blogs.length > 0 ? (
            blogs
              .filter((blog) => blog.category == "Food")
              .slice(0, 4)
              .map((blog) => <Card key={blog.slug} {...blog} />)
          ) : (
            <>
              {Array.from({ length: loaderCount }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
