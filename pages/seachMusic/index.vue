<template>
  <div>
    <div class="seach_header">
        <el-input placeholder="请输入内容" v-model="searchT" 
          class="seachInput">
          <el-button slot="append" icon="el-icon-search"></el-button>
       </el-input>
    </div>
    <div id="mySeach">
        <div class="mysecah-top" v-html="searchInfo">{{searchT}}</div>
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
              <div v-else>s</div>
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
        activeName:'first',
        tabs:[
          {name:'first',lable:'单曲'},
          {name:'second',lable:'歌手'},
          {name:'third',lable:'歌词'}         
          ],
        musicTable:[],
        searchT:'',
        searchCout:0,
        searchInfo:''//'搜索"<span style="color:red">遗失</span>"，找到 <span style="color:red">700</span> 首单曲'
      }
    },
    watch:{
      searchT:(val=>{
        console.log(this.searchT)
        searchInfo= `
           搜索"<span style="color:red">${searchT}</span>"，
           找到 <span style="color:red">${searchCout}</span> 首单曲`
        }),
      searchCout:(val=>{
         searchInfo= `
           搜索"<span style="color:red">${searchT}</span>"，
           找到 <span style="color:red">${searchCout}</span> 首单曲`
      })
    },
    filters:{
      filterM_Author(value){
        return value.slice(0,5)
      }
    },
    mounted(){
       this.getSeachValue()
    },
   methods:{
      getSeachValue(){
         this.$axios({
          method: 'post',
          url:'https://localhost:5001/Music/SeachMusicName',
          params:{seachName:this.searchT},
          dataType: "json"
        })
        .then(res=>{
            console.log(res.data)
            if(res.data[0].code==='200'&&res.data[0].msg==="OK"){
                 this.musicTable = res.data[0].data

            }else{
              this.$message({
                message: '查询数据失败',
                center: true
              })
            }
        })
        .catch(err=>{
          console.log(err)
          this.$message({
                message: '查询数据失败',
                center: true
              })
        })  
       } ,
      handleClick(tab, event){
         console.log(this.activeName)
      },
    AddMusic(){

    },
    PlayMusic(){
      
    }
   }
}
</script>

<style>
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
  .img-info .demonstration{
     /* color: red; */
  }
  .img-info button{
    color: red;
    float: right;
    position: relative;
    top: -7px;
    border: none;
  }
</style>
