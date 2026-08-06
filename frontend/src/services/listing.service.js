import api from "../api/axios";

export const getListings = async () => {
  const res = await api.get("/listings");
  return res.data;
};

export const getListingById = async (id) => {
  const res = await api.get(`/listings/${id}`);
  return res.data;
};

export const createListing = async (formData) => {
  const res = await api.post(`/listings/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateListing = async ({ id, formData }) => {
  const res = await api.patch(`/listings/${id}/update`, formData);
  return res.data;
};

export const deleteListing = async (id) => {
  const res = await api.delete(`/listings/${id}/delete`);
  return res.data;
};

export const updateListingImage = async ({ id, formData }) => {
  const res = await api.patch(`/listings/${id}/update-image`, formData);
  return res.data;
};
