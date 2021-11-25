<template>
  <div class="flex flex-col w-full h-screen">
    <Header :title="'回顧'" />

    <div class="w-full flex-1 overflow-hidden">
      <!-- {{ datas }} -->
      <div class="w-full h-full overflow-y-scroll p-2 bg-gray-200 space-y-2" style="overscroll-behavior:contain;">
        <Question
           v-for="q in datas.results"
           :key="q.no"
           v-bind="q"
           :optionSign="'1'"
           :mode="'review'"
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
      open: true,
      history: {},
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