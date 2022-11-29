<template>
  <h1 ref="header">App Counter</h1>
  <input v-model = "inputText"/>
<h2>{{inputText}}</h2>
  <p v-html='innerHTML'></p>
  <CounterValue class = "counter"                
                v-for="obj in [  {index:1, text: 'Clicked'}]"
                :title="obj.text"
                :value="counter"
                :key="obj.index"
  />

  <button v-on:click="onPlus($event, 1)">more</button>
  <button v-if="canRenderMinusButton > 0" @click="onMinus">less</button>
</template>
<script>

import { onMounted } from 'vue';
import CounterValue from './components/CounterValue.vue';

const LOCAL_KEY_COUNTER = 'counter';

const saveCounter = (value) => localStorage.setItem(LOCAL_KEY_COUNTER, value);
let counterWatcher = null;
export default {
  components: { CounterValue },
  data() {    
      return { [LOCAL_KEY_COUNTER]: 0,};      
  },
  created() {
    console.log('> created', this.counter);
    this.counter = localStorage.getItem(LOCAL_KEY_COUNTER) || 0 ;
    counterWatcher = this.$watch(
      () => this.counter,
      (oldValue, newValue) => {
      console.log('> counter wathced', {oldValue, newValue});
      saveCounter(newValue);
    })
  },
  mounted() {
    console.log('> mounted', this.counter);
  },
  computed: {
    canRenderMinusButton(){
      return this.counter > 0;
    },
  },
  methods: {
    onPlus(event, index){
      this.counter++;
      saveCounter(this.counter);
      console.log('>counter -> onPlus', this.counter,this);
    },
    onMinus(){
      this.counter--;
      if(this.counter === 0)
     { this$refs.header.innerText = `<b>Header</b> ${this.counter}`}
      saveCounter(this.counter);
      console.log('>counter -> onMinus', this.counter);
    },
  },
  // unmounted() {
  //   counterWatcher()
  // }
}

</script>
<style lang="scss" scoped>
.counter {
  color: green;
}

</style>


