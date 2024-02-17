<template>
  <div :class="['text-field', ...textFieldClassModifiers]">
    <div class="text-field__main main">
      <icon-loader v-if="prependIcon" class="main__icon" :name="prependIcon" />
      <div class="main__base base">
        <label v-if="label" class="base__label" :for="name">{{ label }}</label>
        <input
          v-model="model"
          @focus="$emit('focus')"
          @blur="$emit('blur')"
          class="base__element"
          :type="type"
          :disabled="isDisabled"
          :maxlength="maxLength"
          :placeholder="placeholder"
          :id="name"
          autocomplete="off"
        />
      </div>
      <icon-loader
        v-if="properAppendIcon.isAvailable"
        :class="{ 'main__icon--cta': properAppendIcon.action }"
        class="main__icon"
        :name="properAppendIcon.iconName"
        @click="properAppendIcon.action"
      />
    </div>
    <div v-if="captionContent || showCounter" class="text-field__caption caption">
      <div v-if="captionContent" class="caption__content">
        <icon-loader class="caption__icon" name="info" />
        <p>{{ captionContent }}</p>
      </div>
      <div v-if="showCounter" class="caption__counter">{{ counter }}</div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from "vue";
  import ChainOfStrategies from "@/utils/chainOfStrategies";
  import { useClassModifier, useValidationProvider } from "@/composables";

  const { createChainNode } = ChainOfStrategies;

  defineOptions({
    name: "text-field",
  });

  const emits = defineEmits(["click:appendIcon", "focus", "blur"]);

  const props = defineProps({
    variant: {
      type: String,
      default: "filled",
      validator: (value) => ["filled", "outlined"].includes(value.toLowerCase()),
    },
    type: {
      type: String,
      default: "text",
      validator: (value) => ["text", "number", "password"].includes(value),
    },
    label: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    rules: {
      type: [String, Object, Array],
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    prependIcon: {
      type: String,
      default: "",
    },
    appendIcon: {
      type: String,
      default: "",
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    maxLength: {
      type: Number,
    },
    isClearable: {
      type: Boolean,
      default: false,
    },
    hint: {
      type: String,
      default: "",
    },
    showCounter: {
      type: Boolean,
      default: false,
    },
  });

  const model = defineModel({
    type: [String, Number],
    required: true,
  });

  const validationConfig = {
    value: model,
    name: props.name,
    label: props.label,
    rules: props.rules,
  };
  const errorMessage = props.rules ? useValidationProvider(validationConfig)?.errorMessage : "";

  const textFieldClassConditionMapper = computed(() => [
    {
      condition: props.variant,
      modifier: `--${props.variant.toLowerCase()}`,
    },
    {
      condition: props.isDisabled,
      modifier: "--is-disabled",
    },
    {
      condition: !!errorMessage.value,
      modifier: "--has-error",
    },
  ]);

  const properAppendIcon = computed(() => {
    const appendIconStrategy = new ChainOfStrategies(
      [
        createChainNode(props.appendIcon, () => ({
          iconName: props.appendIcon,
          action() {
            emits("click:appendIcon");
          },
          isAvailable: true,
        })),
        createChainNode(props.isClearable, () => ({
          iconName: "close",
          isAvailable: true,
          action() {
            model.value = "";
          },
        })),
        createChainNode(true, () => ({
          isAvailable: false,
        })),
      ],
      "first",
    );
    return appendIconStrategy.execute();
  });

  const textFieldClassModifiers = useClassModifier("text-field", textFieldClassConditionMapper);

  const counter = computed(() => model.value.length + (!!props.maxLength && ` \\ ${props.maxLength}`));

  const captionContent = computed(() => errorMessage.value ?? props.hint);
</script>

<style scoped lang="scss">
  $root: "text-field";
  $base: "base";
  $main: "main";
  $caption: "caption";

  .#{$root} {
    @include dimension(100%);
    &--outlined {
      .#{$main} {
        border: 2px solid var(--theme-palette-primary);
        background-color: var(--theme-palette-primary-container);
      }

      .#{$base} {
        &__label {
          color: var(--theme-palette-primary);
        }

        &__element {
          color: var(--theme-palette-on-surface);
        }
      }
    }

    &--filled {
      .#{$main} {
        border-bottom: 2px solid transparent;
        background-color: var(--theme-palette-primary-container);

        @include overlayer(
          state-0,
          (
            hover: true,
          )
        );

        &:focus-within {
          border-radius: shaper(6) shaper(6) 0 0;
          border-bottom: 2px solid var(--theme-palette-primary);
        }

        .#{$base} {
          &__label {
            color: var(--theme-palette-label);
          }

          &__element {
            color: var(--theme-palette-on-primary-container);
          }
        }
      }
    }

    &--has-error {
      &.#{$root}--filled {
        .#{$main} {
          border-radius: shaper(6) shaper(6) 0 0;
          border-bottom: 2px solid var(--theme-palette-error);
          background-color: var(--theme-palette-error-container);
        }

        .#{$base} {
          &__label {
            color: var(--theme-palette-on-error-container);
          }
        }
      }

      &.#{$root}--outlined {
        .#{$main} {
          border: 2px solid var(--theme-palette-error);
        }

        .#{$base} {
          &__label {
            color: var(--theme-palette-on-error-container);
          }
        }
      }

      .#{$main} {
        &__icon {
          color: var(--theme-palette-error);
        }
      }

      .#{$caption} {
        color: var(--theme-palette-on-error-container);
      }
    }

    &--is-disabled {
      pointer-events: none;
      color: var(--theme-palette-on-disabled);

      .#{$main} {
        &__icon {
          color: var(--theme-palette-on-disabled);
        }
      }

      &.#{$root}--filled {
        .#{$main} {
          background-color: var(--theme-palette-disabled);
          border-bottom: 2px solid transparent;
          border-radius: shaper(6);
        }

        .#{$base} {
          &__label {
            color: var(--theme-palette-on-disabled);
          }

          &__element,
          &__element::placeholder {
            color: var(--theme-palette-on-disabled);
          }
        }
      }

      &.#{$root}--outlined {
        .#{$main} {
          border: 2px solid var(--theme-palette-on-disabled);
        }
        .#{$base} {
          &__label {
            color: var(--theme-palette-on-disabled);
          }

          &__element,
          &__element::placeholder {
            color: var(--theme-palette-on-disabled);
          }
        }
      }
    }
  }

  .#{$main} {
    @include flex($align: center, $justify: flex-start);
    border-radius: shaper(6);
    padding: space(1) space(2) space(0.5) space(2);
    gap: space(3);
    transition: $transition-3;
    min-height: 5.6rem;

    &__icon {
      color: var(--theme-palette-on-primary-container);
      @include dimension(2.7rem, 2.7rem);

      &--cta {
        cursor: pointer;
      }
    }
  }

  .#{$base} {
    @include flex(column);
    @include dimension(100%);

    &__label {
      @include typography("caption");
    }

    &__element {
      @include typography("body2");
      @include dimension(100%);

      &::placeholder {
        color: var(--theme-palette-placeholder);
      }
    }
  }

  .#{$caption} {
    @include flex($align: center, $justify: space-between);
    padding: space(1) space(2);

    &__content {
      @include typography(overline);
      @include flex($align: center);
      gap: space(1);
    }

    &__icon {
      @include dimension(1.6rem, 1.6rem);
    }

    &__counter {
      @include typography(caption);
      margin-left: auto;
    }
  }
</style>
