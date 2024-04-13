import axios from "axios";
import { apiKey } from "@/constants/urls/url.constant";
export const getCityWeather = (city) => {
  const params = `?q=${city}`;

  return axios({
    method: "GET",
    url: `/weather${params}`,
  });
};

export default {
  getCityWeather,
};
