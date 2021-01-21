<template>
  <div class="footer">
    <div class="play">play</div>
    <div class="control">control</div>
    <div class="list">list</div>
    <!-- <nuxt-link to="/login">登录</nuxt-link>
    <nuxt-link to="/register">注册</nuxt-link>
    <nuxt-link to="/user">用户</nuxt-link> -->
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.footer {
    float: left;
    width: 100%;
    height: 140px;
    background-color: #FFEBCD;
}
.play,.control,.list {
    float: left;
    background-color: #7FFFD4;
    margin-left: 2.5%;
    width: 30%;
}

</style>