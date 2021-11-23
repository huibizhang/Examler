<template>
  <!-- <div class="p-3 border-t first:border-t-0"> -->
  <div class="p-2 rounded-lg overflow-hidden bg-white">
    <div>{{serial}}. ( <span class="text-blue-600">{{ans}}</span> )</div>
    
    <div>{{question}}</div>
    
    <div class="text-blue-600 w-full text-right">{{ from(no,'屆') }}</div>

    <!-- 選項 -->
    <div class="">
      <div class="py-1 hover:bg-gray-100 transition-all">(A) {{opA}} </div>
      <div class="py-1 hover:bg-gray-100 transition-all">(B) {{opB}} </div>
      <div class="py-1 hover:bg-gray-100 transition-all">(C) {{opC}} </div>
      <div class="py-1 hover:bg-gray-100 transition-all">(D) {{opD}} </div>
    </div>
  </div>
</template>

<script>
export default {
  props:[
    "ans",
    "question",
    "opA",
    "opB",
    "opC",
    "opD",
    "no",
    "subject",
    "serial",
  ],
  methods: {
    from( no, useName ) {
      const noString = no.split('-')
      return `(來自題庫：第 ${noString[0]} ${useName} 第 ${noString[1]} 題)`
    }
  }
}
</script>