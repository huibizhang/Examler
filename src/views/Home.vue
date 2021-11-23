<template>
  <Header :title="'我的試卷庫'"></Header>
  <h1>我的試卷庫</h1>
  <HelloWorld :msg="'Hello Vue 3.0 + Vite'" />
</template>

<script>
import Header from "../components/Header.vue";
import HelloWorld from "../components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    Header,
  },
};
</script>