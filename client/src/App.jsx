import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Footer, PrivateRoute } from "./layout/index";
import { Blog, Dashboard, Home, Login, Signup } from "./pages/index";
import "./App.css";
import { useState } from "react";

const App = () => {
  const WebsiteName = import.meta.env.VITE_WEBSITE_NAME;
  const [dark, setDark] = useState(true);
  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };
  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <Header
          siteName={WebsiteName}
          dark={dark}
          darkModeHandler={darkModeHandler}
        />
        <main className="relative py-3 px-4 dark:bg-gray-800 dark:text-white flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login siteName={WebsiteName} />} />
            <Route path="/signup" element={<Signup siteName={WebsiteName} />} />
            <Route path="/blog/:slug" element={<Blog />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </main>
        <Footer siteName={WebsiteName} />
      </BrowserRouter>
    </div>
  );
};

export default App;
