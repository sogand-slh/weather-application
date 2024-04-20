<template>
  <div class="icon">
    <img :src="icon" class="icon__svg" />
  </div>
</template>

<script setup>
import { computed } from "vue";

defineOptions({
  name: "weather-icon-loader",
});

const props = defineProps({
  weatherCode: {
    type: String,
    required: true,
  },
});

const icon = computed(
  () => `http://openweathermap.org/img/wn/${props.weatherCode}.png`
);
</script>

<style lang="scss" scoped>
.icon {
  &__svg {
    @include dimension(5rem, 5rem);
  }
}
</style>
