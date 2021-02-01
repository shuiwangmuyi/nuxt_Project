<template>
  <div class="play">
    <aplayer 
        autoplay 
        :float="float"
        :music="musicList" 
        :list="musicList_"
        :shuffle="shuffle"
        mode="circulation"        
        :listFolded="listFolded"
        :showlrc="false"
        :mutex="mutex"
        :repeat="repeat[0]"
        v-if="flag"   
        listMaxHeight='100'      
        @playing="Onplaying" 
        @pause="OnStopPlay"     
        ref="player"> 
    </aplayer>
  </div>
</template>
<script>
import Aplayer from "vue-aplayer";
import vmson from '~/store/emptyVue'
import {mapState, mapMutations} from 'vuex'



export default {
  components: {
    Aplayer,
  },
  data() {
    return {
      float:true,//是否可以拖动播放器
      mutex:true,//播放是是否暂停其他播放器
      listFolded:true,
      repeat:['repeat-all','repeat-one','no-repeat'],//轮播模式。值可以是’repeat-one’（单曲循环）‘repeat-all’（循环列表）或者’no-repeat’（不循环）。
      flag: false,
      shuffle:true,//随机播放
      loopMode: "all",
      foat: true, //知否浮窗
      musicList_:[],        
      list:[],
      musicList: {
        artist: "",
        pic:
          "http://p2.music.126.net/1-THPVfCi05CV3EORHq4eA==/42880953495560.jpg?param=100x100",
        src: "",
        title: "",        
      }, //当前播放的音乐    
    //  textList:[]
    };
  },  
   mounted() {//async
    this.MusicMethods()    
    this.init();
    // let aplayer = this.$refs.player.control;
    // aplayer.play();
  },
  watch:{
    immediate: true,
    deep:true, //深度监听设置为 true   
    musicList_:{ //监听的对象
      handler:function(newV,oldV){       
      },
      immediate: true,  // 首次监听
      deep: true, //深度监听设置为 true
    }   
  },
  methods: {  
    MusicMethods(){
      var _this=this
        vmson.$on("MusicMethods",(status,msg)=>{
          if(status===0){//stop
              this.OnStopPlay(msg)
          }           
          else if(status===1){//play
              this.playMusicIng(msg)
          }
          else{//add          
            this.AddMusic(msg)
          }
        })
    } ,
    AddMusic(msg){    
      var list_=[{artist:'',pic:'',src:'',title:''}]      
      list_[0].artist=msg.M_Author
      list_[0].pic =msg.M_Img
      list_[0].src=msg.M_Address
      list_[0].title=msg.M_Name
      list_[0].lrc=msg.M_Words
      this.list=list_    
      this.musicList_=[...this.musicList_,...this.list]  
    },
    //播放当前歌曲
    playMusicIng(msg){       

      const L=JSON.parse(JSON.stringify(this.musicList_));       
      this.musicList.artist=msg.M_Author
      this.musicList.pic =msg.M_Img
      this.musicList.src=msg.M_Address      
      this.musicList.title=msg.M_Name  
      console.log('sssssssssssssssssss')
        console.log(msg)
      $("audio").attr('src',msg.M_Address)  
      this.musicList_=[this.musicList,...L] 
      this.$router.push({ name: 'playMusic', 
           params:{mu:msg}})   
      this.$refs.player.play()
    },
    //播放
    Onplaying(){  
        let mm={}
        mm.M_Words=this.$refs.player.currentMusic.lrc
        mm.M_Address=this.$refs.player.currentMusic.src
        mm.M_Author=this.$refs.player.currentMusic.artist
        mm.M_Name=this.$refs.player.currentMusic.title
        mm.M_Img=this.$refs.player.currentMusic.pic     
      //  this.$router.push({ name: 'playMusic', 
      //       params:{mu:mm}})  
       vmson.$emit('MusicDetail',mm)
      
       this.$refs.player.play()      
      // this.$emit('ParseFun',this.$refs.player.currentMusic);
    },
    //停止播放
    OnStopPlay(msg){     
     if(this.musicList.artist==msg.M_Author
          &&this.musicList.title==msg.M_Name)
      {      
        this.$refs.player.pause()
      }      
    },
    init() {         
      this.flag = true;
      this.musicList.artist = "清莞";
      this.musicList.pic =
        "http://p2.music.126.net/1-THPVfCi05CV3EORHq4eA==/42880953495560.jpg?param=100x100";
      this.musicList.src =
        "http://music.163.com/song/media/outer/url?id=285196.mp3";
      this.musicList.title = "千年缘";
      this.musicList.lrc='';
       this.musicList_=[this.musicList,...this.musicList_]


        var play=$('.play .aplayer')
        console.log(play)
         let $li=`<div class="btn-left-right">
         <el-button class="btn-left" icon="el-icon-caret-left" circle></el-button>
         <el-button class="btn-right" icon="el-icon-caret-right" circle></el-button>
         </div>`
        play.append($li);
       
    },
  },
};
</script>

<style lang="stylus" scoped>
.play{
    width 1200px
    position fixed
    bottom 0
    margin 0 auto
    z-index 999
    .aplayer{
      margin 0    
    }
  }
</style>
<style>
  /* .aplayer-list{
    width: 400px;  
    float: right;
    margin-top: -50px; */
  /* } */
</style>
