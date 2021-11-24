<template>
  <Header :title="'歷史紀錄'"></Header>
  <h1>歷史紀錄</h1>
  <HelloWorld :msg="'Hello Vue 3.0 + Vite'" />
</template>

<script>
import Header from "../components/Header.vue";
import HelloWorld from "../components/HelloWorld.vue";

export default {
  name: "History",
  components: {
    HelloWorld,
    Header,
  },
};
</script>