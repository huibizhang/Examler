import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from "./route";


createApp(App)
  .use(router)
  .mount('#app')
