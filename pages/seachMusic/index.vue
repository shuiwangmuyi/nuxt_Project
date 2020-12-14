Author: muyi <1752993763@qq.com>  2020-12-07 11:03:50
Committer: muyi <1752993763@qq.com>  2020-12-10 16:58:52
Child:  e6ae1d02e1ed4ae3756c3eb50f53596e24c13d00 (Merge branch 'master' of https://github.com/shuiwangmuyi/nuxt_Project)
Branches: master, muyi, remotes/origin/master
Follows: 
Precedes: 

    完善代码
pages/seachMusic/index.vue
<template>
  <div>
    <div class="seach_header">
        <el-input placeholder="璇疯緭鍏ュ唴瀹¹" v-model="searchT" 
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
          <el-tabs v-model="activeName" type="border-card" 
                    @tab-click="handleClick">
               <el-tab-pane v-for="tab in tabs" 
                  :key="tab.name"  
                  :label="tab.lable" 
                  :name="tab.name">
                <el-table v-if="activeName=='first'" class="seachelTable"
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
                <div class="img-block" v-else-if="activeName=='second'" v-for="img in musicTable" :key="img.M_Id">
                      <el-image
                        style="width: 100px; height: 100px"
                        :src="img.M_Img"
                        fit="fit"></el-image>
                        <div class="img-info">
                          <span class="demonstration">{{ img.M_Author|filterM_Author }}</span>
                           <el-button icon="el-icon-delete" circle></el-button>
                        </div>
                </div>
              <div v-else>                
                  <!-- <el-collapse accordion>  -->
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
                          <div class="M_Author">{{col.M_Author|filterM_Authors}}</div>
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
            </el-tab-pane>
          </el-tabs>
        </div>
    </div>
  </div>
</template>

<script>
export default {
   asyncData ({ params}) {
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
          {name:'third',lable:'歌词'}         
          ],
          seach_word:'',
        musicTable:[],     
        searchCout:0,
        searchInfo:''
               
     }
    },
    watch:{
      
    },
    filters:{
      filterM_Author(value){      
        return value.slice(0,3).split('/')[0]
      } ,  
      filterM_Authors(value){ 
          return value.slice(0,15).split('/')[0]
      } 
    },
    // created(){
    //   this.searchT=this.$route.params.seactText
    // },
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
         this.$axios({
          method: 'post',
          url:'https://localhost:5001/Music/SeachMusicName',
          params:{seachName:this.searchT},
          dataType: "json"
        })
        .then(res=>{
           // console.log(res.data)
            if(res.data[0].code==='200'&&res.data[0].msg==="OK"){
                 this.musicTable = res.data[0].data
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
          console.log(err)
          this.$message({
                mmessage: `未搜索到歌曲${this.searchT}`,
                center: true
              })
        })  
       } ,
      handleClick(tab, event){
        
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
  .seachelTable .el-table__header-wrapper 
  {
    display: none;
  }  

  #pane-second{
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
