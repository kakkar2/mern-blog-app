import { useEffect, useState } from "react";
import { Card, CardSkeleton } from "../components/index";
import { handleGETData } from "../data/server";

const Home = () => {
  const [blogs, setBlog] = useState([]);

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
      console.log(serverData);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div className="w-4/5 mx-auto">
      <div className="mb-5">
        <div className="coding mb-3">
          <h1 className="font-primary font-semibold text-xl">
            Recent Coding Blogs
          </h1>
        </div>
        <div className="flex items-center mx-auto flex-wrap gap-5">
          {blogs.length > 0 ? (
            blogs
              .filter((blog) => blog.category == "Coding")
              .map((blog) => <Card key={blogs.slug} {...blog} />)
          ) : (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
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
        <div className="flex items-center mx-auto flex-wrap gap-5">
          {blogs.length > 0 ? (
            blogs
              .filter((blog) => blog.category == "Food")
              .map((blog) => <Card key={blogs.slug} {...blog} />)
          ) : (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
