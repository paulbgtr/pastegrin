import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/root";
import ViewPaste from "./routes/viewPaste";
import CreatePaste from "./routes/createPaste";
import PageNotFound from "./routes/errors/pageNotFound";
import PasteNotFound from "./routes/errors/pasteNotFound";
import SignIn from "./routes/signin";
import SignUp from "./routes/signup";
import UserPastes from "./routes/userPastes";
import MyPastes from "./routes/myPastes";
import Settings from "./routes/settings";
import PublicPastes from "./routes/publicPastes";

import { Navbar } from "./components/Navbar";

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
    path: "/pastes",
    loader: async ({ request }) => {
      return fetch("http://localhost:3000/pastes/get/public", {
        signal: request.signal,
      });
    },
    element: <PublicPastes />,
  },
  {
    path: "/pastes/:pasteId",
    loader: async ({ request, params }) => {
      return fetch(`http://localhost:3000/pastes/get/${params.pasteId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        signal: request.signal,
      });
    },
    element: <ViewPaste />,
    errorElement: <PasteNotFound />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/user/:username",
    element: <UserPastes />,
  },
  {
    path: "/me/pastes",
    loader: async ({ request }) => {
      return fetch("http://localhost:3000/pastes/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        signal: request.signal,
      });
    },
    element: <MyPastes />,
  },
  {
    path: "/me/settings",
    element: <Settings />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Navbar />
    <RouterProvider router={router} />
  </React.StrictMode>
);
