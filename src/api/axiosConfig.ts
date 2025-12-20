import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Attach latest token from localStorage to each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Automatically handle 401: clear auth and redirect to login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    if (status === 401) {
      console.warn("Request unauthorized (401) — clearing token and redirecting to login");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      try {
        // use location replace so history isn't polluted
        window.location.replace('/login');
      } catch (e) {
        // ignore in non-browser environments
      }
    }
    return Promise.reject(err);
  }
);

export default api;
