<template>
  <div class="flex flex-col w-full h-screen">
    <Header :title="'進出口外匯'" @rightIconClicked="examFinished()">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    </Header>

    <div class="w-full flex-1 overflow-hidden">
      <!-- {{ datas }} -->
      <div class="w-full h-full overflow-y-scroll p-2 bg-gray-200 space-y-2">
        <Question
           v-for="q,i in datas.results"
           :key="q.no"
           v-bind="q"
           :optionSign="'1'"
           :examSerial="i+1"
           :mode="mode"
           @userAnswered="recordAnswer(i,$event)"
        />

        <div class="w-full py-5">
          <div
            class="w-44 p-3 bg-blue-700 hover:bg-blue-500 flex gap-5 justify-center items-center text-white font-bold rounded-lg inset-0 mx-auto transition-all cursor-pointer text-lg"
            @click="examFinished()"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            交卷
          </div>
        </div>
      </div>
      <LoadingScreen :open="open" />
    </div> 
  </div>
</template>

<script>
import axios from 'axios'

import Header from "../components/Header.vue";
import LoadingScreen from "../components/LoadingScreen.vue";
import Question from "../components/Question.vue";

export default {
  name: "Exam",
  data() {
    return {
      subject: "5GGAGDGSF54ASS5F",
      datas: "",
      open: true,
      mode: "exam",
      answerList: [],
      count: 5,
    }
  },
  mounted() {
    document.title = "進出口外匯 | 做題目 - 考試了 Examler"

    for(let i=0;i<this.count;i++){
      this.answerList.push('')
    }

    const _me = this
    axios({
      method: 'post',
      url: 'https://huibizhang.com/examler/api/getter.php',
      data: {
        subject: _me.subject,
        mode: 'exam',
        total: 240, 
        count: _me.count, 
      },
    })
    .then(function (response) {
      _me.datas = response.data
      _me.open = false
    });
  },
  methods: {
    examFinished () {
      if(this.answerList.some(e => e === '')){
        return;
      }

      this.mode = 'exam-finished'
    },
    recordAnswer (index, e) {
      this.answerList[index] = e
      console.log(e)
    }
  },
  components: {
    Header,
    LoadingScreen,
    Question,
  },
};
</script>