import axios from "axios";

export const getCityWeather = (city) =>
  axios({
    method: "GET",
    url: `/weather`,
    params: {
      q: city,
    },
  });

export default {
  getCityWeather,
};
