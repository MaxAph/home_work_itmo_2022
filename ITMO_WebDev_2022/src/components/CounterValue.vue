<template>
  <p class="value" :class="{ alert: isAlert }">
    <span style="color: blue">
      {{ title }}
    </span>
    :{{ value }}
  </p>
</template>
<script>
import { computed } from '@vue/reactivity';

export default {
  props: {
    title: '',
    value: 0,
  },

  computed: {
    isAlert() {
      return this.value >= 10;
    },
  },
};
</script>
<style lang="scss" scoped>
.value {
  color: rgb(243, 90, 90);
  font-size: 2rem;
  font-weight: bold;

  &.alert {
    background-color: rgb(230, 85, 85);
  }
  margin-right: 86%;
}
</style>
