<template>
  <h1>
    App Counter
  </h1>
   <CounterValue  :key="obj.index" :title="obj.text" :value="counter"  v-for="obj in [
  {index: 1, text: 'Clicked'}]"/>
  <button v-on:click ="onPlus">more</button>
  <button v-if = canRenderMinusButton @click="onMinus">less</button>
</template>
<script>
import CounterValue from '@/components/CounterValue.vue';
export default {
  components: {
    CounterValue
  },
  data() {
    return {
      counter: 0,
    }
  },
  computed: {
    canRenderMinusButton() {
      return this.counter > 0;
    }
  },
  methods: {
    onPlus(){
      this.counter++;
      console.log('> Counter -> onPlus', this.counter);
           },

    onMinus(){
      this.counter--;
      console.log('> Counter -> onMinus', this.counter);
           }
  }
};
</script>
<style scoped>
p.counter-value {
  color:red;
  font-size: 2rem;
  font-weight: bolder;
  font-family: Calibri;
}
</style>
