<template>
  <div class="aside">
    <el-menu router>
      <el-menu-item index="/find">
        <span slot="title">发现</span>
      </el-menu-item>
      <el-menu-item index="/shipin">
        <span slot="title">视频</span>
      </el-menu-item>
      <el-menu-item index="/friend">
        <span slot="title">朋友</span>
      </el-menu-item>
      <el-menu-item index="/diantai">
        <span slot="title">FM</span>
      </el-menu-item>
      <!-- 有子级 -->
      <el-submenu index="">
        <template slot="title">
          <span slot="title">创建的</span>
        </template>
        <el-menu-item index="/bdyy">本地</el-menu-item>
        <el-menu-item index="/download">下载</el-menu-item>
      </el-submenu>
      <el-submenu index="">
        <template slot="title">
          <span slot="title">收藏的</span>
        </template>
        <el-menu-item index="/one">1</el-menu-item>
        <el-menu-item index="/two">2</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.aside {
  width: 200px !important;
  min-height: 500px;
}
.el-menu {
  color: #fff;
}
</style>