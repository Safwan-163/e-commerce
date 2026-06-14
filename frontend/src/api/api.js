import API from "./axios";


// PRODUCTS
export const getProducts = () => API.get("products/all-products/");
export const getProductDetails = (productCode) => API.get(`products/product-details/${productCode}/`);
export const addProduct = (data) => API.post("products/add-product/", data);
export const updateProduct = (productCode, data) => API.put(`products/update-product/${productCode}/`, data);
// export const deleteProduct = (productCode) => API.delete(`products/remove-product/${productCode}/`);
export const getProductAnalytics = () => API.get("products/product-analytics/");
export const deleteProduct = async (productCode) => {
  const response = await API.delete(
    `products/remove-product/${productCode}/`
  );

  return response.data;
};



// CART
export const getCart = () => API.get("cart/view-cart/");
export const addToCart = (data) => API.post("cart/add-to-cart/", data);
export const removeFromCart = (data) => API.post("cart/remove-cart-item/", data);
export const clearCart = () => API.post("cart/clear-cart/");

// ORDERS
export const placeOrder = () => API.post("orders/place-order/");
export const getOrders = () => API.get("orders/view-orders/");
export const cancelOrder = (id) => API.post(`orders/cancel-order/${id}/`);
export const getOrderDetails = (id) => API.get(`orders/order-details/${id}/`);
export const getOrderlist = () => API.get("orders/list-orders/");
export const updateOrderStatus = (id, status) => API.post(`orders/update-order-status/${id}/`, { status });
export const getOrderhistory = () => API.get("orders/order-history/");
export const trackOrder = (id) => API.get(`orders/track-order/${id}/`);
export const returnOrder = (id) => API.post(`orders/return-order/${id}/`);
export const applydiscount = (code) => API.post("orders/apply-discount/", { code });
export const getinvoice = (id) => API.get(`orders/generate-invoice/${id}/`);

// AUTH
export const loginUser = (data) => API.post("users/login/", data);
export const signupUser = (data) => API.post("users/register/", data);
export const logoutUser = () => API.post("users/logout/");
export const getUserProfile = () => API.get("users/profile/");
export const updateUserProfile = (data) => API.put("users/update-profile/", data);

//payment
export const confirmPayment = (data) => API.post("payments/confirm-payment/", data);
export const getPaymentStatus = (id) => API.get(`payments/payment-status/${id}/`);

//core
export const sendOTP = (data) => API.post("core/send-otp/", data);
export const verifyOTP = (data) => API.post("core/verify-otp/", data);
export const resetPassword = (data) => API.post("core/reset-password/", data);
export const refund= (data) => API.post("core/process-refund/", data);
export const getDashboardStats = () => API.get("core/dashboard/stats/");
export const getWeeklyOrders = () => API.get("core/dashboard/orders-week/");

//login
export const getAuthHeaders = () => {
  return {
    Authorization: `Bearer ${localStorage.getItem("access")}`,
    "Content-Type": "application/json",
  };
};

export const getProduct = async (productCode) => {
  const response = await API.get(
    `products/product-details/${productCode}/`
  );

  return response.data;
};