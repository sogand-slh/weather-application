export const ROUTE = Object.freeze({
  NAME: "playground",
  PATH: "/playground",
  COMPONENT: () => import("@/views/playground.view.vue"),
  META: {
    auth: false,
    layout: "main",
  },
});

export default ROUTE;
