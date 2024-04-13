<template>
  <div class="dashboard">
    <div class="dashboard__city city">
      <search-input title="search" class="city__search" v-model="city" />
      <div class="city__information">
        <image-loader name="logo" />
        <span>{{ temperature }}</span>
        <span>{{ temperatureStatus }}</span>
      </div>
      <base-button @click="getCityInformation('tehran')" label="get" />
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
import { onMounted, ref } from "vue";
import { getCityWeather } from "@/repositories/weather/weather.repository.js";

defineOptions({
  name: "dashboard-view",
});
const city = ref();
const cityInformation = ref();

const getCityInformation = async (city) => {
  cityInformation.value = await getCityWeather(city);
  console.log(
    "🚀 ~ getCityInformation ~ cityInformation:",
    cityInformation.value
  );
};
</script>

<style lang="scss" scoped>
.dashboard {
  @include flex($wrap: wrap);
  @include dimension(100%);
  &__city {
    @include dimension(40%);
    @include flex();
  }
  &__today-highlight {
    @include flex();
    @include dimension(60%);
  }
  &__days-forecast {
    @include flex();
    @include dimension(100%);
  }
}
.city {
  @include flex(column);
  &__search {
    @include flex(row);
    align-self: flex-end;
  }
}
</style>
