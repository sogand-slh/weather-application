<template>
  <div class="image-loader">
    <img class="image-loader__image" :src="computedSource" :alt="alt" />
  </div>
</template>

<script setup>
  import { computed } from "vue";

  defineOptions({
    name: "image-loader",
  });

  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "png",
      validator: (value) => ["png", "jpeg", "jpg", "webp"].includes(value.toLowerCase()),
    },
    alt: {
      type: String,
      default: "",
    },
    externalSource: {
      type: String,
      default: "",
      validator(value) {
        if (!value) return true;
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlRegex.test(value);
      },
    },
  });

  const computedSource = computed(
    () =>
      props.externalSource || new URL(`/src/assets/images/${props.name}.${props.type}`, import.meta.url).href,
  );
</script>

<style lang="scss" scoped>
  .image-loader {
    &__image {
      @include dimension(100%, 100%);
      object-fit: contain;
    }
  }
</style>
