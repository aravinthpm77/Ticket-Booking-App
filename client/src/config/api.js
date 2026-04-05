const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  "https://ticket-booking-app-h1ws.onrender.com";

export const apiUrl = (path = "") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

export { API_BASE_URL };
