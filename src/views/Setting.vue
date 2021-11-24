<template>
  <Header :title="'設定'"></Header>
</template>

<script>
import Header from "../components/Header.vue";
import HelloWorld from "../components/HelloWorld.vue";

export default {
  name: "My Bank",
  components: {
    HelloWorld,
    Header,
  },
};
</script>