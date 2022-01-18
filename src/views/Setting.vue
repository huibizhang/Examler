<template>
  <div class="flex flex-col w-screen h-screen">
    <Header :title="'設定'" :doSystemPreferDetect="doSystemPreferDetect"></Header>

    <div class="flex-1 w-full bg-gray-100 dark:bg-gray-900 transition-all relative overflow-hidden">
      <div class="w-full h-full overflow-y-scroll space-y-3 p-3">
        <div class="bg-white dark:bg-gray-800 dark:text-gray-200 transition-all rounded-lg shadow-md max-w-lg inset-0 mx-auto">
          <!-- <div class="text-xl font-bold p-3 pb-1 text-center">外觀</div> -->
          <div class="text-xl font-bold p-3 pb-1 text-center">主題</div>
          <div class="py-3 px-5 space-y-3 divide-y">
            <div class="flex gap-2">
              <label class="flex-1" @click="changeTheme('light')">
                <input
                  name="theme"
                  type="radio"
                  class="flag-1 sr-only"
                  value="light"
                  :checked="theme==='light'"
                />
                <div class="flex flex-col justify-center items-center gap-4 border-2 rounded-lg py-5 flag-1-checked:bg-green-500 flag-1-checked:text-white dark:border-gray-500 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 flag-1-checked:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 hidden flag-1-checked:block" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
                  </svg>
                  <span class="flag-1-checked:font-bold">淺色</span>
                </div>
              </label>
              <label class="flex-1" @click="changeTheme('dark')">
                <input
                  name="theme"
                  type="radio"
                  class="flag-1 sr-only"
                  value="dark"
                  :checked="theme==='dark'"
                />
                <div class="flex flex-col justify-center items-center gap-4 border-2 rounded-lg py-5 flag-1-checked:bg-green-500 flag-1-checked:text-white dark:border-gray-500 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 flag-1-checked:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 hidden flag-1-checked:block" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                  <span class="flag-1-checked:font-bold">深色</span>
                </div>
              </label>
              <label class="flex-1" @click="changeTheme('system')">
                <input
                  name="theme"
                  type="radio"
                  class="flag-1 sr-only"
                  value="system"
                  :checked="theme==='system'"
                />
                <div class="flex flex-col justify-center items-center gap-4 border-2 rounded-lg py-5 flag-1-checked:bg-green-500 flag-1-checked:text-white dark:border-gray-500 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span class="flag-1-checked:font-bold">系統</span>
                </div>
              </label>
            </div>
            <div class="!hidden flex justify-between items-center text-lg w-full px-3 dark:text-gray-300 transition-all">
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
        <div class="bg-white dark:bg-gray-800 dark:text-gray-200 transition-all rounded-lg shadow-md max-w-lg inset-0 mx-auto">
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
        <div class="bg-white dark:bg-gray-800 dark:text-gray-200 transition-all rounded-lg shadow-md max-w-lg inset-0 mx-auto">
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
      theme: "system",
    }
  },
  mounted() {
    const setting = JSON.parse(window.localStorage.getItem("setting"))

    if(setting){
      this.followSystemSwitchDarkMode = setting['followSystemSwitchDarkMode']
      this.theme = setting['theme']? setting['theme']: 'system'
    } else {
      this.followSystemSwitchDarkMode = true
      this.theme = "system"
    }
  },
  methods: {
    saveSetting() {
      const setting = JSON.parse(window.localStorage.getItem("setting"))

      if(setting){
        setting['followSystemSwitchDarkMode'] = this.followSystemSwitchDarkMode
        setting['theme'] = this.theme
        window.localStorage.setItem("setting",JSON.stringify(setting))

        this.doSystemPreferDetect = this.followSystemSwitchDarkMode
      }
    },
    changeTheme(theme){
      this.theme = theme
      this.followSystemSwitchDarkMode = (theme==="system")

      this.saveSetting()

      if(theme==="dark"){
        this.doSystemPreferDetect = true
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