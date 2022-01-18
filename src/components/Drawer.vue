<template>
  <div
    class="w-screen h-screen fixed top-0 left-0 z-30"
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
      class="bg-white dark:bg-gray-800 h-full w-2/3 md:max-w-xs absolute top-0 transition-all duration-500 flex flex-col"
      :class="[
        opened ? 'translate-x-0 shadow-xl': '-translate-x-full'
      ]"
    >
      <!-- LOGO -->
      <div class="w-full text-3xl text-center py-4 flex-none dark:text-gray-400 transition-all">
        <span class="text-cyan-500">E</span>x<span class="text-red-500">a</span>mler
      </div>

      <div class="w-full flex flex-col items-center space-y-1 flex-none mb-2">
        <span class="text-xs text-gray-400 dark:text-gray-500 transition-all">目前考卷</span>
        <span class="font-bold text-gray-600 dark:text-gray-400 transition-all">{{title}}</span>
      </div>

      <!-- 關閉 drawer 的叉叉 -->
      <div
        class="absolute top-0 right-0 m-2 p-2 hover:bg-black/5 rounded-full cursor-pointer dark:text-gray-300 transition-all"
        v-on:click="closing()"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <!-- 選單列表 -->
      <div class="p-3 space-y-2 overflow-x-hidden flex-1">
        <template
          v-for="link in links"
          :key="link.name"
        >
          <!-- 水平線元件 -->
          <div v-if="link.link ==='hr'" class="py-4">
            <div class="w-full h-[1px] bg-gray-200 dark:bg-gray-700 transition-all"></div> 
          </div>

          <!-- 連結元件 -->
          <router-link
            v-else
            class="flex gap-3 w-full p-3 border border-blue-800 dark:border-blue-700 dark:bg-blue-900/30 dark:text-gray-300 rounded-md hover:text-white hover:bg-blue-800 transition-all"
            :to="link.link"
            :class="$route.path===link.link && 'bg-blue-800 text-white'"
          >
            <div>
              <svg v-if="link.link==='/'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
              </svg>
              <svg v-else-if="link.link==='/exam/'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 800 800" stroke="currentColor">
                <g><path d="M676.637,183.386c0.002-0.002,0.004-0.004,0.005-0.005L522.549,29.287c-3.619-3.62-8.62-5.86-14.145-5.86H137.5   c-11.046,0-20,8.954-20,20v713.146c0,11.046,8.954,20,20,20h525c11.046,0,20-8.954,20-20V197.522   C682.5,192.407,680.426,187.203,676.637,183.386z M642.5,736.573h-485V63.427h342.62l114.096,114.095l-85.812,0v-41.788   c0-11.046-8.954-20-20-20s-20,8.954-20,20v61.788c0,11.046,8.954,20,20,20c0,0,92.404,0,134.096,0V736.573z"/><path d="M295.217,224.417l-39.854,39.855l-5.697-5.697c-7.811-7.811-20.473-7.811-28.283,0c-7.811,7.81-7.811,20.473,0,28.284   l19.84,19.84c3.75,3.751,8.838,5.858,14.142,5.858c5.305,0,10.392-2.107,14.143-5.858l53.996-53.999   c7.81-7.811,7.81-20.474-0.001-28.284C315.69,216.606,303.027,216.606,295.217,224.417z"/><path d="M557.831,312.557h6.646c11.046,0,20-8.954,20-20s-8.954-20-20-20h-6.646c-11.046,0-20,8.954-20,20   S546.785,312.557,557.831,312.557z"/><path d="M367.389,272.557c-11.046,0-20,8.954-20,20s8.954,20,20,20h129.609c11.046,0,20-8.954,20-20s-8.954-20-20-20H367.389z"/><path d="M557.831,435.552h6.646c11.046,0,20-8.954,20-20s-8.954-20-20-20h-6.646c-11.046,0-20,8.954-20,20   S546.785,435.552,557.831,435.552z"/><path d="M496.998,395.552H367.389c-11.046,0-20,8.954-20,20s8.954,20,20,20h129.609c11.046,0,20-8.954,20-20   S508.044,395.552,496.998,395.552z"/><path d="M557.831,558.547h6.646c11.046,0,20-8.954,20-20s-8.954-20-20-20h-6.646c-11.046,0-20,8.954-20,20   S546.785,558.547,557.831,558.547z"/><path d="M496.998,518.547H367.389c-11.046,0-20,8.954-20,20s8.954,20,20,20h129.609c11.046,0,20-8.954,20-20   S508.044,518.547,496.998,518.547z"/><path d="M557.831,681.542h6.646c11.046,0,20-8.954,20-20s-8.954-20-20-20h-6.646c-11.046,0-20,8.954-20,20   S546.785,681.542,557.831,681.542z"/><path d="M496.998,641.542H367.389c-11.046,0-20,8.954-20,20s8.954,20,20,20h129.609c11.046,0,20-8.954,20-20   S508.044,641.542,496.998,641.542z"/><path d="M255.363,435.552c5.304,0,10.392-2.107,14.142-5.858l53.996-53.996c7.811-7.811,7.811-20.475,0-28.285   s-20.473-7.811-28.283,0l-39.854,39.855l-5.697-5.698c-7.81-7.81-20.474-7.812-28.284-0.001s-7.811,20.474-0.001,28.284   l19.84,19.841C244.972,433.444,250.059,435.552,255.363,435.552z"/><path d="M234.239,511.547l-12.856,12.857c-7.81,7.811-7.81,20.474,0.001,28.284c3.905,3.905,9.023,5.857,14.142,5.857   s10.237-1.952,14.143-5.858l12.855-12.855l12.856,12.855c3.904,3.906,9.023,5.858,14.142,5.858s10.237-1.952,14.142-5.858   c7.811-7.811,7.811-20.473,0-28.283l-12.855-12.857l12.856-12.857c7.81-7.811,7.81-20.474-0.001-28.284   c-7.811-7.81-20.474-7.81-28.284,0.001l-12.856,12.856l-12.857-12.856c-7.811-7.811-20.473-7.811-28.283,0s-7.811,20.474,0,28.283   L234.239,511.547z"/><path d="M295.217,593.4l-39.854,39.855l-5.697-5.697c-7.811-7.811-20.473-7.811-28.283,0c-7.811,7.81-7.811,20.473,0,28.283   l19.84,19.84c3.75,3.752,8.838,5.858,14.142,5.858c5.305,0,10.392-2.107,14.143-5.858l53.996-53.998   c7.81-7.811,7.81-20.474-0.001-28.284C315.69,585.59,303.027,585.59,295.217,593.4z"/></g>
              </svg>
              <svg v-else-if="link.link==='/review/'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <svg v-else-if="link.link==='/setting/'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <svg v-else-if="link.link==='/history/'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <svg v-else-if="link.link==='/banks/'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
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
      title: "",
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
          name: "歷史紀錄",
          link: "/history/"
        },
        {
          name: "水平線",
          link: "hr"
        },
        {
          name: "我的試卷庫",
          link: "/"
        },
        {
          name: "瀏覽所有考科",
          link: "/banks/"
        },
        {
          name: "水平線",
          link: "hr"
        },
        {
          name: "設定",
          link: "/setting/"
        },
      ],
    }
  },
  mounted() {
    this.opened = this.open

    const examinationPapers = JSON.parse(window.localStorage.getItem('examinationPapers'))
    const currentExpId = window.localStorage.getItem('currentExpId')

    if(currentExpId) {
      if(examinationPapers && examinationPapers.length>0) {
        
        const examinationPaper = examinationPapers.filter(exp => {
          return exp.expId === currentExpId
        })

        if(examinationPaper[0]){
          this.title = examinationPaper[0].title
        }
      }
    }
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