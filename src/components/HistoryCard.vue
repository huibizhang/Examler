<template>
  <div
    class="w-full shadow-md bg-white hover:bg-gray-50 hover:ring-2 group rounded-lg overflow-hidden flex flex-col transition-all select-none"
    :class="[
      (score>=80) && 'ring-green-400',
      (score>=60 && score<80) && 'ring-yellow-400',
      (score<60) && 'ring-red-400',
    ]"
  >
    <div class="flex flex-none items-center">
      <div
        class="w-20 h-20 p-5 transition-all flex justify-center items-center text-3xl font-bold flex-none"
        :class="[
          (score>=80) && 'bg-green-100 group-hover:bg-green-200 text-green-500',
          (score>=60 && score<80) && 'bg-yellow-100 group-hover:bg-yellow-200 text-yellow-600',
          (score<60) && 'bg-red-100 group-hover:bg-red-200 text-red-700',
        ]"
      >
        <div class="flex items-end">
          {{score}}<span class="text-sm">分</span>
        </div>
      </div>
      <div class="flex-1 flex flex-col justify-center p-3 font-bold text-lg">
        <span class="text-sm text-gray-400">作答於 {{timeago(timestamp)}} </span>
      </div>
      <div
        class="w-14 h-14 mr-3 flex flex-col justify-center items-center hover:bg-gray-200 transition-all text-gray-500 rounded-lg"
        @click="$router.push(`/history-review/?history=${timestamp}`)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        查看
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:["score","subject","answerList","questionList","timestamp"],
  methods: {
    route (path) {
      window.localStorage.setItem("currentExpId",this.expId)
      this.$router.push(path)
    },
    timeago(dateTimeStamp){   //dateTimeStamp是一個時間毫秒，註意時間戳是秒的形式，在這個毫秒的基礎上除以1000，就是十位數的時間戳。13位數的都是時間毫秒。
      var minute = 1000 * 60;      //把分，時，天，周，半個月，一個月用毫秒表示
      var hour = minute * 60;
      var day = hour * 24;
      var week = day * 7;
      var halfamonth = day * 15;
      var month = day * 30;
      var now = new Date().getTime();   //獲取當前時間毫秒
      console.log(now)
      var diffValue = now - dateTimeStamp;//時間差

      var result = ""

      if(diffValue < 0){
          return;
      }
      var minC = diffValue/minute;  //計算時間差的分，時，天，周，月
      var hourC = diffValue/hour;
      var dayC = diffValue/day;
      var weekC = diffValue/week;
      var monthC = diffValue/month;
      if(monthC >= 1 && monthC <= 3){
          result = " " + parseInt(monthC) + "月前"
      }else if(weekC >= 1 && weekC <= 3){
          result = " " + parseInt(weekC) + "周前"
      }else if(dayC >= 1 && dayC <= 6){
          result = " " + parseInt(dayC) + "天前"
      }else if(hourC >= 1 && hourC <= 23){
          result = " " + parseInt(hourC) + "小時前"
      }else if(minC >= 1 && minC <= 59){
          result =" " + parseInt(minC) + "分鐘前"
      }else if(diffValue >= 0 && diffValue <= minute){
          result = "剛剛"
      }else {
          var datetime = new Date();
          datetime.setTime(dateTimeStamp);
          var Nyear = datetime.getFullYear();
          var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
          var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
          var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
          var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
          var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
          result = Nyear + "-" + Nmonth + "-" + Ndate
      }
      return result;
    }
  }
}
</script>