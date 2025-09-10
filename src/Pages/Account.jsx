import React, { useState, useEffect } from "react";
import axios from "axios";

function Account() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState({ email: "", password: "", mobile: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5000/users/${user.id}`).then((res) => {
        setForm({
          email: res.data.email || "",
          password: res.data.password || "",
          mobile: res.data.mobile || "",
        });
        setLoading(false);
      });
    }
  }, []); // run once

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // Only include non-empty fields (avoid overwriting with "")
      const updates = {};
      if (form.email.trim() !== "") updates.email = form.email;
      if (form.password.trim() !== "") updates.password = form.password;
      if (form.mobile.trim() !== "") updates.mobile = form.mobile;

      // PATCH instead of PUT → preserves other fields like `myList` and `name`
      await axios.patch(`http://localhost:5000/users/${user.id}`, updates);

      // Update localStorage copy too (merge old and new values)
      const updatedUser = { ...user, ...updates };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert("Account updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating account");
    }
  };

  if (loading) return <div className="text-white p-5">Loading...</div>;

  return (
    <div
      className="text-white p-5"
      style={{
        maxWidth: "400px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "20px",
      }}
    >
      <h2>Account Settings</h2>
      <div className="container">
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Mobile</label>
          <input
            type="text"
            name="mobile"
            value={form.mobile}
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


