import routeConstants from "@/constants/router";

export default [
  {
    path: "/",
    redirect: { name: routeConstants.playground.NAME },
  },
  {
    path: routeConstants.playground.PATH,
    name: routeConstants.playground.NAME,
    component: routeConstants.playground.COMPONENT,
    meta: routeConstants.playground.META,
  },
];
