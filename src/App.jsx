import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "./layouts/MainLayout";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import Dashboard from "./Pages/Dashboard";
import Settings from "./Pages/Settings";
import Account from "./Pages/Account";

function App() {
  const [theme, setTheme] = useState("dark");

  // Load theme from localStorage on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Loaded user from localStorage:", user);
    if (user?.theme) {
      console.log("Setting theme from localStorage:", user.theme);
      setTheme(user.theme);
    }
  }, []);

  // Apply theme when it changes
  useEffect(() => {
    console.log("Applying theme:", theme);
    document.body.style.backgroundColor = theme === "dark" ? "#000" : "#fff";
    document.body.style.color = theme === "dark" ? "#fff" : "#000";
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>

        {/* Dashboard routes */}
        <Route path="/dashboard" element={<Dashboard theme={theme} />} />
        <Route path="/account" element={<Account />} />
        <Route
          path="/settings"
          element={<Settings theme={theme} setTheme={setTheme} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


