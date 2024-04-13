import axios from "axios";
import eventBus from "@/modules/event-bus";

const onRequest = (request) => request;

const onRequestError = (error) => {
  return Promise.reject(error);
};

const onResponse = (response) => {
  let url = response.config.url;
  console.log("🚀 ~ onResponse ~ url:", url);

  if (response.data?.data?.message)
    eventBus.publish("toast:generate", response.data?.data?.message, "success");

  return response.data;
};

const onResponseError = (error, app) => {
  let url = error?.response?.config?.url;

  eventBus.publish(
    "toast:generate",
    error?.response?.data?.data?.message?.fa,
    "error"
  );

  const code = parseInt(error.response && error.response.status);
  if (code === 401) {
    console.log("🚀 ~ onResponseError ~ code:", code);
  }
  return Promise.reject(error.response);
};

export default function (app) {
  axios.defaults.timeout = 2 * 60 * 1000;
  axios.interceptors.request.use(onRequest, onRequestError);
  axios.interceptors.response.use(
    (response) => onResponse(response, app),
    (error) => onResponseError(error, app)
  );
}
