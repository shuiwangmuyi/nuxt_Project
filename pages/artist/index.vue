<template>
   <div class="top clear_fix">
        <el-tabs v-model="activeName" @tab-click="handleClick">
             <el-tab-pane v-for="(SingerList,index) in SingerLists"
              :key="index" 
              :label="SingerList.SingerClass"
              :name="SingerList.SingerClass">
                <div class="block" 
                    v-for="songer in SongerList"
                    :key="songer.SingerId">                
                    <nuxt-link :to=" '/SongerInfo?SingerId=' + songer.SingerId ">
                        <div style="height:105px">
                            <el-image
                                style="width: 100px; height: 100px"
                                :src="songer.SingerImg"
                                fit="fit">
                            </el-image>
                            <i class="pai">{{songer.SingeRanking}}<em>ST</em></i>
                        </div>
                        <div class="_block">
                            <span class="demonstration">
                                {{ songer.SingerName|filterSingerName}}
                            </span>
                        </div> 
                    </nuxt-link>             
                </div>             
             </el-tab-pane>            
        </el-tabs>
    </div>
</template>

<script>
export default {
 data(){
     return{
        activeName: '',
        SingerLists:[], 
        SongerList:[]       
     }
 },
 created(){
    this.GetNameId(10004)    
 },
 mounted(){
     //console.log(this.activeName)
     this.GetMusicSingerId("a");
 },
 filters:{
     filterSingMame(value){
         if(value.length>=3)
             return value.slice(0,1)
         return value.slice(0,2)
     },
    filterSingerName(value){
        if(value.length>=4)
            return value.slice(0,5);
        return value
    }
 },
 methods:{
     GetNameId(id){
       this.$axios({
            method: 'post',
            url:'https://localhost:5001/MusicType/GetNameId',
            params:{id:id},
            dataType: "json"
            }).then(res => {          
            // /console.log(res.data)         
            if(res.data[0].code==='200'&&res.data[0].msg==="OK"){
                this.SingerLists=res.data[0].data        
                this.activeName=  res.data[0].data[0].SingerClass; 
                //this.SingerLists.push("SingerClass","热门") 
                this.$set(this.SingerLists,
                        this.SingerLists.length,
                        {"SingerClass":"热门"})
                //console.log(this.SingerLists)
           }              
        }) 
     },

     GetMusicSingerId(SingerClass){      
        this.$axios({
            method: 'post',
            url:'https://localhost:5001/MusicType/GetMusicSingerId',
            params:{SingerClass:SingerClass},
            dataType: "json"
            }).then(res => {          
           //console.log(res.data)         
            if(res.data[0].code==='200'&&res.data[0].msg==="OK"){
                this.SongerList=res.data[0].data    
            }              
        }) 
     },
     handleClick(tab, event) {       
      //  console.log(tab);
        this.GetMusicSingerId(tab.name)
      }
 }
}
</script>

<style>
.top .el-tabs .el-tabs__content .el-tab-pane{
    text-align: left;
}
.block{
    width: 100px;
    height: 140px;
    padding: 5px 10px;
    display: inline-block;
    text-align: center;
}
.block a{
    text-decoration: none;
    color: cadetblue;
}
.block div i{
    font: italic 700 16px/18px Verdana;
    font-family: Verdana,Geneva,sans-serif;
    font-size: 16px;
    display: block;
    color: white;
    position: relative;
    top: -27px;
    left: -12px;
    width: 63px;
    height: 22px;
    padding-left: 5px;
    filter: progid:DXImageTransform.Microsoft.gradient(GradientType='1',enabled='true',startColorstr='#66000000',endColorstr='#00FFFFFF');
    background: -webkit-linear-gradient(left,rgba(0,0,0,.4) 0%,rgba(255,255,255,0) 100%);
    background: -moz-linear-gradient(left,rgba(0,0,0,.4) 0%,rgba(255,255,255,0) 100%);
}
._block{
    position: relative;
    padding: 4px;
}
</style>