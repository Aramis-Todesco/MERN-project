import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  Home,
  Login,
  Register,
  MyBooks,
  UpdateBook,
  MyBook,
  Logout,
  CreateBook,
  NoToken,
  TermsConditions,
  Copyright,
} from "./pages/index.js";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { ScrollProvider } from "./context/ScrollContext.jsx";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/books",
        element: <ProtectedRoute element={<MyBooks />} />,
        loader: () =>
          fetch(`${backendUrl}/api/books`, { credentials: "include" }),
      },
      {
        path: "/books/:id",
        element: <ProtectedRoute element={<MyBook />} />,
        loader: ({ params }) =>
          fetch(`${backendUrl}/api/books/${params.id}`, {
            credentials: "include",
          }),
      },
      {
        path: "/create-book",
        element: <ProtectedRoute element={<CreateBook />} />,
        loader: () =>
          fetch(`${backendUrl}/api/books/create-book`, {
            credentials: "include",
          }),
      },
      {
        path: "/update/:id",
        element: <ProtectedRoute element={<UpdateBook />} />,
        loader: ({ params }) =>
          fetch(`${backendUrl}/api/books/${params.id}`, {
            credentials: "include",
          }),
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/logged-out",
        element: <NoToken />,
      },
      {
        path: "/terms-conditions",
        element: <TermsConditions />,
      },
      {
        path: "/copyright",
        element: <Copyright />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ScrollProvider>
      <RouterProvider router={router} />
    </ScrollProvider>
  </React.StrictMode>
);
