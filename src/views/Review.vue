<template>
  <Header :title="'sads'"></Header>
  {{}}
</template>

<script>
import axios from 'axios'

import Header from "../components/Header.vue";
import HelloWorld from "../components/HelloWorld.vue";

export default {
  name: "Home",
  data() {
    return {
      subject: "5GGAGDGSF54ASS5F",

    }
  },
  mounted() {
    const _me = this
    axios({
      method: 'post',
      url: 'https://www.huibizhang.com/api/getter.php',
      data: {
        subject: _me.subject,
        mode: 'review'
      },
    })
    .then(function (response) {
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    });
  },
  components: {
    HelloWorld,
    Header,
  },
};
</script>