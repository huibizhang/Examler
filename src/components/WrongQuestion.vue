<template>
  <!-- <div class="p-3 border-t first:border-t-0"> -->
  <div
    v-show="onShowMistake ? userAns!==ans : true"
    :id="`no${no}`"
    class="p-2 rounded-lg overflow-hidden w-full max-w-full md:max-w-xl lg:max-w-2xl inset-0 mx-auto transition-all"
    :class="[mode==='exam-finished' && userAns!==ans? 'bg-red-200 dark:bg-red-900 dark:text-gray-300': 'bg-white dark:bg-gray-700 dark:text-gray-300']"
  >
    <div class="bg-white/20 rounded-md mb-2 p-2 flex justify-between text-gray-500 dark:text-white/30">
      <span class="flex-1 text-center">
        錯誤次數：
        <span class="text-red-500 dark:text-red-300 font-bold">
          {{wrongs}}
        </span>
      </span>
      <span class="flex-none text-red-200 dark:text-white/30">|</span>
      <span class="flex-1 text-center">
        答錯率：
        <span class="text-red-500 dark:text-red-300 font-bold">
          {{`${Math.round(wrongs*100/occurrence)}% (${wrongs}/${occurrence})`}}
        </span>
      </span>
    </div>

    <div>{{mode==='review'? serial: examSerial}}. (
      <span v-if="mode==='review'" class="text-blue-600 dark:text-blue-400 transition-all">{{ans}}</span>
      <span v-else-if="mode==='exam-finished'" :class="[userAns===ans? 'text-green-600 dark:text-green-400': 'text-[red] dark:text-red-300']">{{userAns}}</span>
      <span v-else class="text-blue-600 dark:text-blue-400 transition-all">{{ userAns? userAns: '&nbsp;' }}</span>
    )
    <span
      v-if="mode==='exam-finished'"
      class="text-blue-600 dark:text-blue-400 transition-all"
    >
      &nbsp;正確：{{ans}}
    </span>
    </div>
    
    <!-- 題目敘述 -->
    <div>{{question}}</div>
    
    <!-- 出自於 -->
    <div
      v-if="mode==='review' || mode==='exam-finished'"
      class="text-blue-600 dark:text-blue-400 transition-all w-full text-right text-sm"
    >
      {{
        from(
          no.indexOf('-')===-1? (`${session}-${no}`): no,
          type? type: ''
        )
      }}
    </div>

    <!-- 選項 -->
    <div class="">
      <div
        v-for="i in 4"
        :key="`option-${i-1}`"
        class="py-2 hover:bg-black/5 transition-all flex space-x-1"
        @click="answered(optionType(optionSign)[i-1])"
      >
        <div>({{optionType(optionSign)[i-1]}})</div>
        <div>{{options()[i-1]}}</div>
      </div>
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
    "optionSign",
    "mode",
    "examSerial",
    "onShowMistake",
    "inputUserAns",
    "type",
    "session",
    "wrongs",
    "occurrence",
  ],
  data () {
    return {
      userAns: '',
    }
  },
  mounted () {
    if (this.inputUserAns) {
      this.userAns = this.inputUserAns
    }
  },
  methods: {
    from (no, useName) {
      const noString = no.split('-')
      return `(來自題庫：${useName?'第 ':''}${noString[0]}${useName?` ${useName}`:''} 第 ${noString[1]} 題)`
    },
    optionType (typeCode) {
      var ot = ''
      switch(typeCode) {
        case 'A': {
          ot = ['A','B','C','D']
          break;
        }
        case '1': {
          ot = ['1','2','3','4']
          break;
        }
      }
      return ot
    },
    options () {
      return [this.opA,this.opB,this.opC,this.opD]
    },
    answered (ansPressed) {
      if(this.mode!=='exam'){
        return;
      }

      this.userAns = ansPressed
      this.$emit("userAnswered", ansPressed)
    },
  }
}
</script>