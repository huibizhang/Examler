<template>
  <div class="flex flex-col w-screen h-screen">
    <Header :title="'歷史紀錄'"></Header>
    
    <div class="flex-1 w-full bg-gray-100">
      <div class="w-full h-full overflow-y-scroll space-y-3 p-3">
        <div v-if="!datas || !datas.results" class="text-lg w-full h-full flex flex-col justify-center items-center space-y-5">
          <span class="text-gray-500">你還沒做過這張考卷</span>

          <button
            class="px-5 py-3 bg-green-500 text-white font-bold rounded-lg"
            @click="this.$router.push('/exam/')"
          >做測驗</button>
        </div>
        <HistoryCard v-for="bank in datas.results" :key="bank.timestamp" v-bind="bank" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import HistoryCard from "../components/HistoryCard.vue";

export default {
  name: "History",
  data() {
    return {
      datas: ""
    }
  },
  mounted() {
    const currentExpId = window.localStorage.getItem('currentExpId')

    if(!currentExpId) {
      this.$router.push("/")
      return
    }

    var histories = JSON.parse(window.localStorage.getItem('histories'))

    if(histories){
      if(histories[currentExpId]) {
        this.datas = {
          results: histories[currentExpId]
        }
      }
    }
  },
  methods: {
  },
  components: {
    Header,
    HistoryCard,
  },
};
</script>