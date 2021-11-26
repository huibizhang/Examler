<template>
  <div class="flex flex-col w-full h-screen">
    <Header :title="title" @rightIconClicked="mode==='exam-finished'? (window.location.reload()): (examFinished())" :rightButtonText="mode==='exam-finished'?'重做':'交卷'">
      <svg v-if="mode!=='exam-finished'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>

      <svg v-if="mode==='exam-finished'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    </Header>

    <div class="w-full flex-1 overflow-hidden">
      <!-- {{ datas }} -->
      <div id="lister" class="w-full h-full overflow-y-scroll p-2 bg-gray-200 space-y-2" style="overscroll-behavior:contain;">
        <div v-if="mode==='exam-finished'" class="w-full mt-3 mb-3 text-center max-w-lg inset-0 mx-auto" ref="score">
          <div class="bg-white inline-block p-3 rounded-lg text-center space-y-2 font-bold inset-0 mx-auto shadow-lg">
            <div>作答分數</div>
            <div
              class="text-5xl"
              :class="[
                (score>=80) && 'text-green-600',
                (score>=60 && score<80 ) && 'text-yellow-600',
                (score<60) && 'text-[red]',
              ]"
            >
              {{score}} 分
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
           :key="q.no"
           v-bind="q"
           :optionSign="'1'"
           :examSerial="i+1"
           :mode="mode"
           @userAnswered="recordAnswer(i,$event)"
           :onShowMistake="onShowMistake"
        ></Question>  

        <div class="w-full py-5">
          <div
            v-if="mode!=='exam-finished'"
            class="w-44 p-3 bg-blue-700 hover:bg-blue-500 flex gap-5 justify-center items-center text-white font-bold rounded-lg inset-0 mx-auto transition-all cursor-pointer text-lg"
            @click="examFinished()"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            交卷
          </div>

          <div
            v-if="mode==='exam-finished'"
            class="w-44 p-3 bg-blue-700 hover:bg-blue-500 flex gap-5 justify-center items-center text-white font-bold rounded-lg inset-0 mx-auto transition-all cursor-pointer text-lg"
            @click="$router.go()"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            重新測驗
          </div>
        </div>
      </div>
      <LoadingScreen :open="open">試卷準備中 ... </LoadingScreen>
    </div> 
    <Notification :open="notify" :hint="'還有題目沒有填答，請檢查！'" @closing="notify=false" />
  </div>
</template>

<script>
import axios from 'axios'

import Header from "../components/Header.vue";
import LoadingScreen from "../components/LoadingScreen.vue";
import Question from "../components/Question.vue";
import Notification from "../components/Notification.vue";

export default {
  name: "Exam",
  data() {
    return {
      title: "",
      subject: "",
      datas: "",
      open: true,
      notify: false,
      mode: "exam",
      answerList: [],
      total: 0,
      count: 0,
      score: 0,
      onShowMistake: false,
      expId: "",
      range: [],
    }
  },
  mounted() {
    this.init()

    document.title = `${this.title} | 做題目 - 考試了 Examler`

    for(let i=0;i<this.count;i++){
      this.answerList.push('')
    }

    const _me = this
    axios({
      method: 'post',
      url: 'https://huibizhang.com/examler/api/getter2.php',
      data: {
        subject: _me.subject,
        mode: 'exam',
        range: _me.range.join(','),
        total: _me.total, 
        count: _me.count, 
      },
    })
    .then(function (response) {
      
      const datas = response.data
      
      datas.results.forEach(r => {
        r["qid"] = r.id
        delete r.id
      })

      _me.datas = datas
      _me.open = false
    });
  },
  methods: {
    init () {
      const examinationPapers = JSON.parse(window.localStorage.getItem('examinationPapers'))
      var currentExpId = window.localStorage.getItem('currentExpId')

      if(!currentExpId && !this.$route.query.expId) {
        this.$router.push("/")
        return
      }

      if(examinationPapers && examinationPapers.length>0) {

        if(this.$route.query.expId!==undefined){
          currentExpId = this.$route.query.expId
        }

        const examinationPaper = examinationPapers.filter(exp => {
          return exp.expId === currentExpId
        })

        if(examinationPaper.length===0){
          const exp = {
            expId: this.$route.query.expId,
            title: this.$route.query.title,
            subject: this.$route.query.subject,
            range: this.$route.query.range.split(','),
            total: this.$route.query.total,
            count: this.$route.query.count,
          }
          console.log(examinationPapers)

          examinationPaper.push(exp)
          examinationPapers.push(exp)

          window.localStorage.setItem('examinationPapers',JSON.stringify(examinationPapers))
          window.localStorage.setItem('currentExpId',exp.expId)
        }

        this.title = examinationPaper[0].title
        this.subject = examinationPaper[0].subject
        this.total = examinationPaper[0].total
        this.count = examinationPaper[0].count
        this.expId = examinationPaper[0].expId
        this.range = examinationPaper[0].range
      } else {
        if(this.$route.query.expId!==''){
          currentExpId = this.$route.query.expId
        }

        const exp = {
          expId: this.$route.query.expId,
          title: this.$route.query.title,
          subject: this.$route.query.subject,
          range: this.$route.query.range.split(','),
          total: this.$route.query.total,
          count: this.$route.query.count,
        }
        console.log(exp)

        window.localStorage.setItem('examinationPapers',JSON.stringify([exp]))
        window.localStorage.setItem('currentExpId',exp.expId)

        this.title = exp.title
        this.subject = exp.subject
        this.total = exp.total
        this.count = exp.count
        this.expId = exp.expId
        this.range = exp.range
      }

    },
    examFinished () {
      if(this.answerList.some(e => e === '')){
        this.notify = true

        const index = this.answerList.findIndex(e => e==='')
        const el = document.getElementById(`no${this.datas.results[index].no}`)
        el.scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        })
        return;
      }

      this.mode = 'exam-finished'

      var correctCount = 0;
      this.answerList.forEach((a,i) => {
        if(this.datas.results[i].ans===a){
          correctCount++
        }
      })

      this.score = Math.round(100*correctCount/this.count)

      var histories = JSON.parse(window.localStorage.getItem('histories'))
      var _new = false

      const qList = this.datas.results.map(q => {
        return q.qid
      })

      const questionRecord = {
        score: this.score,
        subject: this.subject,
        answerList: this.answerList,
        questionList: qList,
        timestamp: new Date().getTime(),
      }

      if(histories){
        if(histories[this.expId]) {
          
          histories[this.expId].push(questionRecord)

        } else {
          _new = true
        }
      } else {
        _new = true
      }

      if(_new) {
        histories = {}
        histories[this.expId] = [questionRecord]
      }

      window.localStorage.setItem('histories',JSON.stringify(histories))

      document.getElementById("lister").scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    },
    recordAnswer (index, e) {
      this.answerList[index] = e
    }
  },
  components: {
    Header,
    LoadingScreen,
    Question,
    Notification,
  },
};
</script>
