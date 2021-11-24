<template>
  <div
    class="w-full h-20 shadow-md bg-white hover:bg-gray-50 hover:ring-2 ring-red-400 group rounded-lg overflow-hidden flex transition-all"
    @click="$emit('selected')"  
  >
    <div class="w-20 h-20 p-5 bg-red-100 flex-none group-hover:bg-red-200 transition-all">
      <img class="w-full h-full" src="../assets/book.png" />
    </div>
    <div class="flex-1 flex items-center p-3 font-bold text-lg">
      {{title}}
    </div>
    <div class="w-8 h-full flex justify-center items-center text-gray-300">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props:["title","subject","sessions"]
}
</script>