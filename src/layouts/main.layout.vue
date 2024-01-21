<template>
  <div class="layout" id="main-layout">
    <the-header />
    <main class="layout__main main">
      <weather-sidebar />
      <div class="main__container">
        <slot />
      </div>
    </main>
  </div>
</template>
<script setup></script>

<style lang="scss" scoped>
.layout {
  @include flex($dir: column, $justify: center);
  @include dimension($width: 100%, $height: 100vh);

  &__main {
    @include dimension($width: 100%, $height: 100vh);
  }
}
.main {
  &__container {
    @include dimension($width: 87%, $height: 100%);
    margin: 0 auto;
  }
}
</style>
