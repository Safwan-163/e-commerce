// Save tokens after login
export const setTokens = (access, refresh) => {
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
};

// Get access token
export const getAccessToken = () => {
  return localStorage.getItem("access");
};

// Get refresh token
export const getRefreshToken = () => {
  return localStorage.getItem("refresh");
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  window.location.href = "/login";
};

// Check login
export const isLoggedIn = () => {
  return !!localStorage.getItem("access");
};