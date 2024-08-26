import { memo } from "react";

const Footer = ({ siteName }) => {
  return (
    <div className="p-3 flex justify-between items-center border-t dark:bg-gray-800 dark:text-white dark:border-gray-600">
      <div className="logo cursor-pointer">
        <h1 className="font-bold text-md">{siteName}</h1>
      </div>
      <div className="social-icons">
        <ul className="flex items-center gap-2">
          <li className="hover:cursor-pointer">Instagram</li>
          <li className="hover:cursor-pointer">FaceBook</li>
          <li className="hover:cursor-pointer">Github</li>
        </ul>
      </div>
    </div>
  );
};

export default memo(Footer);
