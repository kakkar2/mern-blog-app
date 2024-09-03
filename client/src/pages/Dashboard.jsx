import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SideBar } from "../components/index";
import { Profile, Blogs, Users } from "../pages/index";
import { CreateBlog, EditBlog } from "../layout/index";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlPrams = new URLSearchParams(location.search);
    const tabFromUrl = urlPrams.get("tab");
    if (tabFromUrl) {
      // console.log(tabFromUrl);
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const pages = {
    profile: <Profile />,
    blogs: <Blogs tab={tab} />,
    "blog-add-new": <CreateBlog />,
    "edit-blog": <EditBlog />,
    users: <Users />,
  };
  return (
    <div className="flex flex-col md:flex-row items-stretch gap-2">
      <div className="sidebar flex items-stretch shadow-lg">
        <SideBar tab={tab} />
      </div>
      <div className="mainContent w-9/12 mx-auto">{pages[tab]}</div>
    </div>
  );
};

export default Dashboard;
