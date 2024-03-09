export const ROUTE = Object.freeze({
  NAME: "playground",
  PATH: "/playground",
  COMPONENT: () => import("@/views/playground.view.vue"),
  META: {
    layout: "main",
  },
});

export default ROUTE;
