<template>
  <div class="theme-toggler">
    <div
      v-for="theme in themes"
      :key="theme.name"
      :class="{
        'theme-toggler__option': true,
        'theme-toggler__option--active': theme.name === currentTheme,
      }"
      @click="updateAppTheme(theme.name)"
    >
      <icon-loader :name="iconNameDefiner(theme)" />
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, inject } from "vue";

defineOptions({
  name: "theme-toggler",
});

const themeManager = inject("$theme");

const themes = reactive([
  {
    name: "light",
    icon: "sun",
  },
  {
    name: "dark",
    icon: "moon",
  },
]);

const currentTheme = computed(() => themeManager.theme.value);

const updateAppTheme = (newTheme) => {
  themeManager.theme = newTheme;
};

const iconNameDefiner = (theme) => {
  return theme.name === currentTheme.value
    ? `${theme.icon}-active`
    : theme.icon;
};
</script>

<style scoped lang="scss">
.theme-toggler {
  @include flex($align: center, $justify: space-between);
  gap: space(2.5);
  padding: space(2.5);
  background-color: var(--theme-palette-surface);
  transition: $transition-3;
  border-radius: shaper(20);
  @include dimension(9.5rem);

  &__option {
    @include dimension(3rem, 3rem);
    padding: space(1);
    cursor: pointer;

    &--active {
      background-color: var(--theme-palette-state-3);
      border-radius: shaper($is-circle: true);
    }
  }
}
</style>
