<template>
  <div
    class="w-full h-full flex justify-center items-center absolute top-0 transition-all duration-500 p-3"
    :class="[
      opened? 'opacity-100': 'opacity-0 pointer-events-none'

    ]"
  >
    <div
      class="absolute w-full h-full bg-black/50 backdrop-blur-sm"
    ></div>

    <div
      class="w-full md:max-w-md min-h-[50%] max-h-full bg-white z-10 shadow-lg rounded-xl font-bold flex flex-col"
    >
      <div class="w-full h-12 border-b flex-none relative flex items-center">
        <div class="w-full h-full flex justify-center items-center text-lg">
          {{title}}
        </div>
        <div
          class="absolute right-0 mr-1 w-10 h-10 flex justify-center items-center hover:bg-gray-100 rounded-lg text-gray-500"
          @click="closing()"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>

      <div class="flex-1 overflow-y-scroll space-y-3 py-2 px-5">
        <div class="pt-3 space-y-1">
          <div class="relative -top-full text-gray-500">試卷名稱</div>
          <input
            class="w-full h-8 border-b-2 focus:border-blue-600 outline-none transition-all text-lg"
            v-model="expName"
          />
        </div>

        <div class="pt-3 space-y-1">
          <div class="relative -top-full text-gray-500">題數</div>
          <div class="flex w-full justify-center items-center gap-2">
            <button
              class="text-3xl w-10 h-10 flex-none bg-blue-400 text-white rounded-full font-bold"
              @click="(count>5) && (count--)"
            >
              -
            </button>
            <input
              class="text-center p-2 border-2 focus:border-blue-600 outline-none transition-all text-lg appearance-none"
              v-model.number="count"
              type="number"
              min="5"
            />
            <button
              class="text-3xl w-10 h-10 flex-none bg-blue-400 text-white rounded-full font-bold"
              @click="count++"
            >
              +
            </button>
          </div>
        </div>

        <div class="pt-3 space-y-1">
          <div class="relative -top-full text-gray-500">選題範圍</div>
          <div class="border-2">
            <label class="flex items-center border-t first:border-0 p-3" v-for="s in sessions" :key="subject+s.session">
              <div class="text-lg flex items-center gap-3 flex-1">
                <input
                  type="checkbox"
                  :value="s.session"
                  v-model="selectedSessions"
                  class="appearance-none bg-check border-2 box-content checked:bg-green-400 checked:border-green-400 w-6 h-6 rounded-full transition-all"
                >
                第 {{s.session}} 屆
              </div>
              <div class="px-3 text-gray-500">{{s.count}} 題</div>
            </label>
          </div>
        </div>
      </div>

      <div class="flex-none border-t flex p-2 gap-2">
        <div class="px-3 py-2 flex-1 text-lg text-gray-500">
          共 {{totalCount()}} 題
        </div>
        <div class="flex-none">
          <button
            class="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg disabled:bg-gray-500 transition-all"
            :disabled="expName===''||count<5||selectedSessions.length===0"
            @click="generate()"
          >
            建立試卷
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:["open","subject","title","sessions"],
  data() {
    return {
      opened: false,
      expName: "",
      selectedSessions: [],
      count: 10,
    }
  },
  mounted() {
    this.opened = this.open

    this.expName = this.title
  },
  watch: {
    open(newVal, oldVal) {
      this.opened = newVal
    },
    title(newVal, oldVal) {
      this.expName = newVal
    }
  },
  methods: {
    closing() {
      this.opened = false
      this.$emit("closing")
    },
    totalCount () {
      if(!this.sessions) return 0

      return this.sessions.map(s => {
        return this.selectedSessions.includes(s.session)? parseInt(s.count): 0
      }).reduce((a,b) => a+b)
    },
    generate () {

      "?expId=5iKg6-DsaxJV-NJZjZ&title=初階外匯&subject=SF54ASS5F5GGAGDG&range=35,36,37&total=150&count=15"

      const query = [
        `expId=${this.expIdGenerator()}`,
        `title=${this.expName}`,
        `subject=${this.subject}`,
        `range=${this.selectedSessions.join(",")}`,
        `total=${this.totalCount()}`,
        `count=${this.count}`,
      ]

      this.$router.push(`/exam/?${query.join("&")}`)
    },

    expIdGenerator () {
      return `${this.hashGenerator(5)}-${this.hashGenerator(6)}-${this.hashGenerator(5)}`
    },
    hashGenerator (digits) {
      const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
      var result = ""

      for(let i=0;i<digits;i++){
        result += keys.charAt(Math.random()*keys.length)
      }
      return result
    }
  }
}
</script>