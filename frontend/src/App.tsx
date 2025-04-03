import { useEffect } from "react";
import { useThemeStore } from "./store/use-theme-store";
import { useAuthStore } from "./store/use-auth-store";
import { Loader } from "lucide-react";
import Navbar from "./components/nav-bar";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/login-page";
import SignUpPage from "./pages/signup-page";
import SettingsPage from "./pages/setting-page";
import ProfilePage from "./pages/profile-page";
import HomePage from "./pages/home-page";
import ChooseCharacter from "./pages/choose-character";

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            authUser && authUser.profilePic.length <= 0 ? (
              <ChooseCharacter />
            ) : authUser ? (
              <HomePage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={authUser ? <LoginPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/characters"
          element={authUser ? <ChooseCharacter /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />

        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
