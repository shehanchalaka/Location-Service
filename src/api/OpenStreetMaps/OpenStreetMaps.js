import axios from "axios";

const api = async (url, method = "GET", data) => {
  return axios({
    url,
    method,
    data,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

export const reverseGeocode = async ({ latitude, longitude }) => {
  try {
    const baseURL = "https://nominatim.openstreetmap.org/";
    const response = await api(
      `${baseURL}reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
      "GET"
    );

    const result = response.data;

    const mapped_data = {
      address: result?.display_name,
    };

    return mapped_data;
  } catch (error) {
    throw error;
  }
};
