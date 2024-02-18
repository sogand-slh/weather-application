<template>
  <div :class="['toast', ...toastClassModifiers]">
    <div class="toast__content">
      <icon-loader :name="prependIcon" class="toast__icon" />
      <span class="toast__message">{{ message }}</span>
    </div>
    <circular-progress-indicator @click="closeToast" :duration="duration" class="toast__icon" />
  </div>
</template>

<script setup>
  import { TOAST_ICONS, TOAST_TYPES } from "@/constants/components/toast.constant";
  import { computed, onMounted } from "vue";
  import { useTimeout, useClassModifier } from "@/composables";

  defineOptions({
    name: "toast-message",
  });

  const emits = defineEmits(["click:close"]);

  const props = defineProps({
    type: {
      type: String,
      default: "warning",
      validator: (value) => value && TOAST_TYPES.includes(value.toLowerCase()),
    },
    message: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 5000,
    },
  });

  const toastClassConditionMapper = computed(() => [
    {
      condition: !!props.type,
      modifier: `--${props.type.toLowerCase()}`,
    },
  ]);
  const toastClassModifiers = useClassModifier("toast", toastClassConditionMapper);

  const { start, stop } = useTimeout(() => {
    emits("click:close");
  }, props.duration);

  const closeToast = () => {
    stop();
    emits("click:close");
  };

  const prependIcon = computed(() => TOAST_ICONS[props.type]);

  onMounted(start);
</script>

<style lang="scss">
  $root: "toast";
  $toast-types: error warning success;

  .#{$root} {
    @include flex($align: center, $justify: space-between);
    gap: space(3);

    @include dimension(100%);
    max-width: 54rem;
    min-width: 30rem;

    border-radius: shaper(4);
    padding: space(3);

    transition-duration: 0.15s;
    transition-property: all;
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);

    &__content {
      gap: space(3);
      @include flex($align: center, $justify: space-between);
    }
    &__message {
      flex: 90%;
    }
  }
  @each $type in $toast-types {
    .#{$root}--#{$type} {
      color: var(--theme-palette-on-#{$type});
      background-color: var(--theme-palette-#{$type});

      .#{$root}__icon {
        @include dimension(3rem, 3rem);
        color: var(--theme-palette-on-#{$type});
        --circular-progress-color: var(--theme-palette-on-#{$type});
      }
    }
  }
</style>
