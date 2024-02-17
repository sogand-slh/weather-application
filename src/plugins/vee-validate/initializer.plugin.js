import AllRules from "@vee-validate/rules";
import { configure, defineRule } from "vee-validate";
import en from "@vee-validate/i18n/dist/locale/en.json";
import { localize, setLocale } from "@vee-validate/i18n";

const addRulesToVeeValidate = (rules) => {
  Object.entries(rules).forEach(([ruleName, ruleFunction]) => {
    defineRule(ruleName, ruleFunction);
  });
};

export default function veeValidate() {
  addRulesToVeeValidate(AllRules);

  configure({
    validateOnBlur: false,
    validateOnInput: true,
    validateOnChange: false,
    generateMessage: localize({ en }),
  });

  setLocale("en");
}
