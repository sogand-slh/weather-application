import crypto from "@/modules/crypto";

/**
 * Retrieves and decrypts a value from session storage by its name.
 * @param {string} nameSpace - The name of the item in session storage.
 * @returns {*} Returns the decrypted value from session storage.
 */
export const getSessionStorageItem = (nameSpace) => {
  const cipherItemValue = sessionStorage.getItem(nameSpace);
  return crypto.decrypt(cipherItemValue);
};

/**
 * Encrypts and sets a value in session storage by its name.
 * @param {string} nameSpace - The name of the item in session storage.
 * @param {*} value - The value to be stored in session storage.
 */
export const setSessionStorageItem = (nameSpace, value) => {
  const cipherItemValue = crypto.encrypt(value);
  sessionStorage.setItem(nameSpace, cipherItemValue);
};

/**
 * Removes an item from session storage by its name.
 * @param {string} nameSpace - The name of the item to be removed from session storage.
 */
export const removeSessionStorageItem = (nameSpace) => {
  sessionStorage.removeItem(nameSpace);
};

/**
 * Object containing functions for session storage operations.
 * @property {Function} get - Function to retrieve and decrypt a value from session storage.
 * @property {Function} set - Function to encrypt and set a value in session storage.
 * @property {Function} remove - Function to remove an item from session storage.
 */
export default {
  get: getSessionStorageItem,
  set: setSessionStorageItem,
  remove: removeSessionStorageItem,
};
