import React, { useState, useEffect } from "react";
import axios from "axios";

function Account() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState({ name: "", email: "", password: "", mobile: "" });
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    // fetch once on mount
    axios
      .get(`http://localhost:5000/users/${user.id}`)
      .then((res) => {
        setForm({
          name: res.data.name || "",
          email: res.data.email || "",
          password: res.data.password || "",
          mobile: res.data.mobile || "",
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []); // 👈 empty dependency → only runs once

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value, // always update input field
    }));
  };

  const handleSave = async () => {
    try {
      if (!user) {
        alert("No user logged in");
        return;
      }

      const userId = Number(user.id);

      // Only send non-empty fields
      const updates = {};
      if (form.name.trim() !== "") updates.name = form.name;
      if (form.email.trim() !== "") updates.email = form.email;
      if (form.password.trim() !== "") updates.password = form.password;
      if (form.mobile.trim() !== "") updates.mobile = form.mobile;

      if (Object.keys(updates).length === 0) {
        alert("No changes to save");
        return;
      }

      const res = await axios.patch(
        `http://localhost:5000/users/${userId}`,
        updates
      );

      if (res.status === 200) {
        const updatedUser = { ...user, ...updates };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // keep what user typed
        setForm((prev) => ({ ...prev }));

        alert("Account updated successfully!");
      } else {
        alert("Failed to update account");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating account");
    }
  };

  if (loading) return <div className="text-white p-5">Loading...</div>;

  return (
    <div
      className={`p-5 transition-colors duration-300 rounded-2xl shadow-lg`}
      style={{
        maxWidth: "400px",
        margin: "auto", marginTop:"60px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        backgroundColor: theme === "dark" ? "#111827" : "#ffffff", // dark = gray-900, light = white
        color: theme === "dark" ? "#f9fafb" : "#111827", // dark = near-white text, light = near-black text
        border: theme === "dark" ? "1px solid #374151" : "1px solid #e5e7eb", // subtle border
      }}
    >
      <h2 className="mb-4">Account Settings</h2>
      <h4 style={{ fontWeight: "lighter", marginBottom: "20px" }}>
        👋 Welcome back, <span style={{ fontWeight: "bold", color: "#f5c518" }}>{form.name}</span>
      </h4>
        <div className="container">
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name || ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email || ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password || ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Mobile</label>
            <input
              type="text"
              name="mobile"
              value={form.mobile || ""}
              placeholder="+91 10-digit number"
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <button className="btn btn-warning" onClick={handleSave}>
          Save Changes
        </button>
      </div>
  );
}

export default Account;


