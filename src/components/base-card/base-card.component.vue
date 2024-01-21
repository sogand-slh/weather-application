<template>
  <article class="base-card">
    <header class="base-card__header header">
      <slot name="header">
        <h5 v-if="title" class="header__title">{{ title }}</h5>
      </slot>
    </header>
    <div class="base-card__body body">
      <slot name="default">
        <p v-if="content" class="body__content">{{ content }}</p>
      </slot>
    </div>
    <footer class="base-card__footer footer">
      <slot name="footer">
        <base-button v-if="CTALabel" :label="CTALabel" @click="onCTAClickHandler" />
      </slot>
    </footer>
  </article>
</template>

<script setup>
  const emits = defineEmits(["click:callToAction"]);

  defineOptions({
    name: "base-card",
  });

  defineProps({
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    CTALabel: {
      type: String,
      default: "",
    },
  });

  const onCTAClickHandler = () => {
    emits("click:callToAction");
  };
</script>

<style lang="scss" scoped>
  .base-card {
    border-radius: shaper(8);
    padding: space(8) space(6);
    @include flex($dir: column, $align: center, $justify: space-between);
    gap: space(4);
    min-height: 20rem;
    min-width: 20rem;
    background-color: var(--theme-palette-surface-high);
    color: var(--theme-palette-on-primary-container);
    box-shadow: 4px 6px 10px 0px var(--theme-palette-state-0);
  }
  .header {
    &__title {
      @include typography(h5);
    }
  }
  .body {
    &__content {
      @include typography(body2);
    }
  }
  .footer {
    @include flex($justify: center);
    @include dimension($width: 100%);
  }
</style>
