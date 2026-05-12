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

// USER UPDATE
export const updateUser = (id, data) => {
  return apiFetch(`/api/update-user/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

// GET PRODUCTS
export const getProducts = () => {
  return apiFetch("/api/products/");
};

// CART
export const addToCart = (data) => {
  return apiFetch("/api/cart/add/", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const loginUser = (data) => {
  return apiFetch("/api/login/", {
    method: "POST",
    body: JSON.stringify(data),
  });
};