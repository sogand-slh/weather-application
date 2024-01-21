<template>
  <div class="badge">
    <span :class="['badge__content', 'content', contentClassModifiers]">
      {{ text }}</span
    >
  </div>
</template>
<script setup>
import { useClassModifier } from "@/composables";
import { computed } from "vue";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    default: "bottom-right",
    validator: (value) =>
      ["top-right", "top-left", "bottom-right", "bottom-left"].includes(value),
  },
  color: {
    type: String,
    default: "primary",
    validator: (color) =>
      [
        "primary",
        "secondary",
        "success",
        "error",
        "warning",
        "neutral",
      ].includes(color),
  },
});

const contentClassConditionMapper = computed(() => [
  {
    condition: props.color,
    modifier: `__${props.color}`,
  },
  {
    condition: props.position,
    modifier: `--${props.position}`,
  },
]);

const contentClassModifiers = useClassModifier(
  "content",
  contentClassConditionMapper
);
</script>
<style lang="scss" scoped>
$color-list: primary, secondary, success, warning, error, neutral;
.badge {
  cursor: pointer;
}
.content {
  @each $color in $color-list {
    &__ {
      color: var(--theme-palette-on-#{$color});
      background-color: var(--theme-palette-primary);
    }
  }
  @include flex(row, nowrap, center, center);
  @include dimension(4.4rem, 4.4rem);
  border-radius: shaper($is-circle: true);
  color: var(--theme-palette-surface);
  background-color: var(--theme-palette-primary);
  border: 2px solid currentColor;
}
</style>
