import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import store from "./store/root.state.js";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
      {/* <ToastContainer /> */}
      <Toaster richColors position="top-center" />
    </React.StrictMode>
  </Provider>
);
