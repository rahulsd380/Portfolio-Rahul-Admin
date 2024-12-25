import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { router } from "./Routes/routes";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <UserProvider> */}
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </Provider>
    {/* </UserProvider> */}
  </React.StrictMode>
);
