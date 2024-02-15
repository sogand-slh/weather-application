<template>
  <button :class="['base-button', ...baseButtonClassModifier]" :disabled="isDisabled" :type="type">
    <template v-if="isCircular">
      <span class="base-button__label">{{ label }}</span>

      <icon-loader v-if="circularIcon" :name="circularIcon" />
    </template>
    <template v-else>
      <icon-loader class="base-button__icon" :name="prependIcon" v-if="prependIcon" />

      <span class="base-button__label">{{ label }}</span>

      <icon-loader class="base-button__icon" :name="appendIcon" v-if="appendIcon" />
    </template>
  </button>
</template>

<script setup>
  import { useClassModifier } from "@/composables";
  import { computed } from "vue";

  defineOptions({
    name: "base-button",
  });

  const props = defineProps({
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "button",
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    prependIcon: {
      type: String,
      default: "",
    },
    appendIcon: {
      type: String,
      default: "",
    },
    variant: {
      type: String,
      default: "filled",
      validator: (value) => ["filled", "outlined", "text"].includes(value.toLowerCase()),
    },
    size: {
      type: String,
      default: "medium",
      validator: (value) => ["medium", "large"].includes(value.toLowerCase()),
    },
    circularIcon: {
      type: String,
      default: "",
    },
    isCircular: {
      type: Boolean,
      default: false,
    },
  });

  const baseButtonClassConditionMapper = computed(() => [
    {
      condition: props.isDisabled,
      modifier: "--is-disabled",
    },
    {
      condition: props.variant,
      modifier: `--${props.variant.toLowerCase()}`,
    },
    {
      condition: props.size,
      modifier: `--${props.size}`,
    },
    {
      condition: props.isCircular,
      modifier: `--circular`,
    },
  ]);

  const baseButtonClassModifier = useClassModifier("base-button", baseButtonClassConditionMapper);
</script>

<style lang="scss" scoped>
  $root: "base-button";

  .#{$root} {
    cursor: pointer;
    padding: 0 space(4);
    border-radius: shaper(4);
    transition: $transition-3;
    @include flex($align: center, $justify: center);

    &__icon {
      @include dimension(3rem, 3rem);
    }

    &__label {
      @include typography("button2");
    }
    &--filled {
      background-color: var(--theme-palette-primary, #646cffaa);
      color: var(--theme-palette-on-primary);

      @include overlayer(
        state-2,
        (
          hover: true,
        )
      );
      @include overlayer(
        state-3,
        (
          active: true,
        )
      );
    }

    &--outlined {
      background-color: var(--theme-palette-surface);
      border: 3px solid var(--theme-palette-primary);
      color: var(--theme-palette-primary);
      transition: $transition-3;
      @include overlayer(
        state-0,
        (
          hover: true,
        )
      );
      @include overlayer(
        state-1,
        (
          active: true,
        )
      );
    }

    &--text {
      background-color: transparent;
      color: var(--theme-palette-primary);

      @include overlayer(
        state-0,
        (
          hover: true,
        )
      );
      @include overlayer(
        state-1,
        (
          active: true,
        )
      );
    }

    &--is-disabled {
      color: var(--theme-palette-on-disabled);
      cursor: not-allowed;

      &.#{$root}--filled {
        background-color: var(--theme-palette-state-3);
      }

      &.#{$root}--outlined {
        background-color: var(--theme-palette-surface);
        border: 3px solid var(--theme-palette-on-disabled);
      }

      &.#{$root}--text {
        background-color: transparent;
      }
    }

    &--medium {
      @include dimension(100%, 4.8rem);
    }

    &--large {
      @include dimension(100%, 5.2rem);
    }

    &--circular {
      @include dimension($width: 4rem, $height: 4rem);
      @include flex($align: center, $justify: center);
      padding: space(2);
      gap: 1rem;
      border-radius: shaper($is-circle: true);
    }
  }
</style>

