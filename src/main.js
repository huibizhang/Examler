import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from "./route";
import VueSmoothScroll from 'vue3-smooth-scroll'

createApp(App)
  .use(router)
  .use(VueSmoothScroll, {
    duration: 500,       // animation duration in ms
    offset: 0,           // offset in px from scroll element, can be positive or negative
    container: '#lister',       // selector string or Element for scroll container, default is window
    updateHistory: true, // whether to push hash to history
    easingFunction: null // gives the ability to provide a custom easing function `t => ...`
                         // (see https://gist.github.com/gre/1650294 for examples)
                         // if nothing is given, it will defaults to `easeInOutCubic`
  })
  .mount('#app')
