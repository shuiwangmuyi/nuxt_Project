<template>
  <div class="index">
    <el-container>
      <el-header>
        <Header @func="getMsgFormconn"></Header>
      </el-header>
      <el-container>
        <!-- <el-aside width="200px">
          <Aside></Aside>
        </el-aside> -->
        <el-main>
          <Nuxt />
        </el-main>
      </el-container>
      <el-footer>
        <!-- <Music></Music> -->
     
        <!-- <Footer></Footer> -->
      </el-footer>
    </el-container>
    
    <el-dialog   class="headLogin"  
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose">
      <Login></Login>
    </el-dialog>
  </div>
</template>
<script>
import { header, aside, footer,login } from "~/components";

export default {
  name: "App",
  components: {
    Header: header,
    Aside: aside,
    Footer: footer,  
    Login:login,    
    //  Music:music,
  },
  data(){
    return{
      dialogVisible:false,
      activeName:'first'
    }
  },
  methods:{
    getMsgFormconn(data){
      // console.log(data+"sssssssssssss")  
      this.activeName=data  
      this.dialogVisible=true
      console.log(this.dialogVisible)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style>
/* .foot_botton{
  position: absolute;
  width: 1100px;
  top: 700px;
} */
.el-header,
.el-footer {
   /* background-color: #b3c0d1; */
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
.headLogin .el-dialog .el-dialog__header{
  padding: 0;
}
.headLogin .el-dialog .el-dialog__header .el-dialog__headerbtn{
    position: absolute;
    top: 41px;
    z-index: 1222;
}
</style>
