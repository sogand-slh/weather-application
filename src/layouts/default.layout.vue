<template>
  <div class="layout" id="default-layout">
    <main class="layout__main main">
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
