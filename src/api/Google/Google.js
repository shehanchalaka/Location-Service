import axios from "axios";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

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
    const baseURL = "https://maps.googleapis.com/maps/api/";
    const response = await api(
      `${baseURL}geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`,
      "GET"
    );

    const result = response.data?.results?.[0];

    const mapped_data = {
      address: result?.formatted_address,
    };

    return mapped_data;
  } catch (error) {
    throw error;
  }
};
