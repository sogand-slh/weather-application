<template>
  <Transition name="collapsible">
    <div ref="container" class="collapsible" v-if="collapsed">
      <slot />
    </div>
  </Transition>
</template>

<script setup>
  import { computed, ref } from "vue";

  defineOptions({
    name: "collapsible-container",
  });
  defineProps({
    collapsed: {
      type: Boolean,
      default: false,
    },
  });

  const container = ref(null);

  const containerScrollHeight = computed(() => {
    const containerElement = container.value;
    const maxHeight = containerElement?.scrollHeight;
    return maxHeight;
  });
</script>

<style lang="scss" scoped>
  .collapsible {
    overflow: hidden;
    &-enter-active {
      animation: collapse 0.3s forwards reverse;
    }

    &-leave-active {
      animation: collapse 0.3s forwards;
    }
  }
  @keyframes collapse {
    from {
      max-height: calc(v-bind("containerScrollHeight") * 1px);
    }
    to {
      max-height: 0;
    }
  }
</style>
