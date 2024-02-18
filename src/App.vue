<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<script setup>
import { defineAsyncComponent, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const Layout = defineAsyncComponent(() =>
  import("@/core").then((res) => res.Layout)
);
const i18n = useI18n();

const setLocaleOnDocument = () => {
  document.documentElement.lang = i18n.locale.value;
};
onMounted(() => {
  setLocaleOnDocument();
});
</script>

<style lang="scss" scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
