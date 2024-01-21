<template>
  <div class="toast-manager">
    <transition-group name="toast-bar" tag="div" appear>
      <toast
        class="toast"
        v-for="(toast, index) in toasts"
        :key="toast.id"
        :type="toast.type"
        :message="toast.message"
        :duration="options.duration"
        :style="{ top: `-${index * (toastHeight + margin)}px` }"
        @click:close="removeMessage(id)"
      />
    </transition-group>
  </div>
</template>

<script setup>
import eventBus from "@/modules/event-bus";
import { TOAST_POSITION } from "@/constants/components/toast.constant";
import { onBeforeUnmount, ref } from "vue";
const toastHeight = 50;
const margin = 10;

defineProps({
  options: {
    type: Object,
    required: true,
  },
});

let toasts = ref([]);
let id;

const generateUniqueNumber = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

eventBus.subscribe("toast:generate", (message, type) => {
  id = generateUniqueNumber();
  onMessage({ message, type, id });
});

eventBus.subscribe("toast:clear", () => clear());

eventBus.subscribe("toast:removeMessage", (duration) => {
  console.log("toast remove event");
  removeMessage(duration);
});

const removeMessage = (lifeTime = 5000) => {
  setTimeout(
    () => (toasts.value = toasts.value.filter((item) => item.id != id)),
    lifeTime
  );
};

const onMessage = ({ message = "", type = "error", id }) => {
  let toast = {
    id,
    message,
    type,
  };
  toasts.value.push(toast);
};

const clear = () => {
  toasts.value = [];
};

onBeforeUnmount(() => {
  eventBus.unsubscribe("toast:generate");
  eventBus.unsubscribe("toast:clear");
  eventBus.unsubscribe("toast:removeMessage");
});
</script>

<style lang="scss">
$toast-height: 48;
$toast-margin: 15;
.toast-manager {
  position: fixed;
  bottom: 100px;
  right: 350px;
}
.toast {
  top: -($toast-height + $toast-margin) px;
}
.toast-bar-enter-active {
  transition: all 0.3s ease-out;
}

.toast-bar-leave-active {
  transition: all 0.8s ease-in;
}

.toast-bar-enter-from,
.toast-bar-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
