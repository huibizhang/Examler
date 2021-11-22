<template>
  <Drawer :open="opened" @closing="drawerClosing()" />
  <div class="w-full h-14 bg-blue-800">
    <div class="w-full h-full flex text-2xl font-bold text-white justify-center items-center">{{ title }}</div>
    <div class="absolute top-0 w-full flex justify-between items-center p-2">
      <div
        class="w-10 h-10 flex justify-center items-center text-white hover:bg-white/20 rounded-full"
        @click="opened=true"
      >
        <!-- <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg> -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      
      <div class="w-10 h-10 flex justify-center items-center text-white hover:bg-white/20 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import Drawer from "./Drawer.vue"

export default {
  props: ["title"],
  data() {
    return {
      opened: false
    }
  },
  methods: {
    drawerClosing() {
      this.opened = false
    }
  },
  components: {
    Drawer
  },
}
</script>