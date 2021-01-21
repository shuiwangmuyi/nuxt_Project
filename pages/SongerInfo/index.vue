<template>
  <div class="songerInfo">
     <div class="songerInfo-top" 
     v-for="(info,index) in songerInfo" :key="index">
       <div class="info-img">
          <el-image  style="width: 150px; height: 150px"
            :src="info.SingerImg" fit="fit">           
          </el-image>
       </div>
        <div class="Profile">
          <div style="text-align: left; padding-bottom: 12px;
            padding-left: 8px;font-weight: bold;font-size: 18px;">
            {{info.SingerName}}
          </div>         
           <p>
            {{info.introduce}}
          </p>
           <el-popover
            placement="bottom"
            :title="info.SingerName"
            width="370"
            trigger="click"          
            :content="info.introduce">
            <em title="更多介绍" slot="reference" class="more_detail" @click="GetOther">
              更多介绍
              <i class="el-icon-arrow-down el-icon--right"></i>
             </em>
          </el-popover>         
        </div>
     </div>
      
     <div class="songerInfo-botton"> 
        <el-tabs v-model="activeName" 
            @tab-click="handleClick">
          <el-tab-pane label="单曲" name="first">
            <div v-if="songerTable.length>0">
              <ul>
                <li v-for="(songer,index) in songerTable"
                  :key="index" class="songerLi">
                  <span class="num1">{{index|filterInex}}</span>
                  <span class="n2"> {{songer.M_Name}}</span>
                  <div class="n4">
                    <el-button icon="el-icon-video-play" circle></el-button>
                    <el-button icon="el-icon-folder-add" circle></el-button>
                  </div>
                   <el-divider class="dos"></el-divider>
                </li>
              </ul>
            </div>
            <div v-else
              class="el-table__empty-block" 
              style="height: 100%; width: 1053px;">
              <span class="el-table__empty-text">
                暂无数据
              </span>                      
            </div>
          </el-tab-pane>
          <el-tab-pane label="专辑" name="second">
            <div v-if="songerTable.length>0" class="s-z" style="width:1100px">
                <div v-for="(songer,index) in songerTable"
                  :key="index" class="block">
                  <el-card class="_box-card">
                    <el-image 
                      style="width: 150px; height: 150px"
                      :src="songer.AlbumImg"
                      fit="fit" :title="songer.AlbumId">
                    </el-image>
                  </el-card>
                  <div>
                     <el-tooltip class="item" effect="dark"
                      :content="songer.AlbumName" 
                      placement="right">
                      <el-button>
                        <span style="line-height: 30px;text-align: center;
                          width: 100px;" class="demonstration">
                          {{ songer.AlbumName|filterAlbumName}}
                          </span>
                        </el-button>
                    </el-tooltip>                   
                    <br>  
                    <span style="color: #c2c2c2;
                          text-align: center;
                          display: block; ">                        
                      {{ songer.AlbumTime|filterAlbumTime}}</span>
                  </div>
                </div>
            </div>
            <div v-else
              class="el-table__empty-block" 
              style="height: 100%; width: 1053px;">
              <span class="el-table__empty-text">
                暂无数据
              </span>                      
            </div>
          </el-tab-pane>
          <el-tab-pane label="MV" name="third">
            <div v-if="songerTable.length>0" class="s-z" style="width:1100px">
                <div v-for="(songer,index) in songerTable"
                  :key="index" class="block">
                  <el-card class="_box-card">
                    <el-image 
                      style="width: 150px; 
                      height: 150px"
                      :src="songer.MV_Img"
                      fit="fit" :title="songer.MV_Id">
                    </el-image>
                  </el-card> 
                 <div>
                  <el-tooltip class="item" effect="dark"
                      :content="songer.MV_Name" 
                      placement="right">
                      <el-button>
                        <span style="line-height: 30px;text-align: center;
                          width: 100px;" class="demonstration">
                          {{ songer.MV_Name|filterAlbumName}}
                          </span>
                        </el-button>
                    </el-tooltip>                   
   
                  </div>
                </div>
            </div>
            <div v-else
              class="el-table__empty-block" 
              style="height: 100%; width: 1053px;">
              <span class="el-table__empty-text">
                暂无数据
              </span>                      
            </div>
          </el-tab-pane>
        </el-tabs>
     </div>
  </div>
</template>

<script>
import moment from "moment"
export default {
  data(){
    return{
      oldUrl:'',
      SingerId:'',
      visible:false,
      activeName: 'first',
      songerTable:[],
      songerInfo:[]
    }
  },
  filters:{
      filterInex(index){
        if(index==undefined)
          return '01'
        else if(parseInt(index)<9)
          return '0'+(parseInt(index)+1)
        else
          return parseInt(index)+1
      },
      filterAlbumName(value){
        if(value==undefined)
          return value
        if(value.length>=7)      
          return value.slice(0,4).split('/')[0]+"……"        
         else
          return value
      },
      filterAlbumTime(value){
       return moment(new Date(parseInt(value))).
        format("YYYY-MM-DD") 
    }
  },
  created(){
   this.GetSongerInfo()    
  },
  mounted(){
    this.GetnextTick()
  },
  beforeRouteEnter(to,from,next){
    next(vm => {
      // 通过 `vm` 访问组件实例,将值传入oldUrl
      vm.oldUrl = from.path
    })
  } ,
  methods:{ 
    GetnextTick(){
      this.$nextTick(()=>{      
     console.log(this.oldUrl.split('/')[1] )
     })
    } ,  
    GetOther(){
      // console.log("ssssssssssssssss")
    },
    GetSongerInfo(){     
      this.SingerId=this.$route.query.SingerId       
      let id=this.SingerId
      if(id==undefined||id=="")
      {       
        this.$alert('抱歉,数据不成在', '标题', {
          confirmButtonText: '确定',
          callback: action => {
            if(this.oldUrl.trim()==''
            ||this.oldUrl==undefined
            ||this.oldUrl=='/')
             {
               console.log(this.oldUrl+"===========ffff")
              this.$router.push({ name: 'find'}) 
             }  
            else
              this.$router.push({ name: this.oldUrl.split('/')[1]})   
            this.$message({
              type: 'info',
              message: `返回成功！`
            });
          }
        });
        return
      }     
      this.songerTable=[]
      this.$axios({
        method: 'post',
        url:'https://localhost:5001/SingerInfo/GetSingerInfo',
        params:{Id:id,
                type:this.activeName},
        dataType: "json"
      })
      .then(res=>{        
        if(res.data[0].code==='200'
          &&res.data[0].msg==="OK"){
           this.songerTable= res.data[0].data[0].data1
           this.songerInfo= res.data[0].data[1].data2
           console.log(this.songerTable)
        }
      })
      .catch(err=>{         
        this.$message({
          message: `系统错误`,
              center: true
           })
        }) 
    },
    handleClick(tab, event){     
      this.activeName=tab.name
      this.GetSongerInfo()
    }
  }
}
</script>

<style>
 .dos{
   margin: 0;
 }
  .songerInfo{
    text-align: left;
  }
  .songerInfo .songerInfo-botton .el-tabs .el-tabs__content{
    width: 1100px;
  }
  .songerInfo-top{
    width: 1100px;
    height: 150px;
    border: 1px slategrey solid;
  }
  .songerInfo-top .info-img{
    width: 150px;
    height: 150px;
  }
   .songerInfo-top .Profile{
     width: 930px;
    position: relative;
    left: 170px;
    bottom: 140px;
   }
   .Profile p{
     text-align: justify;
    line-height: 18px;
    padding-top: 15px;
    padding-right: 15px;
    height: 52px;
    font-size: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
   }
   .Profile em{
      color: #198fc7;
      font-size: 15px;
      float: right;
      padding-right: 37px;
      margin-top: 13px;
      font-style: normal;
      /* text-decoration: underline; */
      cursor: pointer;
   } 
   .songerInfo-botton{
     margin-top: 30px;
     width: 1102px;
   }
   .songerLi{
    height: 60px;
    line-height: 40px;
    width: 1100px;
   }
   .s-z .block{
     width: 160px;
     height: 150px;
     display: inline-block;
     text-align: center;
      margin-bottom: 60px;
      margin-left: 15px;
   }
   .s-z .block ._box-card{
     width: 160px;
     height: 160px;
   }
   .s-z .block .el-card.is-always-shadow{
      box-shadow: none
   }
   .s-z .block .el-card{
     border: 4px solid #EBEEF5;
   }
   .s-z .block ._box-card .el-card__body{
     padding: 0;
   }
   .songerLi .n2{
     margin-left: 70px;
   }
   .songerLi .n4{    
     display: inherit;
     text-align: right;
     margin-top: -40px;
   }
    .songerLi .n4 .el-button{
      border: none;
    }
   .s-z .block div .el-button{
     border: none;
     margin: 0;
     padding: 0;
   }
   .s-z .block div .el-button:hover{
     color:silver;
   }
</style>