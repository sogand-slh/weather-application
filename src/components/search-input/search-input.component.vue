<template>
  <div :class="['search-input', ...searchInputClassModifier]">
    <icon-loader name="search" class="search-input__icon" @click="expandable" />
    <transition name="search">
      <text-field
        v-if="isExpanded"
        :type="text"
        class="search-input__field"
        placeholder="Search..."
      />
    </transition>
  </div>
</template>

<script setup>
import { useClassModifier } from "@/composables";
import { computed, ref } from "vue";

defineOptions({
  name: "search-input",
});

defineProps({
  title: {
    type: String,
    default: "",
  },
});

const isExpanded = ref(false);

const searchInputClassConditionMapper = computed(() => [
  {
    condition: isExpanded.value,
    modifier: isExpanded.value ? `--expandable` : `--un-expandable`,
  },
]);

const searchInputClassModifier = useClassModifier(
  "search-input",
  searchInputClassConditionMapper
);
const expandable = () => {
  isExpanded.value = !isExpanded.value;
  console.log("search has been expanded");
};
</script>

<style lang="scss" scoped>
.search-input {
  @include flex($align: center, $justify: center);
  @include dimension(5rem, 5rem);
  gap: space(2);
  padding: space(2);
  border-radius: shaper($is-circle: true);
  background-color: var(--theme-palette-primary);
  --text-field-background-color: var(--theme-palette-primary);
  &__icon {
    @include dimension(4rem, 4rem);
  }
  &--expandable {
    @include dimension(70%, 5rem);
    border-radius: shaper(5);
    transition: $transition-3;
  }
}

.search-expand-enter-active,
.search-expand-leave-active {
  transition: all 0.5s ease;
}

.search-expand-enter,
.search-expand-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
