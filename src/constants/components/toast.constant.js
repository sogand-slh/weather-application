export const TOAST_POSITION = {
  TOP_LEFT: "top-left",
  TOP_CENTER: "top-center",
  TOP_RIGHT: "top-right",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_CENTER: "bottom-center",
  BOTTOM_RIGHT: "bottom-right",
};
export const TOAST_OPTIONS = Object.freeze({
  position: "bottom-right",
  timeout: false,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  showCloseButtonOnHover: true,
  closeButton: "button",
  icon: true,
  rtl: false,
});
export const TOAST_ICONS = Object.freeze({
  error: "info-circle",
  success: "tick-circle",
  warning: "info-circle",
});
export const TOAST_TYPES = ["error", "success", "warning"];

export default {
  TOAST_OPTIONS,
  TOAST_ICONS,
  TOAST_TYPES,
  TOAST_POSITION,
};
