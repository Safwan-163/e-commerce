import axios from "axios";

const api = axios.create({
 // baseURL: "http://127.0.0.1:8000/api/",
  // baseURL: "https://bayraha.com/api/",
  baseURL: "https://backend.bayraha.com/api/"
});

api.interceptors.request.use((config) => {
  const publicUrls = [
    "users/login/",
    "users/register/",
  ];

  if (!publicUrls.includes(config.url)) {
    const token = localStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;