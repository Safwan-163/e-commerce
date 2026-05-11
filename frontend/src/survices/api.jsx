const BASE_URL = "http://127.0.0.1:8000"; // Django server

export const apiFetch = async (url, options = {}) => {
  const access = localStorage.getItem("access");

  const res = await fetch(BASE_URL + url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(access && { Authorization: `Bearer ${access}` }),
      ...options.headers,
    },
  });

  return res.json();
};