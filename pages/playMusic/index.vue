<template>
  <div id="palymusic_content">
     <div class="singerContent clearfix">
       <div class="album fl">
         <div class="album_image">
           <el-image :src="musicList.pic" style="width:200px;height:200px"></el-image>
         </div>
         <div class="album_text">
           <el-button round @click="DownMusic(musicList)">下载这首歌</el-button>
           <span style="color: rgba(141, 111, 111,1);">           
             外部播放此歌曲
            </span>
         </div>
       </div>
       <div class="songContent fl">
         <div class="songName clearfix">           
           <span>{{musicList.title}}</span>           
          </div>   
          <div class="albumName fl">
            <span>歌手:{{musicList.artist}}</span>
           </div>         
         <div class="music_Song" id="music_Song">
            <ul>
             <li v-for="(item,index) in result" :key="index">
                {{item.content}}
             </li>
           </ul>        
         </div>
       </div>
     </div>
  </div>
</template>

<script>
import { version } from 'moment';
import vmson from '~/store/emptyVue'
export default { 
    data(){
      return{        
        result: [], //新建一个数组存放最后结果       
        musicList:{
          artist: "清莞"
          ,pic: "http://p2.music.126.net/1-THPVfCi05CV3EORHq4eA==/42880953495560.jpg?param=100x100"
           ,src: "http://music.163.com/song/media/outer/url?id=285196.mp3"
          ,title: "千年缘"
          ,lrc: ''        
        }, 
        lineNo :0, // 当前行歌词
        preLine :1, // 当播放6行后开始滚动歌词
        lineHeight : -30, // 每次滚动的距离
      }
    },   
    mounted(){     
       this.MusicDetail()
      this.SplitMusicSong(this.$route.params.mu)
    },
  
    methods:{      
      MusicDetail(){   
          var that=this    
           vmson.$on("MusicDetail",(detail)=>{ 
               console.log(detail);           
              that.SplitMusicSong(detail)
           })
      },
      SplitMusicSong(msg){
        this.result=[] 
        if(msg==undefined){
          this.$message.error('暂无歌词');
        }
       else if(msg.lrc==''  ||msg.M_Words==''      
          ||this.musicList.lrc==null){
            this.$message.error('暂无歌词');
            this.musicList.lrc=msg.M_Words  
            this.musicList.src=msg.M_Address          
            this.musicList.artist=msg.M_Author
            this.musicList.title=msg.M_Name
            this.musicList.pic=msg.M_Img 
        }
        else{   
          console.log(msg); 
          this.musicList.lrc=msg.M_Words  
          this.musicList.src=msg.M_Address          
          this.musicList.artist=msg.M_Author
          this.musicList.title=msg.M_Name
          this.musicList.pic=msg.M_Img 
          let lyricArr = this.musicList.lrc.split('\n'); //按行分割歌词
          console.log(lyricArr)
         //遍历分割后的歌词数组，将格式化后的时间节点，
         //歌词填充到result数组         
          for (let i = 0; i < lyricArr.length; i++) {
            let playTimeArr = lyricArr[i].match(/\[\d{2}:\d{2}((\.|\:)\d{2,3})\]/g); //正则匹配播放时间
            let lineLyric = "";
            console.log(playTimeArr)
            if (lyricArr[i].split(playTimeArr).length > 0) {
              lineLyric = lyricArr[i].split(playTimeArr);
            }
            if (playTimeArr != null) {
            for (let j = 0; j < playTimeArr.length; j++) {
              let time = playTimeArr[j].substring(1, playTimeArr[j].indexOf("]")).split(":");
              //数组填充
              this.result.push({
                time: (parseInt(time[0]) * 60 + parseFloat(time[1])).toFixed(4),
                content: String(lineLyric).trim().substr(1)
              });
            }
           }
          }    
          
          this.result.forEach(e=>{
              if(e.content.trim()=='')
                this.result.splice($.inArray(e,this.result),1)
          })   
          let audio = document.querySelector('audio');
          let that=this


          audio.addEventListener("timeupdate",function(){                     
            if (that.lineNo == that.result.length) return;
            if ($("#music_Song ul li").eq(0).hasClass("active")) {
              $("#music_Song ul").css("top", "0");
            }           
            that.lineNo =that.getLineNo(audio.currentTime);
            that.highLight();
            that.lineNo++;       
          })

          audio.addEventListener("ended", function() {         
            that.lineNo = 0;
            that.highLight();
            audio.play();         
            $("#music_Song ul").css("top", "0");
        });   
      }       
      },
      getLineNo(currentTime){
        let that=this
        if (currentTime >= parseFloat(this.result[that.lineNo].time)) {
          // 快进
          for (let i = this.result.length - 1; i >= that.lineNo; i--) {
            if (currentTime >= parseFloat(this.result[i].time)) {
              return i;
              }
          }
        } else {
          // 后退
          for (let i = 0; i <= that.lineNo; i++) {
            if (currentTime <= parseFloat(this.result[i].time)) {
              return i - 1;
            }
          }
        }
      },
      highLight(){
        let that=this
        let $ul=$("#music_Song ul")
        let $li = $("#music_Song ul li")
        $li.eq(that.lineNo).addClass("active")
              .siblings().removeClass("active");
        if (that.lineNo > that.preLine) {
          $ul.stop(true, true).animate(
            { top: (that.lineNo - that.preLine) * that.lineHeight });
        }
      },

      DownMusic(music){
        this.$confirm('下载歌曲需要在音乐客户端操作', 
        '提示', {
          confirmButtonText: '打开客户端',
          cancelButtonText: '下载新版客户端',
          type: 'warning',
          customClass:'messBox'
         // center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '抱歉没有下载客户端!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '暂时没有最新的客户端'
          });          
        });
      }
    }
}
</script>

<style lang="stylus" scoped> 

  #palymusic_content{
    width:1174px;
    margin: 0 auto;
    margin-top: -19px;
    background-color :#202b2b;
    height :522px;

    .album{
      padding :60px 0 0 160px;
      background-color :#202b2b;//#3b3535;
      width :230px;

      .album_text{          
        margin-top :12px;         
        width :230px;

        button{
          padding:12px 50px;
          margin-left:12px;
          background-color :#202b2b;
          font-size :16px;
          color :white;
        }

        span{
          display :block;
          margin-top: 4px;
          margin-left: 15px;
        }
      }
    } 

    .songContent{
      position: absolute;
      margin-left: -130px;
      display :inline-block;
      width: 600px;
      min-height: 464px;
      margin-top: -285px;      
      // background :red;      
      color :white;     

      .songName{
        height : 30px;
        // background :blueviolet;
        font-size :24px;
        // text-align :left;        
      }  
      .albumName {
          margin-top :10px;
          height : 25px;
          // background :#4CAF50;
          font-size: 16px;
          // text-align :left;
          // margin-left: 95px;
          margin-top: 12px;
      }      
      .music_Song{
        width: 100%;/* 歌词显示盒子宽 */
				height: 320px;/* 歌词显示盒子高度，需要多显示几行歌词相应调大即可 */
				/* background-color:#333; */ /* 歌词背景颜色 */
				margin: 15px auto;
				color: darkgrey;/* 歌词默认颜色,灰色 */
				font-size: 12px;/* 歌词字体默认大小 */
				overflow: hidden;
				position: relative;
				font-family: "微软雅黑";
        ul {
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          list-style: none;
          li {
            width: 100%;
            height: 30px;
            line-height: 30px;
            text-align: center;           
          }
          .active {
            /* 歌词高亮滚动区 */
            color: #2dbf6e;/* 歌词滚动高亮颜色 */
            /* font-weight: bold; *//* 文本加粗，不要，太丑了！ */
            font-size: 20px; /* 歌词滚动行文字大小 */
          }
        }
      }
    }
  }
</style>
<style lang="stylus">
 .messBox{
      height : 200px;      
      .el-message-box__header{
        height: 20px;
        background-color: #2c323b;
      .el-message-box__title{
          color :white;
        }
      }
    .el-message-box__content{  
        font-size: 20px;      
        .el-message-box__container{
          margin-left: 44px;
          margin-top: 50px;       
         }        
      }
    .el-message-box__btns{
        text-align:center;
        padding:20px;
      }
    }  
</style>