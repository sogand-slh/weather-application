export default function loadMiddleware(app, middlewares) {
  if (!!middlewares && middlewares.length)
    for (const middleware of middlewares) {
      middleware(app);
    }
}
