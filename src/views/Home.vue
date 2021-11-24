<template>
  <div class="flex flex-col w-screen h-screen">
    <Header :title="'我的試卷庫'"></Header>

    <div class="flex-1 w-full bg-gray-100">
      <div class="w-full h-full overflow-y-scroll space-y-3 p-3">
        <div v-if="!datas || datas.results.length===0" class="text-lg w-full h-full flex flex-col justify-center items-center space-y-5">
          <span class="text-gray-500">目前還沒有任何試卷</span>

          <button
            class="p-3 bg-green-500 text-white font-bold rounded-lg"
            @click="this.$router.push('/exam/?expId=5iKg6-DsaxJV-NJZjZ&title=初階外匯&subject=SF54ASS5F5GGAGDG&range=35,36,37&total=150&count=10')"
          >前往挑選考科</button>
        </div>
        <ExpCard v-for="bank in datas.results" :key="bank.subject" v-bind="bank" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "../components/Header.vue";
import LoadingScreen from "../components/LoadingScreen.vue";
import ExpCard from "../components/ExpCard.vue";

export default {
  name: "Home",
  data() {
    return {
      datas: "",
    }
  },
  mounted () {
    const examinationPapers = JSON.parse(window.localStorage.getItem('examinationPapers'))
    
    if(examinationPapers && examinationPapers.length>0) {

      this.datas = {
        results: examinationPapers
      }

    } else {
      this.datas = {
        results: []
      }
    }

    console.log(this.datas)
  },
  components: {
    Header,
    ExpCard,
  },
};
</script>