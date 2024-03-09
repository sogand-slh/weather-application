<template>
  <div class="loading" :class="{ 'loading--fulfilled': hasFulfilled }">
    <div class="loading__spinner" />
  </div>
</template>

<script setup>
  defineOptions({
    name: "circular-loading",
  });

  defineProps({
    hasFulfilled: {
      type: Boolean,
      default: false,
    },
  });
</script>

<style lang="scss" scoped>
  $root: "loading";

  .#{$root} {
    @include flex($justify: center, $align: center);
    @include dimension(100%, 100%);
    cursor: wait;

    &__spinner {
      @include dimension(var(--loading-dimension, 30px), var(--loading-dimension, 30px));
      border: 3px solid var(--theme-palette-on-primary);
      border-left: 3px solid var(--theme-palette-primary);
      border-radius: shaper($is-circle: true);
      position: relative;
      animation: spin 1s linear infinite;
      animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.9);
      animation-fill-mode: forwards;
      transition: border 0.2s ease-in-out;

      &::before {
        content: "";
        position: absolute;
        width: 30%;
        height: 60%;
        border-width: 0 2px 2px 0;
        border-color: var(--theme-palette-primary);
        border-style: solid;
        transform: rotate(-45deg) scale(0);
        transition: transform 0.4s cubic-bezier(0.65, 0, 0.45, 1);
        opacity: 0;
      }
    }

    &--fulfilled {
      cursor: default;

      .#{$root}__spinner {
        animation: none;
        border: 3px solid var(--theme-palette-primary);
        &::before {
          transform: rotate(45deg) scale(1) translateY(35%);
          border-left: none;
          opacity: 1;
        }
      }
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
</style>
