<template>
  <base-card>
    <div class="search">
      <search-input title="search" />

      hi
    </div>
    <div class="city-information">
      <image-loader name="logo" />
      <span>{{ temperature }}</span>
      <span>{{ temperature }}</span>
    </div>
    <div class="divider"></div>
    <div>location</div>
    <div>date</div>
  </base-card>
</template>

<script setup>
defineOptions({
  name: "dashboard-view",
});
</script>

<style lang="scss" scoped></style>
