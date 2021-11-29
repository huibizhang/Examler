<template>
  <div
    class="w-full h-full flex justify-center items-center relative -top-full transition-all duration-500 z-10"
    :class="[
      opened? 'opacity-100': 'opacity-0 pointer-events-none'

    ]"
  >
    <div
      class="absolute w-full h-full bg-black/50 backdrop-blur-sm"
      @click="closing()"
    ></div>

    <div
      class="w-60 bg-white dark:bg-gray-600 dark:text-gray-300 z-10 shadow-lg rounded-xl font-bold text-lg flex flex-col justify-center items-center text-center overflow-hidden"
    >
      <div class="p-4 flex-none flex flex-col gap-2">
        <span>{{title}}</span>
        <span class="text-base font-normal text-gray-600 dark:text-gray-400 transition-all">
          <slot>注意事項</slot>
        </span>
      </div>
      
      <div class="flex-none flex w-full h-12 divide-x border-t">
        <div
          class="flex-1 flex justify-center items-center text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-500 transition-all cursor-pointer"
          @click="closing()"
        >取消</div>

        <div
          class="flex-1 flex justify-center items-center text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-500 transition-all cursor-pointer"
          @click="confirming()"
        >確定</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:["open","title"],
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
    },
    confirming() {
      this.opened = false
      this.$emit("confirming")
    }
  }
}
</script>