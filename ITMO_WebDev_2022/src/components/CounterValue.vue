<template>
  <p class = "value" :class="{alert: isAlert}">
    <span style ="color:blue">
      {{ title }}
    </span>
    :{{ value }}
  </p>
</template>
<script>
import { computed } from '@vue/reactivity';

export default {
  props: {
    title:'',
    value: 0,
  },

  computed: {
  isAlert() {
    return this.value >= 10;
   },
 },
}
</script>
<style lang="scss" scoped>
  .value {
  color:red;
  font-size: 2rem;
  font-weight: bold;
  font-family: Calibri;
  
  &.alert {
    background-color: rgb(132, 197, 132);     
  }
  margin-right: 85%;
}
</style>
