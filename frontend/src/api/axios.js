import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

// Add access token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Handle expired access token
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Don't try to refresh the refresh request itself
    if (originalRequest.url?.includes("/auth/refresh")) {
      localStorage.removeItem("token");
      return Promise.reject(error);
    }

    // Prevent infinite retry
    if (originalRequest._retry) {
      localStorage.removeItem("token");
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // Another request is already refreshing
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((newToken) => {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      });
    }

    isRefreshing = true;

    try {
      // IMPORTANT: your refresh route
      const response = await api.post("/auth/refresh");

      const newAccessToken = response.data;

      if (!newAccessToken) {
        throw new Error("New access token not received");
      }
      console.log(response.data)

      localStorage.setItem("token", newAccessToken);

      processQueue(null, newAccessToken);

      // Retry original request
      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);

      localStorage.removeItem("token");

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;