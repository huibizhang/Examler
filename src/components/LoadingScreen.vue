<template>
  <div
    class="w-full h-full flex justify-center items-center relative -top-full transition-all duration-500"
    :class="[
      opened? 'opacity-100 backdrop-blur-sm': 'opacity-0 pointer-events-none'

    ]"
  >
    <div
      class="absolute w-full h-full bg-black/50"
    ></div>

    <div
      class="w-60 h-60 bg-white z-10 shadow-lg rounded-xl font-bold flex flex-col justify-center items-center gap-7"
    >
      <slot>題目努力讀取中 ...</slot>
      <svg class="animate-spin h-10 w-10 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props:["open"],
  data() {
    return {
      opened: false,
    }
  },
  mounted() {
    this.opened = this.open
  },
  watch: {
    open(newVal, oldVal) {
      this.opened = newVal
    }
  },
  methods: {
    closing() {
      this.opened = false
      this.$emit("closing")
    }
  }
}
</script>