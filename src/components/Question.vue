<template>
  <!-- <div class="p-3 border-t first:border-t-0"> -->
  <div
    v-show="onShowMistake ? userAns!==ans : true"
    :id="`no${no}`"
    class="p-2 rounded-lg overflow-hidden"
    :class="[mode==='exam-finished' && userAns!==ans? 'bg-red-200': 'bg-white']"
  >
    <div>{{mode==='review'? serial: examSerial}}. (
      <span v-if="mode==='review'" class="text-blue-600">{{ans}}</span>
      <span v-else-if="mode==='exam-finished'" :class="[userAns===ans? 'text-green-600': 'text-[red]']">{{userAns}}</span>
      <span v-else class="text-blue-600">{{ userAns? userAns: '&nbsp;' }}</span>
    )
    <span
      v-if="mode==='exam-finished'"
      class="text-blue-600"
    >
      &nbsp;正確：{{ans}}
    </span>
    </div>
    
    <!-- 題目敘述 -->
    <div>{{question}}</div>
    
    <!-- 出自於 -->
    <div
      v-if="mode==='review' || mode==='exam-finished'"
      class="text-blue-600 w-full text-right text-sm"
    >
      {{ from(no,'屆') }}
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
  ],
  data () {
    return {
      userAns: '',
    }
  },
  methods: {
    from (no, useName) {
      const noString = no.split('-')
      return `(來自題庫：第 ${noString[0]} ${useName} 第 ${noString[1]} 題)`
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