<template>
  <div class="flex flex-col w-screen h-screen">
    <Header :title="'瀏覽所有考科'"></Header>

    <div class="flex-1 w-full bg-gray-100">
      <div class="w-full h-full overflow-y-scroll space-y-3 p-3">
        <BankCard v-for="bank in datas.results" :key="bank.subject" v-bind="bank" />
      </div>
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

export default {
  name: "Banks",
  data() {
    return {
      datas: "",
      open: true,
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
  components: {
    Header,
    LoadingScreen,
    BankCard,
  },
};
</script>