const BASE_URL = "http://127.0.0.1:8000/api"; // Django server

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


export const signupUser = (data) => {
  return apiFetch("/api/signup/", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const searchProducts = (query) => {
  return apiFetch(`/api/products/?search=${query}`);
};


// // PRODUCTS (Employee)
// export const addProduct = (data) => API.post("products/", data);

// export const updateProduct = (id, data) =>
//   API.put(`products/${id}/`, data);

// export const deleteProduct = (id) =>
//   API.delete(`products/${id}/`);



export const getDashboardStats = () =>
  apiFetch("dashboard/stats/");

export const getWeeklyOrders = () =>
  apiFetch("dashboard/orders-week/");
