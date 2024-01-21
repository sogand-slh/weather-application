export default function loadComponents(app, components) {
  if (typeof components === "boolean" && components) registerAll(app);
  if (!!components && components.constructor === Array)
    registerList(app, components);
  if (!!components && components.constructor === Object)
    registerExceptions(app, components);
}

function registerAll(app) {
  const components = getComponents();
  if (components) {
    components.keys().forEach((filePath) => {
      const component = components(filePath);

      const fileName = getFileName(filePath);

      registerComponent(app, fileName, component);
    });
  }
}

function registerList(app, list) {
  const components = getComponents();
  if (components && list?.length) {
    components.keys().forEach((filePath) => {
      // Get component config
      const component = components(filePath);

      // Gets the file name regardless of folder depth
      const fileName = getFileName(filePath);

      if (list.includes(fileName)) registerComponent(app, fileName, component);
    });
  }
}


function registerExceptions(app, prop) {
  let list = prop?.ignore;
  const components = getComponents();

  if (components) {
    components.keys().forEach((filePath) => {
      // Get component config
      const component = components(filePath);

      // Gets the file name regardless of folder depth
      const fileName = getFileName(filePath);

      if (!list.includes(fileName)) registerComponent(app, fileName, component);
    });
  }
}

const getComponents = () =>
  require.context(
    // The relative path of the components folder
    "@/components",
    // Whether to look in folders
    true,
    // The regular expression used to match base component filenames
    /\w+\.vue$/
    // optional, 'sync' | 'eager' | 'weak' | 'lazy' | 'lazy-once', default 'sync'\
    // "sync"
    // "lazy-once"
  );

const getFileName = (filePath) =>
  filePath
    .split("/")
    .pop()
    .replace(/\.\w+$/, "")
    ?.split(".")?.[0];

const registerComponent = (app, fileName, component) =>
  app.component(
    fileName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    // () => component.default || component
    component.default || component
  );
