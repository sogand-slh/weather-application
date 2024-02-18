<template>
  <div :class="['dropdown', ...dropdownClassModifier]">
    <div class="dropdown__toggle" @click="toggleDropDownVisibility">
      <slot name="default">
        <span>{{ placeholder }}</span>
        <icon-loader class="dropdown__icon" v-if="prependIcon" :name="prependIcon" />
      </slot>
    </div>
    <div class="dropdown__divider" v-if="hasDivider"></div>
    <collapsible-container class="dropdown__collapsible" :collapsed="visibility">
      <ul class="dropdown__item-list">
        <li v-for="item in items" :key="item.value" class="dropdown__item item" @click="selectItem(item)">
          <div class="item__content">
            <icon-loader class="item__icon" :name="item.icon" v-if="item.icon" />
            <span class="item__label">{{ item.label }}</span>
          </div>
        </li>
      </ul>
    </collapsible-container>
  </div>
</template>

<script setup>
  import { computed } from "vue";
  import { useClassModifier } from "@/composables";

  const emits = defineEmits(["update:selectedItem"]);

  defineOptions({
    name: "base-dropdown",
  });

  const visibility = defineModel({ type: Boolean, default: false });

  defineProps({
    items: {
      type: Array,
      default: () => [],
      validator: (list) => list.every((item) => "label" in item && "value" in item),
    },
    placeholder: {
      type: String,
      default: "",
    },
    prependIcon: {
      type: String,
      default: "",
    },
    hasDivider: {
      type: Boolean,
      default: true,
    },
  });

  const dropdownClassConditionMapper = computed(() => [
    {
      condition: visibility.value,
      modifier: "--visible",
    },
  ]);

  const dropdownClassModifier = useClassModifier("dropdown", dropdownClassConditionMapper);

  const toggleDropDownVisibility = () => {
    visibility.value = !visibility.value;
  };

  const selectItem = (item) => {
    visibility.value = false;
    emits("update:selectedItem", item);
  };
</script>

<style lang="scss" scoped>
  $root: "dropdown";
  .#{$root} {
    position: relative;

    &__toggle {
      @include flex($align: center, $justify: space-between);
      gap: space(2);
      cursor: pointer;
      transition: 0.3s forwards reverse;
    }

    &__icon {
      transition: 0.3s forwards;
      @include dimension(2rem, 2rem);
    }

    &__item-list {
      background-color: var(--theme-palette-primary-container);
      color: var(--theme-palette-on-primary-container);
      @include typography(body2);
      max-height: 17.5rem;
      overflow-y: scroll;
      @include customScrollBar();
    }

    &__collapsible {
      position: absolute;
      z-index: $drawer;
      @include dimension(100%);
      @include elevation(2);
    }

    &__item {
      @include flex($align: center);
      gap: space(2);
      color: var(--theme-palette-on-primary-container);
      @include dimension($height: 5rem);
      padding: space(3);
      cursor: pointer;

      @include overlayer(
        state-0,
        (
          hover: true,
        )
      );
    }

    &__divider {
      border: 1px solid var(--theme-palette-primary);
      border-radius: shaper(1);
      opacity: 0;
      margin-top: space(0.5);
      transition: opacity 0.3s forwards reverse;
    }

    &--visible {
      .#{$root}__divider {
        opacity: 1;
        transition: opacity 0.3s forwards;
      }

      .#{$root}__icon {
        transform: rotate(180deg);
      }
    }
  }

  .item {
    &__icon {
      @include dimension(2rem, 2rem);
    }

    &__content {
      @include flex($align: center);
      gap: space(3);
    }
  }
</style>
