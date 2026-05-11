import { apiFetch } from "./api";

export const loginUser = async (data) => {
  return apiFetch("/api/login/", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const logoutUser = async () => {
  await apiFetch("/api/logout/", {
    method: "POST",
    body: JSON.stringify({
      refresh: localStorage.getItem("refresh"),
    }),
  });

  localStorage.removeItem("access");
  localStorage.removeItem("refresh");

  window.location.href = "/login";
};