<template>
  <Header :title="'sads'"></Header>
  <h1>This is a mybank page</h1>
  <HelloWorld :msg="'Hello Vue 3.0 + Vite'" />
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