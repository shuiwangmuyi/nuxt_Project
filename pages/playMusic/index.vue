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
export default { 
    data(){
      return{        
        result: [], //新建一个数组存放最后结果       
        musicList:{
          artist: "清莞"
          ,pic: "http://p2.music.126.net/1-THPVfCi05CV3EORHq4eA==/42880953495560.jpg?param=100x100"
           ,src: "http://music.163.com/song/media/outer/url?id=285196.mp3"
          ,title: "千年缘"
          ,lrc: `﻿[id:$00000000]
                            [ar:张韶涵]
                            [ti:淋雨一直走]
                            [by:]
                            [hash:0c3a63a0ae3f89cc5bd29c10f80aac96]
                            [al:]
                            [sign:]
                            [qq:]
                            [total:204956]
                            [offset:0]
                            [00:00.03]张韶涵 - 淋雨一直走
                            [00:00.75]作词：姚若龙
                            [00:00.96]作曲：Hermanni Kovalainen、Ilanguaq Lumholt、Henrik Tala
                            [00:02.09]Oh
                            [00:04.31]人都应该有梦
                            [00:07.02]有梦就别怕痛
                            [00:11.50]有雷声在轰不停
                            [00:14.06]雨泼进眼里看不清
                            [00:16.65]谁急速狂飙
                            [00:18.01]溅我一身
                            [00:19.48]的泥泞
                            [00:21.75]很确定我想去哪里
                            [00:24.28]往天堂要跳过地狱
                            [00:26.70]也不恐惧
                            [00:28.21]不逃避
                            [00:30.23]这不是脾气
                            [00:32.65]是所谓志气
                            [00:35.23]与勇气
                            [00:36.39]你能推我下悬崖
                            [00:39.02]我能学会飞行
                            [00:40.89]从不听
                            [00:43.17]谁的命令
                            [00:45.45]很独立
                            [00:46.66]耳朵用来听自己的心灵
                            [00:51.21]淋雨一直走
                            [00:53.69]是一颗宝石就该闪烁
                            [00:56.88]人都应该有梦
                            [00:58.46]Oh
                            [00:59.38]有梦就别怕痛
                            [01:01.40]淋雨一直走
                            [01:03.93]是道阳光就该暖和
                            [01:07.02]人都应该有梦
                            [01:08.74]Oh
                            [01:09.60]有梦就别怕痛
                            [01:15.38]有前面盘旋的秃鹰
                            [01:17.77]有背后尖酸的耳语
                            [01:20.36]黑色的童话
                            [01:21.82]是给长大
                            [01:23.44]的洗礼
                            [01:25.60]要独特才是流行
                            [01:27.93]无法复制的自己
                            [01:30.56]让我连受伤
                            [01:32.03]也有型
                            [01:34.05]这不是脾气
                            [01:36.48]是所谓志气
                            [01:39.07]与勇气
                            [01:40.28]你能推我下悬崖
                            [01:42.86]我能学会飞行
                            [01:44.78]从不听
                            [01:47.01]谁的命令
                            [01:49.34]很独立
                            [01:50.50]耳朵用来听自己的心灵
                            [01:55.05]淋雨一直走
                            [01:57.47]是一颗宝石就该闪烁
                            [02:00.66]人都应该有梦
                            [02:02.33]Oh
                            [02:03.19]有梦就别怕痛
                            [02:05.27]淋雨一直走
                            [02:07.74]是道阳光就该暖和
                            [02:10.98]人都应该有梦
                            [02:12.60]Oh
                            [02:13.45]有梦就别怕痛
                            [02:16.52]有时掉进黑洞
                            [02:19.23]有时候爬上彩虹
                            [02:21.70]在下一秒钟
                            [02:22.87]命运如何转动
                            [02:24.14]没有人会晓得
                            [02:25.46]Oh
                            [02:26.78]我说希望无穷
                            [02:29.20]你猜美梦成空
                            [02:31.80]相信和怀疑
                            [02:33.37]总要决斗
                            [02:38.47]淋雨一直走
                            [02:40.95]是一颗宝石就该闪烁
                            [02:44.08]人都应该有梦
                            [02:45.76]Oh
                            [02:46.62]有梦就别怕痛
                            [02:48.70]淋雨一直走
                            [02:51.18]是道阳光就该暖和
                            [02:54.36]人都应该有梦
                            [02:55.92]Oh
                            [02:56.79]有梦就别怕痛
                            [02:58.87]淋雨一直走
                            [03:01.34]是一颗宝石就该闪烁
                            [03:04.48]人都应该有梦
                            [03:06.14]Oh
                            [03:07.07]有梦就别怕痛
                            [03:09.03]淋雨一直走
                            [03:11.56]是道阳光就该暖和
                            [03:14.74]人都应该有梦
                            [03:16.31]Oh
                            [03:17.22]有梦就别怕痛
                            `,                     
        }, 
        lineNo :0, // 当前行歌词
        preLine :1, // 当播放6行后开始滚动歌词
        lineHeight : -30, // 每次滚动的距离
      }
    },  
    mounted(){     
      this.SplitMusicSong(this.$route.params.mu)
    },
    methods:{
      SplitMusicSong(msg){ 
        // console.log(msg)                  
        if(msg==undefined||msg.lrc==''        
          ||this.musicList.lrc==null){
            this.$message.error('暂无歌词');
        }
        else{  
          
          this.musicList.lrc=msg.M_Words
          this.musicList.src=msg.M_Address          
          this.musicList.artist=msg.M_Author
          this.musicList.title=msg.M_Name
          this.musicList.pic=msg.M_Img
          let lyricArr = this.musicList.lrc.split('\n'); //按行分割歌词
          //遍历分割后的歌词数组，将格式化后的时间节点，歌词填充到result数组
          for (let i = 0; i < lyricArr.length; i++) {
            let playTimeArr = lyricArr[i].match(/\[\d{2}:\d{2}((\.|\:)\d{2})\]/g); //正则匹配播放时间
            let lineLyric = "";
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
          
          // console.log(this.result)
          //  let $ul = $("<ul></ul>");
          // for (let i = 0; i < this.result.length; i++) {
          //   let $li = $("<li></li>").text(this.result[i].content);
          //   $ul.append($li);
          // }
          //   $("#music_Song").append($ul);

          // let lineNo = 0; // 当前行歌词
          // let preLine =1; // 当播放6行后开始滚动歌词
          // let lineHeight = -30; // 每次滚动的距离
         // this.highLight(lineNo,preLine,lineHeight)// 滚动播放 歌词高亮  增加类名active 
          let audio = document.querySelector('audio');
          let that=this

          audio.addEventListener("timeupdate",function(){ 
            //console.log($("#music_Song ul li"))           
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
        font-size :26px;
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