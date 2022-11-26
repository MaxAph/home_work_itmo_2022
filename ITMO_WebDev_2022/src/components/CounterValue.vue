<template>
  <p class = "counter-value">
    <span style ='color:blue'>
      {{ title }}
    </span>
    :{{ value }}
  </p>
</template>
<script>
export default {
  props: {
    title:'',
    value: 0,
  }
}
</script>
<style scoped>
p.counter-value {
  color:red;
  font-size: 2rem;
  font-weight: bold;
  font-family: Calibri;
}
</style>
