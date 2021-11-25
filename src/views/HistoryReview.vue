<template>
  <div class="flex flex-col w-full h-screen">
    <Header :title="'回顧'" />

    <div class="w-full flex-1 overflow-hidden">
      <!-- {{ datas }} -->
      <div class="w-full h-full overflow-y-scroll p-2 bg-gray-200 space-y-2" style="overscroll-behavior:contain;">
        
        <div v-if="mode==='exam-finished'" class="w-full mt-3 mb-3 text-center" ref="score">
          <div class="bg-white inline-block p-3 rounded-lg text-center space-y-2 font-bold inset-0 mx-auto shadow-lg">
            <div>作答分數</div>
            <div
              class="text-5xl"
              :class="[
                (history.score>=80) && 'text-green-600',
                (history.score>=60 && score<80 ) && 'text-yellow-600',
                (history.score<60) && 'text-[red]',
              ]"
            >
              {{history.score}} 分
            </div>
          </div>
          <div class="w-full flex justify-between mt-5">
            <div
              class="flex flex-none bg-white p-2 items-center gap-2 rounded-lg cursor-pointer"
              @click="$router.push('/history/')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
              </svg>
              <span>歷史作答紀錄</span>
            </div>

            <label class="flex flex-none bg-white p-2 items-center gap-2 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                class="appearance-none bg-check border-2 border-gray-200 bg-white checked:bg-blue-600 checked:border-blue-600 block w-5 h-5 rounded-full transition-all"
                v-model="onShowMistake"
              />
              <span>只顯示寫錯題目</span>
            </label>
          </div>
        </div>
        
        <Question
           v-for="q,i in datas.results"
           :examSerial="i+1"
           :key="q.no"
           v-bind="q"
           :optionSign="'1'"
           :mode="mode"
           :inputUserAns="answerList[i]"
           :onShowMistake="onShowMistake"
        />
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
  name: "Review",
  data() {
    return {
      title: "",
      expId: "",
      subject: "",
      datas: "",
      range: [],
      answerList: [],
      open: true,
      history: {},
      mode: "exam-finished",
      onShowMistake: false,
    }
  },
  mounted() {

    const examinationPapers = JSON.parse(window.localStorage.getItem('examinationPapers'))
    const currentExpId = window.localStorage.getItem('currentExpId')

    if(!currentExpId) {
      this.$router.push("/")
      return
    } else {

      this.expId = currentExpId

      if(examinationPapers && examinationPapers.length>0) {
        
        const examinationPaper = examinationPapers.filter(exp => {
          return exp.expId === currentExpId
        })[0]

        this.range = examinationPaper.range
      }
    }

    var histories = JSON.parse(window.localStorage.getItem('histories'))

    if(histories){
      if(histories[currentExpId]) {
        this.history = histories[currentExpId].filter(e => {
          console.log(this.$route.query.history)
          return e.timestamp == this.$route.query.history
        })[0]

        this.answerList = this.history.answerList
      }
    }

    document.title = `回顧 | 看題庫 - 考試了 Examler`

    const _me = this
    axios({
      method: 'post',
      url: 'https://huibizhang.com/examler/api/get_history.php',
      data: {
        subject: _me.history.subject,
        range: _me.range.join(","),
        history: _me.history.questionList.join(",")
      },
    })
    .then(function (response) {
      _me.datas = response.data
      _me.open = false
    });
  },
  methods: {
    init () {
      const examinationPapers = JSON.parse(window.localStorage.getItem('examinationPapers'))
      const currentExpId = window.localStorage.getItem('currentExpId')

      if(!currentExpId) {
        this.$router.push("/")
        return
      }

      if(examinationPapers && examinationPapers.length>0) {
        
        const examinationPaper = examinationPapers.filter(exp => {
          console.log(exp.expId)
          return exp.expId === currentExpId
        })

        this.title = examinationPaper[0].title
        this.subject = examinationPaper[0].subject
        this.expId = examinationPaper[0].expId
        this.range = examinationPaper[0].range
      }
    },
  },
  components: {
    Header,
    LoadingScreen,
    Question,
  },
};
</script>