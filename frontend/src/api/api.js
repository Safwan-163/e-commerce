import API from "./axios";

// PRODUCTS
export const getProducts = () => API.get("products/");
export const addProduct = (data) => API.post("products/", data);
export const updateProduct = (id, data) => API.put(`products/${id}/`, data);
export const deleteProduct = (id) => API.delete(`products/${id}/`);

// CART
export const getCart = () => API.get("cart/");
export const addToCart = (data) => API.post("cart/add/", data);
export const removeFromCart = (data) => API.post("cart/remove/", data);
export const clearCart = () => API.post("cart/clear/");

// ORDERS
export const placeOrder = () => API.post("orders/place/");
export const getOrders = () => API.get("orders/");
export const cancelOrder = (id) => API.post(`orders/cancel/${id}/`);

// AUTH
export const loginUser = (data) => API.post("login/", data);