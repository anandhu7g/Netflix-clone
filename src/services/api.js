// src/services/api.js
import axios from "axios";

const API_BASE = "https://netflix-clone-production-5e5b.up.railway.app"; 
// For local dev, you can swap to: "http://localhost:5000"

const api = axios.create({
  baseURL: API_BASE,
});

export default api;
