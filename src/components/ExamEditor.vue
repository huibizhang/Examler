<template>
  <div
    class="w-full h-full flex justify-center items-center absolute top-0 transition-all duration-500 p-3"
    :class="[
      opened? 'opacity-100 backdrop-blur-sm': 'opacity-0 pointer-events-none'
    ]"
  >
    <div
      class="absolute w-full h-full bg-black/50"
      @click="closing()"
    ></div>

    <div
      class="w-full md:max-w-md min-h-[50%] max-h-full bg-white dark:bg-gray-700 dark:text-gray-200 z-10 shadow-lg rounded-xl font-bold flex flex-col transition-all"
    >
      <div class="w-full h-12 border-b flex-none relative flex items-center">
        <div class="w-full h-full flex justify-center items-center text-lg">
          編輯試卷
        </div>
        <div
          class="absolute right-0 mr-1 w-10 h-10 flex justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-gray-500 dark:text-gray-400"
          @click="closing()"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>

      <div class="flex-1 overflow-y-scroll space-y-3 py-2 px-5 w-full">
        <div class="pt-3 space-y-1">
          <div class="relative -top-full text-gray-500 dark:text-gray-400 transition-all">試卷名稱</div>
          <input
            class="w-full h-8 border-b-2 dark:text-gray-200 dark:bg-gray-700 focus:border-blue-600 dark:focus:border-blue-500 outline-none transition-all text-lg"
            v-model="title"
          />
        </div>

        <div class="pt-3 space-y-1 w-full">
          <div class="text-gray-500 dark:text-gray-400 transition-all">題數</div>
          <div class="flex w-full justify-center items-center gap-2 px-3">
            <button
              class="text-3xl w-10 h-10 flex-none bg-blue-400 dark:bg-blue-500 text-white dark:text-gray-300 rounded-full font-bold"
              @click="(count>5) && (count--)"
            >
              -
            </button>
            <input
              class="text-center p-2 border-2 w-32 dark:bg-gray-700 dark:border-gray-500 dark:focus:border-blue-500 focus:border-blue-600 outline-none transition-all text-lg"
              v-model.number="count"
              type="number"
              min="5"
            />
            <button
              class="text-3xl w-10 h-10 flex-none bg-blue-400 dark:bg-blue-500 text-white dark:text-gray-300 rounded-full font-bold"
              @click="count++"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div class="flex-none border-t flex p-2 gap-2 justify-between">
        <button
          class="px-5 py-3 bg-red-600 hover:bg-red-500 dark:text-gray-200 dark:bg-red-700 dark:hover:bg-red-600 text-white font-bold rounded-lg disabled:bg-gray-500 transition-all"
          @click="del()"
        >
          刪除試卷
        </button>

        <button
          class="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white dark:text-gray-200 dark:bg-blue-700 dark:hover:bg-blue-600 font-bold rounded-lg disabled:bg-gray-500 transition-all"
          :disabled="title===''||count<5"
          @click="save()"
        >
          儲存
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:["open","expId","title","count"],
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
    },
  },
  methods: {
    closing() {
      this.opened = false
      this.$emit("closing")
    },
    save () {
      const examinationPapers = JSON.parse(window.localStorage.getItem('examinationPapers'))

      if(examinationPapers && examinationPapers.length>0) {
        examinationPapers.forEach(e => {
          if(e.expId===this.expId){
            e.title = this.title
            e.count = this.count
          }
        });

        window.localStorage.setItem('examinationPapers',JSON.stringify(examinationPapers))
        window.location.reload()
      }
    },
    del () {
      const examinationPapers = JSON.parse(window.localStorage.getItem('examinationPapers'))

      if(examinationPapers && examinationPapers.length>0) {
        const renew = examinationPapers.filter(e => {
          return e.expId!==this.expId
        })

        window.localStorage.setItem('examinationPapers',JSON.stringify(renew))
        window.location.reload()
      }
    }
  }
}
</script>