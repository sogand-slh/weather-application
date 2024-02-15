<template>
  <div class="circular-progress" id="percent">
    <svg class="circular-progress__container" version="1.1" viewBox="0 0 30 30">
      <circle
        r="12"
        cx="15"
        cy="15"
        fill="transparent"
        :stroke-dasharray="circleDashArray"
        :stroke-dashoffset="circleDashOffset"
      />
      <circle
        class="circular-progress__percent"
        id="bar"
        r="12"
        cx="15"
        cy="15"
        fill="transparent"
        :stroke-dasharray="circleDashArray"
        :stroke-dashoffset="circleDashOffset"
      />
    </svg>
    <slot name="content"></slot>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  const props = defineProps({
    duration: {
      type: Number,
      default: 5000,
    },
  });
  const circleDashArray = 76;
  const circleDashOffset = ref(0);
  const defaultPercent = ref(1);
  const startTime = ref(null);

  const updateProgressLoading = () => {
    let val = parseInt(defaultPercent.value);
    const circle = document.getElementById("bar");

    if (isNaN(val)) {
      val = 100;
    } else {
      const r = circle.getAttribute("r");
      const c = Math.PI * (r * 2);

      if (val < 0) {
        val = 0;
      }
      if (val > 100) {
        val = 100;
      }

      const pct = ((100 - val) / 100) * c;

      circle.style.strokeDashoffset = `${pct}px`;
    }
  };
  const animateProgress = (timestamp) => {
    if (!startTime.value) startTime.value = timestamp;
    const elapsedTime = timestamp - startTime.value;
    const progress = Math.min(1, elapsedTime / props.duration);

    defaultPercent.value = 100 * (1 - progress);
    updateProgressLoading();

    if (progress < 1) {
      requestAnimationFrame(animateProgress);
    }
  };

  onMounted(() => {
    requestAnimationFrame(animateProgress);
    updateProgressLoading();
  });
</script>

<style scoped lang="scss">
  .circular-progress {
    @include dimension(4rem, 4rem);
    @include flex();
    position: relative;
    border-radius: shaper($is-circle: true);
    &__container {
      circle {
        transition: v-bind(circleDashOffset) 1s linear;
        stroke: var(--theme-palette-primary);
        stroke-width: 3px;
        border-radius: shaper($is-circle: true);
      }
    }
    &__container &__percent {
      stroke: var(--theme-palette-on-primary);
    }
  }
</style>
