<template>
  <div>
    <div class="seach_header">
        <el-input placeholder="请输入搜索信息" 
          v-model="searchT" @keyup.enter.native="seachBtnClick"
          class="seachInput">
          <el-button slot="append" @click="seachBtnClick"  icon="el-icon-search"></el-button>
       </el-input>
    </div>
    <div id="mySeach">
        <div class="mysecah-top" 
        v-html="searchInfo">
        <!-- {{searchT}} -->
        </div>
        <div class="m-tabs-srch">
          <el-tabs v-model="activeName" 
              type="border-card" class="seachIn"
                    @tab-click="handleClick">
               <el-tab-pane v-for="tab in tabs" 
                  :key="tab.name"  
                  :label="tab.lable" 
                  :name="tab.name">
                <el-table v-if="activeName=='first'" 
                        class="seachelTable"
                  :data="musicTable">
                    <el-table-column width="60px">
                        <el-button  @click="PlayMusic(scope.$index, singListS)"
                        icon="el-icon-video-play" circle>
                        </el-button>
                    </el-table-column>
                    <el-table-column>                     
                      <template slot-scope="scope">                        
                          {{scope.row.M_Name}} 
                        </template>               
                    </el-table-column>                      
                    <el-table-column>                                                                       
                        <template slot-scope="scope">
                          {{scope.row.M_Author}} 
                        </template>               
                    </el-table-column>
                    <el-table-column>                                                                       
                        <template slot-scope="scope">
                          {{scope.row.M_Name}} 
                        </template>               
                    </el-table-column>   
                    <el-table-column width="60px">
                      <el-button  
                        @click="AddMusic(scope.$index, singListS)"
                        icon="el-icon-folder-add" circle>
                      </el-button>
                      </el-table-column>                   
                </el-table>                
                <div v-else-if="activeName=='second'">
                  <div v-if="musicTable.length>0">
                    <div class="img-block"                     
                      v-for="img in musicTable" 
                      :key="img.M_Id">
                        <el-image
                          style="width: 100px; height: 100px"
                          :src="img.M_Img"
                          fit="fit">
                        </el-image>
                        <div class="img-info">
                          <span class="demonstration">{{ img.M_Author|filterM_Author }}</span>
                            <el-button icon="el-icon-delete" circle></el-button>
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
                </div>
                <div v-else-if="activeName=='third'">                
                  <div v-if="musicTable.length>0">
                    <el-collapse v-model="activeNames" 
                      @change="handleChangess">
                        <el-collapse-item
                          v-for="(col,index) in musicTable" 
                          :key="col.M_Id" :name="index">
                          <template slot="title">                        
                            <div class="seach_word">
                              <el-image style="width: 40px; height: 40px;border-radius: 50%;"
                                :src="col.M_Img" fit="fit">
                              </el-image>                         
                            <div class="M_Name">{{col.M_Name}}</div>
                            <div class="M_Author">{{col.M_Author|filterM_Author}}</div>
                            <div class="hot">{{col.M_Hot}}</div>
                            </div>
                          </template>                        
                          <div v-if="show" style="margin-left: 165px;" 
                            @click="addComment($event,col.M_Words)"
                            v-html="filterM_Words(col.M_Words,searchT)">
                          </div>
                          <div v-else style="margin-left: 165px;"  
                          @click="addComment($event,col.M_Words)" 
                          v-html="Words">
                          </div>
                        </el-collapse-item>
                    </el-collapse>
                  </div>
                  <div v-else
                    class="el-table__empty-block" 
                    style="height: 100%; width: 1053px;">
                    <span class="el-table__empty-text">
                      暂无数据
                    </span>                      
                  </div>
                </div>
                <div v-else>  
                  <div v-if="musicTable.length>0">
                     <div style="width:100px"
                      v-for="(user,index) in musicTable" 
                        :key="index">                      
                      <el-image
                        style="width: 100px; height: 100px"
                        :src="user.U_ICO"
                        :alt="user.U_Name"
                        fit="fit">
                      </el-image>                   
                      <div class="img-info">
                        <span class="demonstration">
                          {{ user.U_Name }}
                        </span>                                                     
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
               </div>
            </el-tab-pane>
          </el-tabs>
        </div>
    </div>
  </div>
</template>

<script>
export default {
   asyncData ({ params}) {
    //asyncData ({ query}) {
     let  Seachvalue=params.seactText 
     return {searchT:Seachvalue}    
    },
    data(){
      return{  
        searchT:'',        
        Words:'',
        show:true,  
        activeNames: ['1'] ,  
        activeName:'first',
        tabs:[
          {name:'first',lable:'单曲'},
          {name:'second',lable:'歌手'},
          {name:'third',lable:'歌词'},
          {name:'fourTh',lable:'用户'}          
          ],
         seach_word:'',
         musicTable:[],     
          searchCout:0,
          searchInfo:`搜索
                "<span style="color:red"></span>"找到
                单曲 <span style="color:red">0</span> 首`  
     }
    },
    watch:{     
      musicTable:function(){
        this.musicTable=this.musicTable
      }
    },
    filters:{
      filterM_Author(value){
        if(value==undefined)
        return value
        if(value.length>=3&&value.length<15)      
          return value.slice(0,3).split('/')[0]
        else if(value.length>=15)
          return value.slice(0,15).split('/')[0]
         else
          return value
      } 
    },   
    created(){
      //console.log(this.$route.query)
      //this.searchT=this.$route.query.seactText
    },
    mounted(){
      // console.log(this.$route)
       this.getSeachValue()
    },
   methods:{
      filterM_Words(value,sea){         
        if(value==undefined||value=='')
          return value 
        let reval=''
        // console.log(value)     
        let seaArray=value.split(/[(\r\n)\r\n]+/) 
        for(var i=0;i<seaArray.length-1;i++){
          if(seaArray[i].indexOf(sea)>-1){
            reval+=`<span style="color: red;display: block;text-align: left;">${seaArray[i]}</span>`
            let cout=0          
            for(var j=i+1;j<seaArray.length-1;j++){
              cout++   
              if(cout>=6)
                {
                reval+=`<span style="display: block;text-align: left;">
                ${seaArray[j]} 
                <el-button  class="btnCs">                   
                  更多>></el-button>`  
                   break                              
                }  
              reval+=`<span style="display: block;text-align: left;">`               
            }
            break;
          }
        }     
        return reval 
      },
      addComment(event,M_Words){ 
        this.Words='' 
          if(event.target.nodeName==="EL-BUTTON"){
            this.show=!this.show  
            let reval=''         
            let seaArray=M_Words.split(/[(\r\n)\r\n]+/)
            for(var i=0;i<seaArray.length-1;i++){          
              if(seaArray[i].indexOf(this.searchT)>-1){
                this.Words+=`<span style="color: red;display: block;text-align: left;">${seaArray[i]}</span>`       
                for(var j=i+1;j<seaArray.length-1;j++){             
                  console.log(j+"===")
                  console.log(seaArray.length)               
                  this.Words+=`<span style="display: block;text-align: left;">
                  ${seaArray[j]}</span>`                   
                }
                 this.Words+=`<el-button style="float: left;" class="btnCs">                   
                  更少>></el-button>`
                break;
              }
            }             
          }
          // console.log(event.target.nodeName==="BUTTON")
      },    
      getSeachValue(){
        if(this.searchT==undefined
        ||this.searchT.trim()==''
        ||this.searchT=='null'
        ||this.searchT==null) 
          return
        this.musicTable=[]  
         this.$axios({
          method: 'post',
          url:'https://localhost:5001/Music/SeachMusicName',
          params:{seachName:this.searchT,
                  seachType:this.activeName},
          dataType: "json"
        })
        .then(res=>{         
            if(res.data[0].code==='200'
              &&res.data[0].msg==="OK"){             
                 this.musicTable = res.data[0].data
                 console.log(this.musicTable)
                 this.searchInfo=`搜索
                          "<span style="color:red">${this.searchT}</span>"找到
                                单曲 <span style="color:red">${res.data[0].Total}</span> 首`
            }else{
              this.$message({
                message: `未搜索到歌曲${this.searchT}`,
                center: true
              })
            }
        })
        .catch(err=>{         
          this.$message({
                mmessage: `未搜索到歌曲${this.searchT}`,
                center: true
              })
        })  
       } ,
      handleClick(tab, event){
        this.activeName=tab.name
        this.getSeachValue()      
      },
      handleChangess(val){
       this.show=true
      },
      AddMusic(){

      },
      PlayMusic(){
        
      },
      seachBtnClick(){
         this.getSeachValue()
      }      
    }
  }
</script>

<style>
  .btnCs{
   color: red;
    margin-left: 30px;
    border: none;
     background: white;               
  }
 .seach_header{
   padding-top: 15px;
 }
  .seachInput{
    width: 660px;
  }
  .seachInput input{
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }
  input:focus{
    outline: medium;
  }
  .seachInput .el-input-group__append{
    border-bottom-right-radius: 12px;
    border-top-right-radius: 12px;
  }

  #mySeach{
    margin-top: 24px;
  }
  #mySeach .mysecah-top{
    text-align: left;
  }
  .m-tabs-srch{
    padding-top: 30px;
  }
  .m-tabs-srch div div div .el-tabs__nav-scroll div #tab-first
  ,.m-tabs-srch div div div .el-tabs__nav-scroll div #tab-second
  ,.m-tabs-srch div div div .el-tabs__nav-scroll div #tab-third{
    width: 200px;
  }
  /* .seachelTable .el-table__header-wrapper 
  {
    display: none;
  }   */

  .seachIn .el-tabs__header .el-tabs__nav-wrap .el-tabs__nav-scroll #pane-second{
    text-align: left;
    margin: auto;
    width: 1001px;
  }
  .img-block{
    width: 100px;
    margin: 21px;
    display: inline-block;
  }
  .img-info{
    width: 100px;
    margin-top:10px
  }  
  .img-info button{
    color: red;
    float: right;
    position: relative;
    top: -7px;
    border: none;
  }
  .seach_word{
    height: 60px;
  }
  .seach_word .el-image{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        line-height: 40px;
        position: relative;
        top: 8px;
        left: 60px;
    }
  .M_Name{
    display: inline-block;
    margin-left: 130px;
     width: 275px; 
    text-align: left;
  }
  .M_Author{
    /* margin-left: -55px; */
    position: relative;
    left:45px;
    display: inline-block;
    width: 350px;
    text-align: left;
  }
  .hot{
    position: relative;
    left: 925px;
    top: -52px;
    width: 60px;
  }
</style>
