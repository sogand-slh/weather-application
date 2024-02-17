<template>
  <header class="header">
    <div class="header__content-wrapper">
      <div class="header__location">
        <icon-loader name="location" class="header__location--icon" />
        <span>{{ city }}</span>
      </div>

      <div class="header__controls controls">
        <text-field
          v-model="selectedCity"
          :placeholder="translator('searchCity')"
          :name="translator('city')"
          :rules="{ required: true }"
          prepend-icon="location"
        />
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
import { useLocaleTranslator } from "@/composables";
import { ref } from "vue";

const { translator } = useLocaleTranslator("components.theHeader");

defineOptions({
  name: "the-header",
});

const city = ref("Tehran");
const selectedCity = ref("Tehran");
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
