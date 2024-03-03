<template>
  <div class="search-input">
    <icon-loader name="search" />
    Search
  </div>
</template>

<script setup>
defineOptions({
  name: "search-input",
});

defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.search-input {
  @include dimension(100%, 100%);
  border-radius: shaper($is-circle: true);
  background-color: var(--theme-palette-primary);
}
</style>
