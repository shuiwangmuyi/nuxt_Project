<template>
  <div class="index">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <!-- <el-aside width="200px">
          <Aside></Aside>
        </el-aside> -->
        <el-main>
          <Nuxt />
        </el-main>
      </el-container>
      <!-- <el-footer>
        <Footer></Footer>
      </el-footer> -->
    </el-container>
  </div>
</template>
<script>
import { header, aside, footer } from "~/components";
export default {
  name: "App",
  components: {
    Header: header,
    Aside: aside,
    Footer: footer,
  },
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 82px;
  height: 82px !important;
  padding: 0 !important;
}
.el-header{
  box-sizing: border-box;
  position: relative;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: white;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}
.el-container{
  width:1125px;
  margin: 0 auto;
}
body > .el-container {
  margin-bottom: 40px;
}
</style>
