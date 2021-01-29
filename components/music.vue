<template>
  <div class="play">
    <aplayer 
        autoplay 
        :music="musicList" 
        :list="musicList_"
        shuffle="shuffle"
        mode="circulation"        
        :listFolded="listFolded"
        :showlrc="false"
        :mutex="mutex"
        v-if="flag"         
        @playing="Onplaying" 
        @pause="OnStopPlay"     
        ref="player"> 
    </aplayer>
  </div>
</template>
<script>
import Aplayer from "vue-aplayer";
import vmson from '~/store/emptyVue'
export default {
  components: {
    Aplayer,
  },
  data() {
    return {
      mutex:true,
      listFolded:true,
      repeat:['repeat-one','repeat-all','no-repeat'],//轮播模式。值可以是’repeat-one’（单曲循环）‘repeat-all’（循环列表）或者’no-repeat’（不循环）。
      flag: false,
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
  
  async mounted() {
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
        console.log('newVal:', newV)
        console.log('oldV:', oldV)
      },
      immediate: true,  // 首次监听
      deep: true, //深度监听设置为 true
    },
    // textList(newV,oldV){ //监听的对象 
    //     console.log('watch中：newV',newV)     
    //     console.log('watch中：oldV',oldV)     
    //     this._musicList=this.textList
    //     console.log(this._musicList)
    // }
  },
  methods: {  
    MusicMethods(msg){
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
      console.log(this.list)
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
      $("audio").attr('src',msg.M_Address)  
      this.musicList_=[this.musicList,...L] 
      this.$router.push({ name: 'playMusic', 
           params:{mu:msg}})   
      this.$refs.player.play()

    },
    //播放
    Onplaying(){   
       console.log(this.$refs.player.currentMusic)      
       let mm={}
        mm.M_Words=this.$refs.player.currentMusic.lrc
        mm.M_Address=this.$refs.player.currentMusic.src
        mm.M_Author=this.$refs.player.currentMusic.artist
        mm.M_Name=this.$refs.player.currentMusic.title
        mm.M_Img=this.$refs.player.currentMusic.pic
       console.log("__________________")
       console.log(mm)
       console.log("__________________")
       this.$router.push({ name: 'playMusic', 
            params:{mu:mm}}) 
       this.$refs.player.play()         
      // console.log( this.$refs.player.currentMusic);//获取当前音乐
      // this.$emit('ParseFun',this.$refs.player.currentMusic);
    },
    //停止播放
    OnStopPlay(msg){     
     if(this.musicList.artist==msg.M_Author
          &&this.musicList.title==msg.M_Name)
      {
        console.log("停止播放")
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
