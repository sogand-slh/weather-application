<template>
  <div class="circular-progress">
    <svg class="circular-progress__container" version="1.1" viewBox="0 0 30 30">
      <circle
        class="circular-progress__background"
        r="12"
        cx="15"
        cy="15"
        fill="transparent"
        :stroke-dasharray="circleDashArray"
        :stroke-dashoffset="circleDashOffset"
      />
      <circle
        class="circular-progress__percent"
        r="12"
        cx="15"
        cy="15"
        fill="transparent"
        :stroke-dasharray="circleDashArray"
        :stroke-dashoffset="circleDashOffset"
      />
    </svg>
    <icon-loader :name="icon" class="circular-progress__icon" />
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";

  defineOptions({
    name: "circular-progress-indicator",
  });

  const props = defineProps({
    duration: {
      type: Number,
      default: 5000,
    },
    icon: {
      type: String,
      default: "close",
    },
  });

  const circleDashArray = 76;
  const circleDashOffset = ref(circleDashArray);
  const defaultPercent = ref(0);
  const startTime = ref(null);

  const animateProgress = (timestamp) => {
    if (!startTime.value) startTime.value = timestamp;
    const elapsedTime = timestamp - startTime.value;
    const progress = Math.min(1, elapsedTime / props.duration);

    defaultPercent.value = 100 * (1 - progress);
    circleDashOffset.value = circleDashArray * progress;

    if (progress < 1) {
      requestAnimationFrame(animateProgress);
    }
  };

  onMounted(() => {
    requestAnimationFrame(animateProgress);
  });
</script>

<style scoped lang="scss">
  .circular-progress {
    @include dimension(4rem, 4rem);
    @include flex();
    position: relative;
    border-radius: shaper($is-circle: true);

    &__background {
      transition: v-bind(circleDashOffset) 1s linear;
      stroke: var(--circular-progress-color, var(--theme-palette-on-primary));
      stroke-width: 3px;
      border-radius: shaper($is-circle: true);
    }

    &__icon {
      position: absolute;
    }
    &__container &__percent {
      stroke: (--circular-progress-color, var(--theme-palette-on-primary));
    }
  }
</style>
