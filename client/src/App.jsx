import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Footer, PrivateRoute } from "./layout/index";
import { Blog, Dashboard, Home, Login, Search, Signup } from "./pages/index";
import "./App.css";
import { useEffect } from "react";

const App = () => {
  //change the title of website
  useEffect(() => {
    document.title = import.meta.env.VITE_WEBSITE_TITLE;
  }, [import.meta.env.VITE_WEBSITE_TITLE]);

  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <Header />
        {/* <main className="relative py-3 px-4 dark:bg-gray-800 dark:text-white flex-1"> */}
        <main className="relative py-3 px-4 dark:bg-gradient-to-b from-gray-900 to-gray-800 dark:text-white flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/blog/:slug" element={<Blog />} />
            <Route path="/search" element={<Search />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
