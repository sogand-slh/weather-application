import pluginsEntry from "@/plugins";
export default function loadPlugins(app, plugins) {
  if (!!plugins && plugins.length)
    for (const plugin of plugins) {
      typeof pluginsEntry[plugin] === "function"
        ? pluginsEntry[plugin]?.(app)
        : app.use(pluginsEntry[plugin]);
    }
}
