import { useI18n } from "vue-i18n";

const useLocaleTranslator = (basePath) => {
  const { t } = useI18n();

  const translator = (path, payload = {}) => {
    return t(`${basePath}.${path}`, payload);
  };

  return {
    translator,
  };
};

export default useLocaleTranslator;
