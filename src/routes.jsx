import { createBrowserRouter } from "react-router-dom";
import Chat from "./pages/Chat.jsx";
import Document from "./pages/Document.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";

export const routers = createBrowserRouter([
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/",
    element: <Document />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);
