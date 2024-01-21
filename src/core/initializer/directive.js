export default function loadDirectives(app, directives) {
  if (typeof directives === "boolean" && directives) registerAll(app);
  if (!!directives && directives.constructor === Array) registerList(app, directives);
  if (!!directives && directives.constructor === Object) registerExceptions(app, directives);
}

function registerAll(app) {
  const directives = getDirectives();

  if (directives) {
    directives.keys().forEach((filePath) => {
      // Get directive config
      const directive = directives(filePath);

      // Gets the file name regardless of folder depth
      const fileName = getFileName(filePath);

      registerDirective(app, fileName, directive);
    });
  }
}

// eslint-disable
function registerList(app, list) {
  const directives = getDirectives();

  if (directives && list?.length) {
    directives.keys().forEach((filePath) => {
      // Get directive config
      const directive = directives(filePath);

      // Gets the file name regardless of folder depth
      const fileName = getFileName(filePath);

      if (list.includes(fileName)) registerDirective(app, fileName, directive);
    });
  }
}

// eslint-disable
function registerExceptions(app, prop) {
  let list = prop?.ignore;
  const directives = getDirectives();

  if (directives) {
    directives.keys().forEach((filePath) => {
      // Get directive config
      const directive = directives(filePath);

      // Gets the file name regardless of folder depth
      const fileName = getFileName(filePath);

      if (list.includes(fileName)) return;
      else registerDirective(app, fileName, directive);
    });
  }
}

const getDirectives = () =>
  require.context(
    // The relative path of the directives folder
    "@/directives/",
    // Whether to look in folders
    true,
    // The regular expression used to match base directive filenames
    /\w+\.(vue|js)$/,
  );

const getFileName = (filePath) =>
  filePath
    .split("/")
    .pop()
    .replace(/\.\w+$/, "")
    ?.split(".")?.[0];

const registerDirective = (app, fileName, directive) =>
  app.directive(
    fileName,
    // Look for the filter options on `.default`, which will
    // exist if the filter was exported with `export default`,
    // otherwise fall back to module's root.
    directive.default || directive,
  );
