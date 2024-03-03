<template>
  <base-card>
    <div>
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
