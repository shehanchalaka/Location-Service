import axios from "axios";

const HERE_API_KEY = process.env.HERE_API_KEY;

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
    const baseURL = "https://revgeocode.search.hereapi.com/v1/revgeocode";
    const response = await api(
      `${baseURL}?at=${latitude}%2C${longitude}&lang=en-US&apiKey=${HERE_API_KEY}`,
      "GET"
    );
    const item = response?.data?.items?.[0];

    const mapped_data = {
      address: item?.title,
    };

    return mapped_data;
  } catch (error) {
    throw error;
  }
};

export const autocomplete = async ({ query, latitude, longitude }) => {
  try {
    const baseURL = "https://autosuggest.search.hereapi.com/v1/autosuggest";
    const response = await api(
      `${baseURL}?at=${latitude},${longitude}&limit=10&q=${query}&apiKey=${HERE_API_KEY}`,
      "GET"
    );
    const items = response?.data?.items;

    const mapped_data = items.map((t) => ({
      address: t?.address?.label,
    }));

    return mapped_data;
  } catch (error) {
    throw error;
  }
};
