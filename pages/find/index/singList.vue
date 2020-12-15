<template>
   <div>
         <!-- :data="singListS.slice((currpage - 1) *
            pagesize, currpage * pagesize)" -->
        <el-table        
            :data="showList"
            border
            :row-class-name="tableRowClassName"
            style="width: 100%;border:none">           
            <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-
                    position="left" 
                    inline 
                    class="demo-table-expand">
                     <el-form-item>
                        <el-image
                        style="width: 120px; height: 120px"
                        :src="props.row.M_Img"
                        fit="fit">
                        <div slot="error" style="font-size: 110px;" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                        </el-image>
                        <!-- <img :src="props.row.M_Img"> -->
                     </el-form-item>                   
                    <el-form-item label="歌手名称:" class="_el-form-item">
                      <span>{{ props.row.M_Author }}</span>
                    </el-form-item>
                    <el-form-item label="歌曲标题:"  class="_el-form-item">
                      <span>{{ props.row.M_Name}}</span>
                    </el-form-item>                    
                    <el-form-item label="创作时间:"  class="_el-form-item">
                      <span>{{ props.row.M_Time|filterM_Time }}</span>
                    </el-form-item>
                    <el-form-item label="热度:"  class="_el-form-item">
                      <span>{{ props.row.M_Hot}}</span>
                    </el-form-item>  
                  </el-form>
                </template>
            </el-table-column>
            <el-table-column type="index">
            </el-table-column>
            <el-table-column
                sortable 
                prop="M_Name"                 
                label="歌曲标题"
                >
              <template slot-scope="scope">
                {{scope.row.M_Name|filtersAuthor}} 
              </template>
            </el-table-column>
            <el-table-column
                sortable
                prop="M_Author"  
                label="歌手"
                >
                <template slot-scope="scope">
                  {{scope.row.M_Author|filtersAuthor}} 
                </template>               
            </el-table-column>
            <el-table-column
                label="专辑"
                prop="M_Name"
                sortable >
                <template slot-scope="scope">
                  {{scope.row.M_Name|filtersAuthor}} 
                </template>                  
            </el-table-column>
             <el-table-column align="center">
                <template slot="header">
                     <input
                      v-model="search"
                      size="mini"
                      placeholder="根据歌曲搜索"
                      style="height: 26px;
                            border-radius: 10px;
                            border: 1px solid #00c4ff;
                            text-align: inherit;"/>                                    
                  </template>
                <template slot-scope="scope">
                  <el-tooltip effect="light"
                        content="播放"
                        placement="top">
                        <el-button
                            size="mini"
                            plain circle
                            icon="el-icon-video-play"
                            @click="PlayMusic(scope.$index, singListS)">
                        </el-button>
                  </el-tooltip>
                   <el-tooltip effect="light"
                        content="暂停"
                        placement="top">
                        <el-button
                            size="mini"
                            plain circle
                            icon="el-icon-video-pause"
                            @click="StopMusic(scope.$index, singListS)">
                        </el-button>
                  </el-tooltip>
                  <el-tooltip effect="light"
                        content="添加"
                        placement="top">                        
                        <el-button
                            size="mini"
                            plain circle
                            icon="el-icon-circle-plus-outline"
                            @click="AddMusic(scope.$index, singListS)">
                        </el-button>
                  </el-tooltip>
                </template>
             </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination background
            layout="prev, pager, next, sizes, 
            total, jumper"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15]"
            :page-size="pagesize"
            :total="singListS.length"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange">
        </el-pagination>
   </div>
</template>

<script>
export default {
   props: ['GetTypeName'],
  // asyncData ({query }) {  
  //    let request1Data=params.GetTypeName  
  //    console.log(query)
  // },
  data(){
     return{
       TypeName:this.GetTypeName,
       singListS:[] ,            
       dataTable: [], // 定义一个中间变量
        pagesize: 10, // 页面条数
      currpage: 1, // 当前页  
      currentPage: 1, // 跳转页面
      search: '',      
     }
   },
     computed:{
       showList(){
          return this.singListS.slice((this.currpage - 1) *
            this.pagesize, this.currpage *this.pagesize)
       }
     },
   
   watch:{  //监听搜索框内容，当搜索框内容发生变化时调用searchResource方法
     search:{
       handler(){
          this.watchSarch()
       }
     } 
    , GetTypeName(newVal){
       console.log(newVal)
        this.TypeName = newVal
     }     
   },
   filters:{
     filtersAuthor(value){
        return value.slice(0,14)
     },
     filterM_Time(value){       
      return value.slice(0,10)       
    } 
   } , 
  mounted (){         
    this.GetMusicTypeNames()
  },
  methods:{  
    watchSarch(){ 
      this.currpage=1
        let _seach = this.search.trim();       
        this.singListS = this.dataTable.filter(data =>
        !_seach || data.M_Name.toLowerCase().includes(
          _seach.toLowerCase()))    
    },
    //搜索音乐
    GetMusicTypeNames(){ 
        if(this.TypeName==""||this.TypeName==null||this.TypeName==undefined)
          this.TypeName="热们"   
        this.$axios({
          method: 'post',
          url:'https://localhost:5001/Music/GetMusicTypeName',
          params:{typeName:this.TypeName},
          dataType: "json"
        })
        .then(res=>{
            console.log(res.data)
            if(res.data[0].code==='200'&&res.data[0].msg==="OK"){
                 this.dataTable = res.data[0].data
                 this.singListS = this.dataTable
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
    handleCurrentChange(cpage){
      this.currpage = cpage
    },
    handleSizeChange (psize) {
      console.log('==============' + psize)
      this.pagesize = psize
    },
    //停止播放
    StopMusic(index, row){
    },
    //添加列表
    AddMusic(index, row){
      
    },
    // 播放音乐
    PlayMusic(index,row){
    },
    change (e) {
      this.$forceUpdate()
    },
    // 表格状态
    tableRowClassName ({ row, rowIndex }) {
      // rowIndex:每行的行号 row：每一行的数据
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    }
  } 
}
</script>

<style>
.el-table td, .el-table th{
  /* padding: 4px; */
  background: white;
}
.el-table td, .el-table th.is-leaf{
  border: none;
}
 .demo-table-expand {
  height: 120px;
  }
  .demo-table-expand ._el-form-item {
    display: block;
    position: relative;
    top: -177px;
    left: 151px;
    margin-bottom: 0;
  }
.el-form-item__content img{
  width:120px;
  height: 120px;
  border-radius: 60px;
}
input:focus{
	outline: medium;
}
</style>