import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import pinia from "./store";
import core from "./core.config";

const app = createApp(App);

app.use(router);
app.use(core);
app.mount("#app");
