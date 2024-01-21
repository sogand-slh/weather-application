<template>
  <div class="playground">
    <h1 class="playground__title">THIS IS PLAYGROUND!</h1>
    <section class="playground__component button">
      <h2 class="button__name">Base Button</h2>
      <div class="button__item">
        <base-button
          label="Login"
          variant="outlined"
          prepend-icon="user"
          size="medium"
        />
      </div>
    </section>
    <section class="playground__component">
      <h2 class="playground__component-name">The Header</h2>
      <the-header />
    </section>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.playground {
  @include dimension(100%);
  @include flex($dir: column, $align: center);
  margin: 0 auto;

  &__title {
    @include typography("h1");
    margin-bottom: space(10);
  }

  &__component {
    @include dimension(85%);
    box-sizing: border-box;
    margin: space(5) auto;
    border-bottom: 2px solid var(--theme-palette-placeholder);
    padding: space(5) 0;
  }

  &__component-name {
    @include typography("h6");
    margin-bottom: space(2);
  }

  &__component-item {
    @include flex(row, wrap);
    gap: 5rem;
    margin-bottom: space(2);
  }

  &__component-row {
    gap: space(1);
    @include flex(row, nowrap);
  }
}

.button {
  @include flex(column);

  &__name {
    @include typography("h6");
    margin: 10px auto;
  }

  &__item {
    @include dimension($width: 350px);
    padding: 1rem;
    gap: 1rem;
    @include flex(row, wrap);
  }
}
</style>
