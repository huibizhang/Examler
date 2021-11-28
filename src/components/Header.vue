<template>
  <Drawer :open="opened" @closing="drawerClosing()" />

  <div class="w-full h-14 bg-blue-800 flex-none">
    <div class="w-full h-full flex text-2xl font-bold text-white dark:text-gray-300 transition-all justify-center items-center">{{ title }}</div>
    <div class="absolute top-0 w-full flex justify-between items-center p-2">
      <div
        class="w-10 h-10 md:w-24 md:gap-2 md:rounded-lg flex justify-center items-center text-white dark:text-gray-300 hover:bg-white/20 rounded-full"
        @click="opened=true"
      >
        <!-- <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg> -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
        <span class="hidden md:block">
          選單
        </span>
      </div>
      
      <div
        class="w-10 h-10 md:w-24 md:gap-2 md:rounded-lg flex justify-center items-center text-white dark:text-gray-300 transition-all hover:bg-white/20 rounded-full"
        @click="$emit('rightIconClicked')"
      >
        <slot></slot>
        <span class="hidden md:block">
          {{rightButtonText}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Drawer from "./Drawer.vue"

export default {
  props: [
    "title",
    "rightButtonText",
    "doSystemPreferDetect",
  ],
  data() {
    return {
      opened: false,
      followSystemSwitchDarkMode: true,
    }
  },
  mounted() {
    const setting = JSON.parse(window.localStorage.getItem("setting"))
    if(!setting){
      window.localStorage.setItem(
        "setting",
        JSON.stringify({
          followSystemSwitchDarkMode: true,
        })
      )
    }

    this.systemPreferDetecting()
  },
  methods: {
    drawerClosing() {
      this.opened = false
    },
    systemPreferDetecting() {
      const setting = JSON.parse(window.localStorage.getItem("setting"))

      if(setting){
        this.followSystemSwitchDarkMode = setting['followSystemSwitchDarkMode']
        console.log(this.followSystemSwitchDarkMode)
      } else {
        this.followSystemSwitchDarkMode = true
      }

      const matchMedia =  window.matchMedia('(prefers-color-scheme: dark)')
      
      console.log(matchMedia, matchMedia.matches)

      if(matchMedia.matches){
        document.body.classList.add("dark")
      } else {
        document.body.classList.remove("dark")
      }
      
      if(this.followSystemSwitchDarkMode) {
        setTimeout(()=>this.systemPreferDetecting(),800)
      } else {
        document.body.classList.remove("dark")
      }
    }
  },
  watch: {
    doSystemPreferDetect(newVal, oldVal) {
      if(newVal) {
        console.log("recieved")
        this.systemPreferDetecting()
      }
    }
  },
  components: {
    Drawer
  },
}
</script>