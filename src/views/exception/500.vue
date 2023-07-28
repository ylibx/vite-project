<template>
  <a-result status="500" title="500" sub-title="Sorry, the server is wrong.">
    <template #extra>
      <a-button type="primary">返回首页</a-button>
    </template>
  </a-result>
</template>
<script>
export default {
  data(){
    return{}
  },
  methods:{
    goHome(){
      this.$router.push('/')
    }
  }
}
</script>

