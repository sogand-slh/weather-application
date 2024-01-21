import { readonly, ref, toValue } from "vue";

const useTimeout = (callback, duration, options = {}) => {
  const { immediate = true } = options;

  const isPending = ref(false);

  let timer = null;

  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function stop() {
    isPending.value = false;
    clear();
  }

  function start(...args) {
    clear();
    isPending.value = true;
    timer = setTimeout(() => {
      isPending.value = false;
      timer = null;

      callback(...args);
    }, toValue(duration));
  }

  if (immediate) {
    isPending.value = true;
    start();
  }

  return {
    isPending: readonly(isPending),
    start,
    stop,
  };
};

export default useTimeout;
