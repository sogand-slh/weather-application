export default function loadConstants(app, constants) {
  if (typeof constants === "boolean" && constants) registerAll(app);
  if (!!constants && constants.constructor === Array) registerList(app, constants);
  if (!!constants && constants.constructor === Object) registerExceptions(app, constants);
  app.provide("globalConstants", app.config.globalProperties.$constant);
}

function registerAll(app) {
  const constants = getConstants();

  if (constants) {
    constants.keys().forEach((filePath) => {
      // Get constant config
      const constant = constants(filePath);

      // Gets the file name regardless of folder depth
      const fileName = getFileName(filePath);
      registerConstant(app, fileName, constant);
    });
  }
}

// eslint-disable
function registerList(app, list) {
  const constants = getConstants();

  if (constants && list?.length) {
    constants.keys().forEach((filePath) => {
      // Get constant config
      const constant = constants(filePath);

      // Gets the file name regardless of folder depth
      const fileName = getFileName(filePath);

      if (list.includes(fileName)) registerConstant(app, fileName, constant);
    });
  }
}

// eslint-disable
function registerExceptions(app, prop) {
  let list = prop?.ignore;
  const constants = getConstants();

  if (constants) {
    constants.keys().forEach((filePath) => {
      // Get constant config
      const constant = constants(filePath);

      // Gets the file name regardless of folder depth
      const fileName = getFileName(filePath);

      if (!list.includes(fileName)) registerConstant(app, fileName, constant);
    });
  }
}

const getConstants = () =>
  require.context(
    // The relative path of the constants folder
    "@/constants/",
    // Whether to look in folders
    true,
    // The regular expression used to match base constant filenames
    /\w+\.js$/,
  );

const getFileName = (filePath) =>
  filePath
    .split("/")
    .pop()
    .replace(/\.\w+$/, "")
    ?.split(".")?.[0];

const registerConstant = (app, fileName, constant) => {
  if (!app.config.globalProperties.$constant) app.config.globalProperties.$constant = {};
  app.config.globalProperties.$constant[fileName] = constant;
};

