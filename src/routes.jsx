import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Chat from "./pages/Chat.jsx";
import Document from "./pages/Document.jsx";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/document",
    element: <Document />,
  },
]);
