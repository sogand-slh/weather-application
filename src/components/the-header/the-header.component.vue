<template>
  <header class="header">
    <div class="header__content-wrapper">
      <div class="header__location">
        <icon-loader name="location" class="header__location--icon" />
        <span>{{ translator("weatherApplication") }}</span>
      </div>

      <div class="header__controls controls">
        <div
          class="controls__temperature"
          v-for="unit in unitTemperature"
          :key="unit.name"
          :class="{
            'theme-toggler__option': true,
            'theme-toggler__option--active': theme.name === currentTheme,
          }"
        >
          <base-badge :text="unit.icon" />
        </div>
        <theme-toggler />
      </div>
    </div>
  </header>
</template>

<script setup>
import { useLocaleTranslator } from "@/composables";
import { inject, reactive, ref } from "vue";

const { translator } = useLocaleTranslator("components.theHeader");

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

  &__location {
    @include flex($align: center, $justify: space-between);
    &--icon {
      @include dimension(3rem, 3rem);
    }
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
