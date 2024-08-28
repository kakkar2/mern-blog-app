// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeModeProvider } from "./layout/index.jsx";

createRoot(document.getElementById("root")).render(
  //reduxpersist is use to store the state globally in user browser for better experience
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeModeProvider>
        <App />
      </ThemeModeProvider>
    </Provider>
  </PersistGate>
);
