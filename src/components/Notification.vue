<template>
  <div
    class="fixed w-full z-20 mx-auto flex justify-center pointer-events-none transition-all duration-500"
    :class="[opened? 'top-0 animate-bounce': '-top-full']"
  >
    <div class="mt-6 p-4 bg-red-200 inline-block rounded-lg shadow-lg font-bold text-red-700">
      {{ hint }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['open','hint'],
  data() {
    return {
      opened: false,
    }
  },
  mounted() {
    this.opened = this.open

    if(this.opened){
      setTimeout(this.closing,2000)
    }
  },
  watch: {
    open(newVal, oldVal) {
      this.opened = newVal

      if(newVal){
        setTimeout(this.closing,2000)
      }
    }
  },
  methods: {
    closing() {
      this.opened = false
      this.$emit("closing")
    },
  }
}
</script>