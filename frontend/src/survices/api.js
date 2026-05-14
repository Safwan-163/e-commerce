import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

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

// USER UPDATE
export const updateUser = (id, data) =>
  apiFetch(`/api/update-user/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

// PRODUCTS
export const getProducts = () => apiFetch("/api/products/");

export const searchProducts = (query) =>
  apiFetch(`/api/products/?search=${encodeURIComponent(query)}`);

// CART
export const addToCart = (data) =>
  apiFetch("/api/cart/add/", {
    method: "POST",
    body: JSON.stringify(data),
  });

// AUTH
export const loginUser = (data) =>
  apiFetch("/api/users/login/", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const signupUser = (data) =>
  axios.post(`${BASE_URL}/api/users/register/`, data);

// DASHBOARD
export const getDashboardStats = () =>
  apiFetch("/api/dashboard/stats/");

export const getWeeklyOrders = () =>
  apiFetch("/api/dashboard/orders-week/");

// ANALYTICS
export const getProductAnalytics = () =>
  axios.get(`${BASE_URL}/api/product-analytics/`);