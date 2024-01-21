export const getLocalStorageItem = (nameSpace) => {
  try {
    const itemStr = localStorage.getItem(nameSpace);
    if (!itemStr) return null;

    return JSON.parse(itemStr);
  } catch {
    return null;
  }
};

export const setLocalStorageItem = (nameSpace, value) => {
  localStorage.setItem(nameSpace, JSON.stringify(value));
};

export const removeLocalStorageItem = (nameSpace) => {
  localStorage.removeItem(nameSpace);
};

export default {
  get: getLocalStorageItem,
  set: setLocalStorageItem,
  remove: removeLocalStorageItem,
};
