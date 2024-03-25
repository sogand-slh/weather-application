<template>
  <div class="dashboard">
    <div class="dashboard__city city">
      <div class="city__search">
        <search-input title="search" class="city__search" />
      </div>
      <div class="city__information">
        <image-loader name="logo" />
        <span>{{ temperature }}</span>
        <span>{{ temperature }}</span>
      </div>
      <div class="city__divider"></div>
      <div>location</div>
      <div>date</div>
    </div>
    <div class="dashboard__today-highlight">
      <base-card>
        <div class="city__information">
          <span>{{ temperature }}</span>
          <span>{{ temperature }}</span>
        </div>
        <div class="divider"></div>
        <div>location</div>
        <div>date</div>
      </base-card>
      <base-card>
        <div class="city__information">
          <span>{{ temperature }}</span>
          <span>{{ temperature }}</span>
        </div>
        <div class="divider"></div>
        <div>location</div>
        <div>date</div>
      </base-card>
      <base-card>
        <div class="city__information">
          <span>{{ temperature }}</span>
          <span>{{ temperature }}</span>
        </div>
        <div class="divider"></div>
        <div>location</div>
        <div>date</div>
      </base-card>
    </div>
    <base-card class="dashboard__days-forecast"> Hey</base-card>
  </div>
</template>

<script setup>
defineOptions({
  name: "dashboard-view",
});
</script>

<style lang="scss" scoped>
.dashboard {
  @include flex($wrap: wrap);
  @include dimension(100%);
  &__city {
    @include dimension(40%);
    @include flex();
    &__search {
      @include dimension(100%);
    }
  }
  &__today-highlight {
    @include flex();
    @include dimension(60%);
  }
}
</style>
