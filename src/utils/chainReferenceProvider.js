import { isRef, unref } from "vue";

/**
 * Provides the reference value from different data sources.
 * @param {any} source - The data source.
 * @returns {any} The reference value from the data source.
 */
const chainReferenceProvider = (source) => {
  const sourceMapper = [
    {
      condition: isRef(source),
      get: () => unref(source),
    },
    {
      condition: typeof source === "function",
      get: () => source(),
    },
    {
      condition: true,
      get: () => source,
    },
  ];

  const { get: getValue } = sourceMapper.find(({ condition }) => condition);
  return getValue();
};

export default chainReferenceProvider;
