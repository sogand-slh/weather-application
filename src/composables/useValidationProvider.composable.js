import { useField } from "vee-validate";

/**
 * Custom composable function for integrating validation with vee-validate.
 * @param {Object} options - Options object for configuring the validation provider.
 * @param {*} options.value - The value to be validated.
 * @param {string|Object|Array} options.rules - The validation rules to be applied.
 * @param {string} options.name - The name of the field being validated.
 * @param {string} options.label - The label for the field (used for error messages, etc.).
 * @returns {Object} An object containing validation-related properties.
 * @property {*} validationValue - The validated value or binding returned from vee-validate.
 * @property {string} errorMessage - The error message related to the validation (if any).
 * @property {Object} meta - Additional meta information related to the validation.
 */
const useValidationProvider = ({ value, rules, name, label }) => {
  const fieldOptions = { label, initialValue: value, syncVModel: true };
  const { value: validationValue, errorMessage, meta } = useField(name, rules, fieldOptions);

  return {
    validationValue,
    errorMessage,
    meta,
  };
};

export default useValidationProvider;
