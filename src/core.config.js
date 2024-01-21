import { createCore } from "@/core";

/*
  all properties can be a type of boolean or array or object
  example:
  components: true              register all components
  components: ["toast"]         register a list of component
  components: {
    ignore: ["toast"],
  }                             register all components except ignore list
 */

export default createCore({
  components: {
    ignore: [],
  },
  directives: true,
  plugins: ["axios", "i18n", "themeManager"],
  middlewares: [],
  constants: false,
});
