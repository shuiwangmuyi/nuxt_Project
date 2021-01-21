<template>
  <div id="playList">
      
  </div>
</template>

<script>
export default {
  created(){
    this.getMessageBox()
  },
  methods:{
    getMessageBox(){
        this.$alert('抱歉,该功能暂未开放，即将返回首页', '标题', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push({ name: 'find' })   
            this.$message({
              type: 'success',
              message: `返回成功！`
            });
          }
        });
    }
  }
}
</script>

<style>

</style>