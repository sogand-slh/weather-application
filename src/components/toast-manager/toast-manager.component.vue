<template>
  <div class="toast-manager">
    <transition-group name="toast-message" appear>
      <toast-message
        v-for="toast in toastList"
        :key="toast.id"
        :type="toast.type"
        :message="toast.message"
        :duration="options.duration"
        @click:close="dismissToast(toast.id)"
      />
    </transition-group>
  </div>
</template>

<script setup>
  import eventBus from "@/modules/event-bus";
  import { onBeforeUnmount, ref } from "vue";
  const toastList = ref([]);

  defineProps({
    options: {
      type: Object,
      default: () => ({
        duration: 3000,
      }),
    },
  });

  const generateUniqueId = () => {
    const newId = Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);

    const hasSameId = toastList.value.some((toast) => toast.id === newId);
    if (hasSameId) {
      generateUniqueId();
    }
    return newId;
  };

  eventBus.subscribe("toast:clear", () => clearToastList());

  eventBus.subscribe("toast:generate", (message, type) => {
    const id = generateUniqueId();
    generateToast({ message, id, type });
  });

  const dismissToast = (toastId) => {
    if (!toastId) {
      throw new Error("Toast ID is required for dismissing a toast.");
    }
    toastList.value = toastList.value.filter((item) => item.id != toastId);
  };

  const generateToast = ({ message, id, type = "error" }) => {
    if (!message || !id)
      throw new Error(
        "Invalid toast configuration, A message and an ID are required for generating a toast!",
      );

    toastList.value.push({
      id,
      message,
      type,
    });
  };

  const clearToastList = () => {
    toastList.value = [];
  };

  onBeforeUnmount(() => {
    eventBus.unsubscribe("toast:generate");
    eventBus.unsubscribe("toast:clear");
    eventBus.unsubscribe("toast:dismissToast");
  });
</script>

<style lang="scss" scoped>
  .toast-manager {
    position: fixed;
    z-index: $snackbar;
    bottom: 2%;
    right: 2%;
    @include flex(column);
    gap: space(2);
  }

  .toast-message {
    &-enter-active {
      transition: all 0.3s ease-out;
    }

    &-leave-active {
      transition: all 0.8s ease-in;
    }

    &-enter-from,
    &-leave-to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
</style>
