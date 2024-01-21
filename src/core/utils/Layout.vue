<template>
  <div class="layout-container" ref="layoutContainerRef">
    <transition>
      <component :is="layout" :key="layout?.name">
        <slot />
      </component>
    </transition>
  </div>
</template>

<script setup>
  import { useRoute } from "vue-router";
  import { computed, defineAsyncComponent, markRaw, ref, watch } from "vue";

  const route = useRoute();
  const layout = ref("default");
  const layoutContainerRef = ref(null);
  const layoutName = computed(() => route.meta?.layout);

  const defineComponent = (layout) =>
    markRaw(defineAsyncComponent(() => import(`../../layouts/${layout}.layout.vue`)));

  watch(
    layoutName,
    (newLayoutName) => {
      layout.value = defineComponent(newLayoutName || "default");
    },
    { immediate: true },
  );
  watch(
    () => route.name,
    () => {
      layoutContainerRef.value.scroll({ top: 0, left: 0, behavior: "smooth" });
    },
  );
</script>

<style lang="scss" scoped>
  .layout-container {
    @include transition($duration: 0.4);
    @include dimension($height: 100);
    overflow-y: auto;
    @include mq(x-small) {
      background-color: white;
    }
  }
</style>
