import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import store from './stores/store';

const app = createApp(App)

app.use(ToastPlugin);
app.use(router)

app.mount('#app')

app.use(store)