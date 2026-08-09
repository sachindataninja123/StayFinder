import api from "../api/axios";

export const addReview = async ({ formData, id }) => {
  const res = await api.post(`/reviews/${id}/create`, formData);

  return res.data;
};

export const getReviews = async (id) => {
  const res = await api.get(`/reviews/${id}`);

  return res.data;
};

export const updateReviews = async ({ formData, id }) => {
  const res = await api.patch(`/reviews/${id}/update`, formData);

  return res.data;
};

export const deleteReviews = async (id) => {
  const res = await api.delete(`/reviews/${id}`);

  return res.data;
};
