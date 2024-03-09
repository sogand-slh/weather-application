<template>
  <div :class="['search-input', ...searchInputClassModifier]">
    <icon-loader name="search" class="search-input__icon" @click="expandable" />
    <text-field
      v-if="isExpanded"
      :type="text"
      class="search-input__field"
      placeholder="Search..."
    />
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
    modifier: "--expandable",
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
    @include dimension(35rem, 5rem);
    border-radius: shaper(5);
    transition: $transition-3;
  }
}
</style>
