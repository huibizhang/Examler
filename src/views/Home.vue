<template>
  <div class="flex flex-col w-screen h-screen">
    <Header :title="'我的試卷庫'"></Header>

    <div class="flex-1 w-full bg-gray-100 dark:bg-gray-900 transition-all relative overflow-hidden">
      <div class="w-full h-full overflow-y-scroll space-y-3 p-3">
        <div v-if="!datas || datas.results.length===0" class="text-lg w-full h-full flex flex-col justify-center items-center space-y-5">
          <span class="text-gray-500 dark:text-gray-400 transition-all">目前還沒有任何試卷</span>

          <button
            class="px-5 py-3 bg-green-500 dark:bg-green-600 text-white dark:text-gray-200 font-bold rounded-lg"
            @click="this.$router.push('/banks/')"
          >前往挑選考科</button>
        </div>
        <ExpCard
          v-for="bank in datas.results"
          :id="bank.expId"
          :key="bank.expId"
          v-bind="bank"
          @editing="edit($event)"
        />
      </div>
      <ExamEditor
        :open="openEditor"
        :title="selectedExam.title"
        :count="selectedExam.count"
        :expId="selectedExam.expId"
        @closing="openEditor=false"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "../components/Header.vue";
import LoadingScreen from "../components/LoadingScreen.vue";
import ExpCard from "../components/ExpCard.vue";
import ExamEditor from "../components/ExamEditor.vue";

export default {
  name: "Home",
  data() {
    return {
      datas: "",
      openEditor: false,
      currentExpId: "",
      selectedExam: {},
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
  methods: {
    edit (e) {
      this.currentExpId = e

      if(!this.datas.results || !this.currentExpId) {
        return
      }

      this.selectedExam =  this.datas.results.filter(r => {
        return r.expId === this.currentExpId
      })[0]

      this.openEditor = true
    },
  },
  components: {
    Header,
    ExpCard,
    ExamEditor,
  },
};
</script>