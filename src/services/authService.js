import users from "../assets/users.json";

// Login function
export function login(email, password) {
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (user) {
    // Save login state
    localStorage.setItem("user", JSON.stringify(user));
    return { success: true, user };
  }

  return { success: false, message: "Invalid email or password" };
}

// Get current user
export function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

// Logout function
export function logout() {
  localStorage.removeItem("user");
}
