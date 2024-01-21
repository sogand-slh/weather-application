const clickOutside = {
  beforeMount(element, binding) {
    const handleClickOutside = (event) => {
      if (!(element === event.target || element.contains(event.target))) {
        binding.value();
      }
    };

    document.addEventListener("click", handleClickOutside);

    element.__vueClickOutside__ = handleClickOutside;
  },
  beforeUnmount(element) {
    document.removeEventListener("click", element.__vueClickOutside__);
    delete element.__vueClickOutside__;
  },
};

export default clickOutside;
