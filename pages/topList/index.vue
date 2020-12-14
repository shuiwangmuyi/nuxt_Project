<template>
  <div class="_toList">
      <div class="top_head">
        <div class="top_head_le">
          <h1 style="font-size: xx-large;">歌曲列表</h1>
          <span style="color:red">{{musiCount}}<em style="color:black">首歌</em></span>
        </div>
      </div>
     <div class="topTable">
        <div class="top_musicList">
          <div class="b">
            <span>标题</span>
          </div>
          <div class="g">
            <span>歌手</span>
          </div>
          <div class="r">
            <span>热度</span>
          </div>
        </div>
        <div class="musicTable">
          <div v-for="(list,index) in topMusicList"
            :key="index" style="height: 80px;">
            <div class="m-b">
              <el-image               
                :src="list.M_Img"
                fit="fit">
                  <!-- <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div> -->
              </el-image>
              <div class="m-b1">                 
                 <el-button  @click="PlayMusic(scope.$index, singListS)"
                    icon="el-icon-video-play" circle>
                  </el-button>
                <span>{{ list.M_Name}}</span>
              </div>
            </div>
            <div class="m-g1">
               <span>{{ list.M_Author }}</span>  
            </div>
           <div class="m-r1">
              <span>{{ list.M_Hot}}</span>
           </div>
          </div>
        </div>
     </div>
  </div>
</template>
<style >
  .top_head{
    text-align: left;
    height: 60px;
    /* border: 1px solid red; */
  }  
  .top_head_le{
      width: 400px;
      display: inline-block;
      line-height: 60px;
  }
  .top_head_le span{
    position: relative;
    color: red;
    left: 160px;
    top: -55px;;
  }
  .top_musicList{
    text-align: left;
    margin-top: 12px;
  }
  .top_musicList  .b{
    font-size: 17px;
    left: 100px; 
  }
  .top_musicList .g{
    left: 500px;
     bottom: 20px;
  }
  .top_musicList .r{
    left: 900px;
     bottom: 40px;
  }
  .top_musicList .b,
  .top_musicList .g,
  .top_musicList .r{  
    position: relative;  
    line-height: 20px;
    height: 20px;
     width: 300px;
  }
  .musicTable{
    margin: auto;
  }
  musicTable div
  {
    height: 80px;
  }
  .m-b{
    width: 257px;
    position: relative;
    left: -13px;
  }
  .m-b .el-image {
      width: 60px;
      height: 60px;
      border-radius: 50%;
  }
  .m-b1{
    position: relative;
    left: 200px;
    bottom: 40px;
    text-align: left;   
  }
  .m-b1 .el-button{
      border: none;
      margin-right: 12px;     
  }   
  .m-g1{
    position: relative;
    left: 500px;
    bottom: 68px;
    text-align: left;    
  }
  .m-r1{
    bottom: 84px;  
    left: 900px;
    text-align: left;
    position: relative;
  }
</style>
<script>
export default {
  data(){
    return{
      musiCount:0,
      topMusicList:[]
    }
  },
  mounted(){
      this.GetTopList()
  },
  methods:{
      GetTopList(){
         this.$axios({
          method: 'post',
          url:'https://localhost:5001/Music/GetMusicHotName',
          dataType: "json"
          }).then(res => { 
              if(res.data[0].code==='200'&&res.data[0].msg==="OK"){
                this.topMusicList=  res.data[0].data 
                this.musiCount=res.data[0].Total         
                console.log(this.topMusicList)          
              }              
          }) 
      },
      PlayMusic(){

      }
  }

}
</script>