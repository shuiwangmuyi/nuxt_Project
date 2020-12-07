<template>
   <div>
      <div class="header">
         <div style="height:50px">
           <div class="header-left">
              <el-image :src="imgpath" fit="fit" 
               style="width:200px;height: 40px;line-height: 40px;padding: 5px;float:left;">
              </el-image>
            </div>
            <div style="width:500px;height: 40px;left: 220px;position: relative;text-align: center;line-height: 40px;top: 5px;">    
            </div>           
              <el-input
                placeholder="请输入内容"
                v-model="searchText" @keyup.enter.native="searchClick"
                class="secahInput">
                <i slot="prefix" @click="searchClick" class="el-input__icon el-icon-search"></i>
              </el-input>          
            <!-- 右边登录等 -->
            <div class="header-right">
              <div class="logo">登录</div>
              <div class="control">注册</div>
              <div class="user" v-show="false">user</div>
            </div>
         </div> 
      </div>
       <div class="wrap">
        <el-menu  mode="horizontal" 
            router style="height:0px"
            :default-active="activeIndex">
            <el-menu-item v-for="Subnav in SubnavList" 
            :key="Subnav.id"  @select="handleSelect"
            :index="Subnav.path" style="height:1px">
              <span slot="title">{{Subnav.discover}}</span>
            </el-menu-item> 
          </el-menu>
      </div>     
   </div>
</template>

<script>
export default {
  data(){
    return{
      activeIndex:'find',
      imgpath:require('D:/Nuxt/nuxt_project/assets/img/logo.jpg'),
      SubnavList:[],  
      searchText:'' 
    }
  },
  mounted(){
     this.getMusicSubnav()
  },
  methods:{
      handleSelect(key, keyPath) {       
        console.log(key, keyPath);
      },
     getMusicSubnav(){
       this.$axios({
        method: 'post',
        url:'https://localhost:5001/MusicType/GetMusictypeSubnav',
        dataType: "json"
        }).then(res => { 
            if(res.data[0].code==='200'&&res.data[0].msg==="OK"){
              this.SubnavList=  res.data[0].data   
              this.activeIndex='find'           
             }              
        })    
      },
      searchClick(){          
          this.$router.push({ name: 'seachMusic', 
          params:{seactText: this.searchText}})        
      }
  }

};
</script>

<style scoped>
.header {
    width: 1122px;
    margin: 0 auto;
    background-color: #FFEBCD;
}
.header-left{
  width: 180px;
  text-align:  center;
}
.secahInput{
  width: 200px;
  position: absolute;
  left: 810px;
  top: -17px;
}
.wrap .el-menu.el-menu--horizontal {
    border-bottom: none;
}

.wrap .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus
,.wrap .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu .el-submenu__title:hover {
    background-color: #FFEBCD;
}
.wrap .el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: 2px solid #FFEBCD;
    color: #303133;
}

.header-right{
    width: 80px;
    left: 1030px;
    position: absolute;
    line-height: 40px;
    height: 40px;
    text-align: center;
    top: 5px;
}
.logo,.control,.user {
    /* background-color: #7FFFD4; */
    display: inline-block;
    margin-right: 5px;
}
.wrap{
    width: 600px;
    height: 40px;
    left: 220px;
    top:-14px;
    position: relative;
}

</style>