import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./roots/root";
import Paste from "./roots/paste";
import PageNotFound from "./roots/errors/pageNotFound";
import PasteNotFound from "./roots/errors/pasteNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/pastes/:pasteId",
    loader: async ({ request, params }) => {
      return fetch(`http://localhost:3000/pastes/pastes/${params.pasteId}`, {
        signal: request.signal,
      });
    },
    element: <Paste />,
    errorElement: <PasteNotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
