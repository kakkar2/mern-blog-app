import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { handleGETData } from "../data/server";
import { Card, CardSkeleton } from "../components/index";
import errorImage from "../assets/nodata.png";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [blogs, setBlogs] = useState([]);
  console.log(searchParams.get("query"));

  useEffect(() => {
    if (!query) return;
    try {
      const fetchData = async () => {
        const serverData = await handleGETData(
          `/blog/all-blogs?searchTerm=${query}`
        );
        setBlogs(serverData?.blogs);
        console.log(serverData);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [query]);
  return (
    <div className="flex items-center gap-3">
      <div className="w-4/5 mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          Result Based on Search: {query}
        </h1>
        <div className="flex items-center mx-auto flex-wrap md:gap-5 lg:gap-5">
          {blogs != [] ? (
            blogs.length > 0 ? (
              blogs.map((blog) => <Card key={blog._id} {...blog} />)
            ) : (
              <div className="w-full flex flex-col justify-center items-center m-h-screen">
                <img src={errorImage} className="w-96 h-96" alt="NOT_FOUND" />
                <p className="text-xl text-center">No Blogs Found.</p>
              </div>
            )
          ) : (
            <CardSkeleton />
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
