import { createApp } from 'vue';
import { createPinia } from 'pinia';

import AppCounter from './AppCounter.vue';
import router from './router';

// import './assets/main.css';

const app = createApp(AppCounter);

app.use(createPinia());
app.use(router);

app.mount('#app');
