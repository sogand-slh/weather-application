import loadConstants from "./constant";
import loadPlugins from "./plugin";
import loadMiddleware from "./middleware";
import loadComponents from "./component";
import loadDirectives from "./directive";

export const createCore = (options = {}) => {
  const install = (app) => {
    const {
      components = false,
      plugins = [],
      middlewares = [],
      constants = false,
      directives = false,
    } = options;

    loadConstants(app, constants);
    loadPlugins(app, plugins);
    loadMiddleware(app, middlewares);
    loadComponents(app, components);
    loadDirectives(app, directives);
  };

  return {
    install,
  };
};
