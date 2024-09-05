import { memo } from "react";

const Footer = () => {
  return (
    <div className="p-3 flex justify-between items-center border-t dark:bg-gradient-to-r from-gray-900 to-gray-800 dark:text-white dark:border-gray-600">
      <div className="logo cursor-pointer flex items-center">
        <h1 className="font-bold text-md hover:text-theme transition-all duration-200 uppercase tracking-wide">
          {import.meta.env.VITE_WEBSITE_NAME}.
        </h1>
      </div>
      <div>
        <ul className="flex items-center gap-2">
          <li className="hover:text-theme cursor-pointer text-sm md:text-md lg:text-md">
            Terms & Conditions
          </li>
          <li className="hover:text-theme cursor-pointer text-sm md:text-md lg:text-md">
            Privacy Policy
          </li>
        </ul>
      </div>
    </div>
  );
};

export default memo(Footer);
