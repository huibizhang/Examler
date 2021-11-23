<template>
  <div class="flex flex-col w-full h-screen">
    <Header :title="'進出口外匯'">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    </Header>

    <div class="w-full flex-1 overflow-hidden">
      <!-- {{ datas }} -->
      <div class="w-full h-full overflow-y-scroll p-2 bg-gray-200 space-y-2">
        <Question
           v-for="q in datas.results"
           :key="q.id"
           v-bind="q"
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
  name: "Home",
  data() {
    return {
      subject: "5GGAGDGSF54ASS5F",
      datas: "",
      open: true,
    }
  },
  mounted() {
    const _me = this
    axios({
      method: 'post',
      url: 'https://huibizhang.com/examler/api/getter.php',
      data: {
        subject: _me.subject,
        mode: 'review'
      },
    })
    .then(function (response) {
      _me.datas = response.data
      _me.open = false
    });
  },
  components: {
    Header,
    LoadingScreen,
    Question,
  },
};
</script>