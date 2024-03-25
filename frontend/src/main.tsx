import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./roots/root";
import ViewPaste from "./roots/viewPaste";
import CreatePaste from "./roots/createPaste";
import PageNotFound from "./roots/errors/pageNotFound";
import PasteNotFound from "./roots/errors/pasteNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/pastes/new",
    element: <CreatePaste />,
  },
  {
    path: "/pastes/:pasteId",
    loader: async ({ request, params }) => {
      return fetch(`http://localhost:3000/pastes/get/${params.pasteId}`, {
        signal: request.signal,
      });
    },
    element: <ViewPaste />,
    errorElement: <PasteNotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
