<template>
  <header class="header">
    <div class="header__content-wrapper">
      <div class="header__logo">
        <image-loader name="logo" alt="weather-logo" />
      </div>

      <div class="header__controls controls">
        <div class="controls__temperature">
          <base-badge text="℃" />
          <base-badge text="℉" />
        </div>
        <theme-toggler />
      </div>
    </div>
  </header>
</template>

<script setup>
defineOptions({
  name: "the-header",
});
</script>

<style lang="scss" scoped>
.header {
  @include dimension(100%);
  background-color: var(--theme-palette-surface-high);

  &__content-wrapper {
    @include flex($align: center, $justify: space-between);
    padding: space(2) 0;
    @include dimension(90%);
    margin: 0 auto;
  }
  &__logo {
    @include dimension(8rem);
  }
  &__controls {
    @include flex($align: center, $justify: space-between);
    gap: space(2);
  }
}

.controls {
  &__temperature {
    gap: space(2);
    @include flex($align: center);
  }
}
</style>
