<template>
  <div class="flex flex-col w-screen h-screen">
    <Header :title="'瀏覽所有考科'"></Header>

    <div class="flex-1 w-full bg-gray-100 dark:bg-gray-900 relative overflow-hidden">
      <div class="w-full h-full overflow-y-scroll space-y-3 p-3">
        <BankCard
          v-for="bank in datas.results"
          :key="bank.subject"
          v-bind="bank"
          @selected="selectSubject(bank.subject)"
        />
      </div>
      <ExamGenerator :open="openGenerator" v-bind="selectedSubjectData" @closing="openGenerator=false" />

      <LoadingScreen :open="open">
        考科讀取中 ... 
      </LoadingScreen>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "../components/Header.vue";
import LoadingScreen from "../components/LoadingScreen.vue";
import BankCard from "../components/BankCard.vue";
import ExamGenerator from "../components/ExamGenerator.vue";

export default {
  name: "Banks",
  data() {
    return {
      datas: "",
      open: true,
      openGenerator: false,
      selectedSubjectData: {},
    }
  },
  mounted () {

    const _me = this
    axios({
      method: 'get',
      url: 'https://huibizhang.com/examler/api/get_banks.php',
    })
    .then(function (response) {
      _me.datas = response.data
      _me.open = false
    });
  },
  methods: {
    selectSubject (subject) {
      this.selectedSubjectData =  this.datas.results.filter(r => {
        return r.subject === subject
      })[0]
      this.openGenerator = true
    }
  },
  components: {
    Header,
    LoadingScreen,
    BankCard,
    ExamGenerator,
  },
};
</script>