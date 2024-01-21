import { computed } from "vue";

/**
 * Composable function to generate a list of CSS class modifiers based on conditions.
 * @param {string} rootName - The root name of the CSS class.
 * @param {Ref<Array<{ condition: boolean, modifier: string }>>} conditionMapper - The reactive array containing condition and modifier objects.
 * @returns {ComputedRef<Array<string>>} Returns a computed array of CSS class names based on conditions.
 */
const useClassModifier = (rootName, conditionMapper) => {
  return computed(() => {
    return conditionMapper.value.map((item) => {
      if (item.condition) return rootName + item.modifier;
    });
  });
};

export default useClassModifier;
