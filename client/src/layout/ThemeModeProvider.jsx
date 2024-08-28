import { useSelector } from "react-redux";

const ThemeModeProvider = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);
  return <div className={theme}>{children}</div>;
};

export default ThemeModeProvider;
