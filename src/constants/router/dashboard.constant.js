export const ROUTE = Object.freeze({
  NAME: "dashboard",
  PATH: "/dashboard",
  COMPONENT: () => import("@/views/dashboard/dashboard.view.vue"),
  META: {
    layout: "main",
  },
});

export default ROUTE;
