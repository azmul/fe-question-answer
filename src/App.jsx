import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthGuard from "./components/AuthGuard/AuthGuard";
import Chat from "./pages/Chat.jsx";
import Article from "./pages/Article.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import UserProfile from "./pages/UserProfile.jsx";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route element={<AuthGuard />}>
          <Route path="/" element={<Article />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
