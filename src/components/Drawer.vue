<template>
  <div
    class="w-screen h-screen fixed top-0 left-0 z-10"
    :class="!opened && 'pointer-events-none'"
  >

    <!-- Overlay -->
    <div
      class="w-full h-full bg-black/30 backdrop-blur-sm transition-all duration-500"
      :class="[
        opened ? 'opacity-100': 'opacity-0'
      ]"
      v-on:click="closing()"
    ></div>

    <div
      class="bg-white h-full w-2/3 absolute top-0 transition-all duration-500"
      :class="[
        opened ? 'translate-x-0': '-translate-x-full'
      ]"
    >
      <!-- LOGO -->
      <div class="w-full text-3xl text-center py-4">
        Examler
      </div>

      <!-- 關閉 drawer 的叉叉 -->
      <div
        class="absolute top-0 right-0 m-2 p-2 hover:bg-black/5 rounded-full cursor-pointer"
        v-on:click="closing()"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <!-- 選單列表 -->
      <div class="p-3 space-y-2">
        <template
          v-for="link in links"
          :key="link.name"
        >
          <!-- 水平線元件 -->
          <div v-if="link.link ==='hr'" class="py-4">
            <div class="w-full h-[1px] bg-gray-200"></div> 
          </div>

          <!-- 連結元件 -->
          <router-link
            v-else
            class="block w-full p-3 border border-blue-800 rounded-md hover:text-white hover:bg-blue-800 transition-all"
            :to="link.link"
          >
            {{ link.name }}
          </router-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:["open"],
  data() {
    return {
      opened: false,
      links: [
        {
          name: "做題目",
          link: "/exam/"
        },
        {
          name: "看題庫",
          link: "/review/"
        },
        {
          name: "水平線",
          link: "hr"
        },
        {
          name: "我的試卷庫",
          link: "/"
        },
      ],
    }
  },
  mounted() {
    this.opened = this.open
  },
  watch: {
    open(newVal, oldVal) {
      this.opened = newVal
    }
  },
  methods: {
    closing() {
      this.opened = false
      this.$emit("closing")
    }
  }
}
</script>