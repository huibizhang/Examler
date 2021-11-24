<template>
  
</template>

<script>
export default {
  mounted() {

    const examinationPapers = JSON.parse(window.localStorage.getItem('examinationPapers'))

    if(!examinationPapers || examinationPapers.size===0) {
      const examinationPaper = {
        expId: this.expIdGenerator(),
        title: "初階外匯(牟)",
        subject: "SF54ASS5F5GGAGDG",
        range: [35,36,37],
        total: 150,
        count: 15,
      }
  
      window.localStorage.setItem('examinationPapers',JSON.stringify([examinationPaper]))
      window.localStorage.setItem('currentExpId',examinationPaper.expId)
    }

    this.$router.push("/exam/")
  },
  methods: {
    expIdGenerator () {
      return `${this.hashGenerator(5)}-${this.hashGenerator(6)}-${this.hashGenerator(5)}`
    },
    hashGenerator (digits) {
      const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
      var result = ""

      for(let i=0;i<digits;i++){
        result += keys.charAt(Math.random()*keys.length)
      }
      return result
    }
  }
}
</script>

<style>

</style>