<template>
  <div class="flex flex-col w-screen h-screen">
    <Header :title="'設定'" :doSystemPreferDetect="doSystemPreferDetect"></Header>

    <div class="flex-1 w-full bg-gray-100 dark:bg-gray-900 transition-all relative overflow-hidden">
      <div class="w-full h-full overflow-y-scroll space-y-3 p-3">
        <div class="bg-white dark:bg-gray-800 dark:text-gray-200 transition-all rounded-lg shadow-md">
          <div class="text-xl font-bold p-3 pb-1 text-center">外觀</div>
          <div class="py-3 px-5 space-y-3 divide-y">
            <div class="flex justify-between items-center text-lg w-full px-3 dark:text-gray-300 transition-all">
              <span>隨系統切換深色模式</span>
              <label class="block w-16 h-8 inset-0 my-2 relative">
                <input
                  type="checkbox"
                  class="peer appearance-none absolute z-10 w-1/2 h-full bg-white/70 dark:bg-gray-400 rounded-full checked:translate-x-full dark:checked:bg-gray-200 transition-all scale-75 cursor-pointer outline-none"
                  
                  v-model="followSystemSwitchDarkMode"
                  @change="saveSetting()"
                />
                <div class="w-full h-full bg-gray-300 dark:bg-gray-600 peer-checked:bg-green-400 absolute top-0 transition-all duration-500 -mt-1 -ml-1 border-4 dark:border-gray-500 box-content peer-checked:border-green-200 rounded-full overflow-hidden"></div>
              </label>
            </div>
            <!-- <div class="flex justify-between items-center text-lg w-full px-3 py-3">
              <span>隨系統切換深色模式</span>
              <label class="block w-16 h-8 inset-0 my-2 relative">
                <input type="checkbox" class="peer appearance-none absolute z-10 w-1/2 h-full bg-white/70 rounded-full checked:translate-x-full transition-all scale-75 cursor-pointer" />
                <div class="w-full h-full bg-gray-300 peer-checked:bg-green-400 absolute top-0 transition-all duration-500 -mt-1 -ml-1 border-4 box-content peer-checked:border-green-200 rounded-full overflow-hidden"></div>
              </label>
            </div> -->
          </div>
        </div>
        
        <!-- 重設 -->
        <div class="bg-white dark:bg-gray-800 dark:text-gray-200 transition-all rounded-lg shadow-md">
          <div class="text-xl font-bold p-3 pb-1 text-center">重設</div>
          <div class="py-3 px-5 text-center text-gray-400 text-sm">
            這個功能會清除整個應用程式的紀錄，並嘗試將設定還原到初始狀態，以確保應用程式運作正常。
            <button
              class="bg-red-600 dark:bg-red-700 font-bold text-white dark:text-gray-200 text-lg w-full px-5 py-2 rounded-lg mt-4 transition-all"
              @click="confirmOpen=true"  
            >重設應用程式</button>
          </div>
        </div>

        <!-- 關於 -->
        <div class="bg-white dark:bg-gray-800 dark:text-gray-200 transition-all rounded-lg shadow-md">
          <div class="text-xl font-bold p-3 pb-1 text-center">關於</div>
          <div class="py-3 px-5 text-center font-bold dark:text-gray-300 transition-all">
            Made by Tryto.
          </div>
        </div>
      </div>
      <Confirm
        :title="'警告'"
        :open="confirmOpen"
        @closing="confirmOpen=false"
        @confirming="resetApp()"
      >
        此動作將會清除本應用程式中的所有製作過的考卷及考試紀錄。
      </Confirm>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import HelloWorld from "../components/HelloWorld.vue";
import Confirm from "../components/Confirm.vue";

export default {
  name: "Setting",
  data() {
    return {
      followSystemSwitchDarkMode: true,
      doSystemPreferDetect: false,
      confirmOpen: false,
    }
  },
  mounted() {
    const setting = JSON.parse(window.localStorage.getItem("setting"))

    if(setting){
      this.followSystemSwitchDarkMode = setting['followSystemSwitchDarkMode']
    } else {
      this.followSystemSwitchDarkMode = true
    }
  },
  methods: {
    saveSetting() {
      const setting = JSON.parse(window.localStorage.getItem("setting"))

      if(setting){
        setting['followSystemSwitchDarkMode'] = this.followSystemSwitchDarkMode
        window.localStorage.setItem("setting",JSON.stringify(setting))

        this.doSystemPreferDetect = this.followSystemSwitchDarkMode
      }
    },
    resetApp() {
      window.localStorage.clear()
      alert("將返回應用程式主畫面")
      this.$router.push("/")
    }
  },
  components: {
    HelloWorld,
    Header,
    Confirm,
},
};
</script>