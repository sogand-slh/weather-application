<template>
  <div class="toast">
    <div :class="`toast__${type}`">
      <div class="toast__content">
        <icon-loader :name="iconMapper" :class="`toast__${type}--icon`" />
        <span>{{ message }}</span>
      </div>
      <div :class="`toast__${type}--close`" @click="closeToast">
        <circular-progress v-if="isPending" :duration="duration" class="circular-progress">
          <template #content>
            <icon-loader name="close" :class="`circular-progress__${type}-close`" />
          </template>
        </circular-progress>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { TOAST_ICONS } from "@/constants/components/toast.constant";
  import { computed } from "vue";
  import { useTimeout } from "@/composables";

  const emits = defineEmits(["click:close"]);

  const props = defineProps({
    type: {
      type: String,
      default: "warning",
      validator: (value) => ["success", "error", "warning"].includes(value),
    },
    message: {
      type: String,
      default: "",
    },
    duration: {
      type: Number,
      default: 5000,
    },
  });

  const { stop, isPending } = useTimeout(() => {
    stop();
    closeToast();
  }, props.duration);

  const closeToast = () => {
    emits("click:close");
  };

  const iconMapper = computed(() => TOAST_ICONS[props.type]);
</script>

<style lang="scss">
  $root: "toast";
  $toast-types: success error warning;
  .#{$root} {
    @include flex($dir: column);
    @include dimension(30rem);
    position: absolute;
    top: 0;
    left: 0;
    z-index: $snackbar;
    min-height: 48px;
    max-width: 54rem;
    min-width: 30rem;

    &__content {
      @include flex();

      gap: space(1);
    }

    @each $type in $toast-types {
      &__#{$type} {
        @include flex($justify: space-between);
        @include typography("body1");
        @include dimension(100%);
        margin: space(2);
        padding: space(3);
        padding-left: space(2);
        color: var(--theme-palette-on-#{$type});
        background-color: var(--theme-palette-#{$type});

        min-height: 48px;

        border-radius: shaper(4);

        transition-duration: 0.15s;
        transition-property: all;
        transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
        position: relative;

        &--icon {
          @include dimension(3rem, 3rem);
          color: var(--theme-palette-on-#{$type});
        }
        &--close {
          @include dimension(3rem, 3rem);
          @include flex();
          color: var(--theme-palette-on-#{$type});
        }
      }
    }
  }
  .circular-progress {
    @each $type in $toast-types {
      &__container {
        circle {
          stroke: var(--theme-palette-#{$type}) !important;
        }
      }
      &__container &__percent {
        stroke: var(--theme-palette-on-#{$type}) !important;
      }
      &__#{$type}-close {
        color: var(--theme-palette-on-#{$type});
        position: absolute;
      }
    }
  }
</style>
