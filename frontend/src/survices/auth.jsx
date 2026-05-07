export const logoutUser = async () => {
  try {
    await fetch("/api/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: localStorage.getItem("refresh"),
      }),
    });
  } catch (err) {
    console.log("Logout API failed");
  }

  localStorage.removeItem("access");
  localStorage.removeItem("refresh");

  window.location.href = "/login";
};