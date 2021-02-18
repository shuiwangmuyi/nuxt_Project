<template>
  <div class="find">    
    <!-- 轮播图 -->
    <el-carousel :interval="2000" arrow="always" type="card">
      <el-carousel-item v-for="(item,key) in imageList" :key="key">
         <el-image :src="item.imgpath" alt=""></el-image>
      </el-carousel-item>
    </el-carousel> 
    <div class="discover-module">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="(musicList,index) in musicTypeList"
          :key="index" 
          :label="musicList.TypeName"
          :name="musicList.TypeName">
          <SingList>
            <!-- :GetTypeName="musicList.TypeName"> -->
          </SingList> 
        </el-tab-pane>
      </el-tabs>      
    </div>
  </div>
</template>

<script>
import singList from "./index/singList";
export default {
  name: "find",
  components: {
    SingList:singList,
  },
  data(){
    return{
      activeName:'',
      imageList:[
        {
          imgpath:require('../../assets/img/img/109951165507892712.jpg')
        }
        , {
          imgpath:require('../../assets/img/img/109951165508043727.jpg')
        }
        , {
          imgpath:require('../../assets/img/img/109951165508067721.jpg')           
        }
        , {
           imgpath:require('../../assets/img/img/109951165508101631.jpg')
        }
        , {
            imgpath:require('../../assets/img/img/109951165508108226.jpg')
        }
        , {
            imgpath:require('../../assets/img/img/109951165508109914.jpg')
        }
      ],
      musicTypeList:[{
      }]     
    }
  },
  mounted(){   
    this.getMusicType();    
  },
  methods:{        
     getMusicType(){
      this.$axios({
        method: 'post',
        url:'https://localhost:5001/MusicType/GetMusicTypeData',
        dataType: "json"
        }).then(res => {   
         if(res.data[0].code==='200'&&res.data[0].msg==="OK"){
             this.musicTypeList=  res.data[0].data  
             this.activeName=res.data[0].data[0].TypeName        
         }              
        })    
     },
     handleClick(tab, event) { 
      //  console.log(tab.name);         
    }
  }
};
</script>

<style lang="stylus" scoped>
/deep/ .el-menu {
  color: #fff;
}
/deep/ .el-carousel__container {
    position: relative;
    height: 210px;
}
</style>
