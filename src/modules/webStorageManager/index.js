import sessionStorage from "@/modules/sessionStorage";
import localStorage from "@/modules/localStorage";
import cookie from "@/modules/cookie";
import ChainOfStrategies from "@/utils/chainOfStrategies";
const { createChainNode } = ChainOfStrategies;

const webStorages = {
  sessionStorage,
  localStorage,
  cookie,
};

/**
 * Validates the target storage name.
 * @param {string} targetName - The name of the target storage.
 * @returns {string} Returns the validated and trimmed target storage name.
 * @throws {Error} Throws an error if the target storage name is invalid.
 */
const targetStorageValidator = (targetName) => {
  const sanitizedTargetName = targetName.trim();
  const validTargetList = ["localStorage", "sessionStorage", "cookie"];

  if (!validTargetList.includes(sanitizedTargetName))
    throw new Error(`Invalid target, only ${validTargetList} are valid!`);

  return sanitizedTargetName;
};

/**
 * Retrieves an item from a specific storage.
 * @param {string} target - The target storage name (e.g., 'localStorage', 'sessionStorage', 'cookie').
 * @param {string} nameSpace - The name of the item to retrieve.
 * @returns {*} Returns the retrieved item from the specified storage.
 * @throws {Error} Throws an error if there is an issue retrieving the item.
 */
export const getStorageItem = (target, nameSpace) => {
  try {
    const sanitizedTargetName = targetStorageValidator(target);
    return webStorages[sanitizedTargetName].get(nameSpace);
  } catch (error) {
    throw new Error(`Error in getStorageItem: ${error.message}`);
  }
};

/**
 * Sets an item in a specific storage.
 * @param {Object} payload - Object containing options for setting the storage item.
 * @param {string} payload.target - The target storage name (e.g., 'localStorage', 'sessionStorage', 'cookie').
 * @param {string} payload.nameSpace - The name of the item to set.
 * @param {*} payload.value - The value to be stored in the specified storage.
 * @param {Object} [payload.options] - Additional options for storing the item (optional).
 * @throws {Error} Throws an error if there is an issue setting the item.
 */
export const setStorageItem = ({ target, nameSpace, value, options }) => {
  try {
    const sanitizedTargetName = targetStorageValidator(target);
    const storageSetStrategy = new ChainOfStrategies(
      [
        createChainNode(sanitizedTargetName === "cookie", () => {
          webStorages.cookie.set(nameSpace, value, options);
        }),
        createChainNode(["localStorage", "sessionStorage"].includes(sanitizedTargetName), () => {
          webStorages[sanitizedTargetName].set(nameSpace, value);
        }),
      ],
      "first",
    );
    storageSetStrategy.execute();
  } catch (error) {
    throw new Error(`Error in setStorageItem: ${error.message}`);
  }
};

/**
 * Removes an item from a specific storage.
 * @param {string} target - The target storage name (e.g., 'localStorage', 'sessionStorage', 'cookie').
 * @param {string} nameSpace - The name of the item to remove.
 * @throws {Error} Throws an error if there is an issue removing the item.
 */
export const removeStorageItem = (target, nameSpace) => {
  try {
    const sanitizedTargetName = targetStorageValidator(target);
    return webStorages[sanitizedTargetName].remove(nameSpace);
  } catch (error) {
    throw new Error(`Error in removeStorageItem: ${error.message}`);
  }
};

/**
 * Object containing functions for managing storage items.
 * @property {Function} get - Function to retrieve an item from a specific storage.
 * @property {Function} set - Function to set an item in a specific storage.
 * @property {Function} remove - Function to remove an item from a specific storage.
 */
export default {
  get: getStorageItem,
  set: setStorageItem,
  remove: removeStorageItem,
};
