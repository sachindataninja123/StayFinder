import api from "../api/axios";

const register = async (formData) => {
  const res = await api.post("/auth/register", formData);

  return res.data;
};

const login = async (formData) => {
  const res = await api.post("/auth/login", formData);

  return res.data;
};

const getMe = async () => {
  const res = await api.get("/auth/get-me");

  return res.data;
};

const tokenRefresh = async () => {
  const res = await api.post("/auth/refresh");

  return res.data;
};

const logout = async () => {
  const res = await api.post("/auth/logout");

  return res.data;
};

export { register, login, tokenRefresh, logout, getMe };
