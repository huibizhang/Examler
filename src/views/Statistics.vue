<template>
  <div class="flex flex-col w-screen h-screen">
    <Header :title="'錯誤統計中心'"></Header>

    <div class="flex-1 w-full bg-gray-100 dark:bg-gray-900 transition-all relative overflow-hidden">
      <div class="w-full h-full overflow-y-scroll space-y-3 p-3">
        <Question
           v-for="q,i in datas.results"
           :examSerial="i+1"
           :key="q.no"
           v-bind="q"
           :optionSign="'1'"
           :mode="mode"
           :inputUserAns="''"
           :onShowMistake="onShowMistake"
           :type="type"
        />
      </div>
      <LoadingScreen :open="open" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "../components/Header.vue";
import Question from "../components/WrongQuestion.vue";
import LoadingScreen from "../components/LoadingScreen.vue";

export default {
  name: "Statistics",
  data() {
    return {
      datas: "",
      range: [],
      open: true,
      mode: "exam-finished",
      onShowMistake: false,
      type: "",
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
        
        const [ examinationPaper ] = examinationPapers.filter(exp => {
          return exp.expId === currentExpId
        })

        this.range = examinationPaper.range
        this.type = examinationPaper.type
      }
    }

    var histories = JSON.parse(window.localStorage.getItem('histories'))

    if(histories){
      if(histories[currentExpId]) {

        console.log(histories[currentExpId])

        const questions = {}

        histories[currentExpId].forEach((exam)=>{
          exam.questionList.forEach((q,index)=>{
            if(questions[q]){
              questions[q].answerList.push(exam.answerList[index])
            } else {
              questions[q] = {
                questionId: q,
                answerList: [exam.answerList[index]]
              }
            }
          })
        })

        const questionStatistics = Object.entries(questions).map(e=>e[1])

        const _me = this
        axios({
          method: 'post',
          url: 'https://huibizhang.com/examler/api/get_history.php',
          data: {
            subject: histories[currentExpId][0].subject,
            range: `'${_me.range.join("','")}'`,
            history: questionStatistics.map(e=>e.questionId).join(",")
          },
        })
        .then(function (response) {
          questionStatistics.forEach((q,index)=>{
            response.data.results[index].wrongs = q.answerList.filter(e=>e!==response.data.results[index].ans).length
            response.data.results[index].occurrence = q.answerList.length
          })

          _me.datas = {
            results: response.data.results.filter(e=>e.wrongs>0)
          }
          _me.datas.results.sort((a,b)=>a.wrongs-b.wrongs)
          _me.open = false
        });
      }
    }
  },
  components: {
    Header,
    Question,
    LoadingScreen,
  }
}
</script>

<style>

</style>