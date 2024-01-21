<template>
  <div class="icon">
    <component :is="icon" class="icon__svg" />
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent } from "vue";

defineOptions({
  name: "icon-loader",
});

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const icon = computed(() => {
  const sanitizedName = props.name
    .trim()
    .replace(/([a-z])([A-Z0-9])/g, "$1-$2")
    .toLowerCase();

  return defineAsyncComponent(
    () => import(`../../assets/icons/${sanitizedName}.icon.vue`)
  );
});
</script>

<style lang="scss" scoped>
.icon {
  &__svg {
    @include dimension(100%, 100%);
  }
}
</style>
