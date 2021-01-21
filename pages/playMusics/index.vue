<template>
    <div>        
        <aplayer 
          autoplay 
          :float="foat"
          :shuffle="shuffle"
          :repeat="repeat[1]"
          mode="circulation"
          listMaxHeight="500"
          :listFolded="listFolded"
          :music="musicList[0]"
          :mutex="mutex"
          v-if="flag" 
          :list="musicList" :showlrc="true"
          ref="aplayer"> 
        </aplayer>             
    </div>
</template>
<style>

</style>
<script>    
    import Aplayer from 'vue-aplayer'
    export default {
        components:{          
            Aplayer,
        },  
        data() {
            return { 
                mutex:true,
                shuffle:false,
                repeat:['repeat-one','repeat-all','no-repeat'],//轮播模式。值可以是’repeat-one’（单曲循环）‘repeat-all’（循环列表）或者’no-repeat’（不循环）。
                flag:false,
                listFolded:true,              
                loopMode :'all',           
                foat:true,//浮窗               
                musicList:[{
                    artist: "清or莞"
                    ,pic: "http://p2.music.126.net/1-THPVfCi05CV3EORHq4eA==/42880953495560.jpg?param=100x100"
                    ,src: "http://music.163.com/song/media/outer/url?id=285196.mp3"
                    ,title: "千年缘"
                }], //当前播放的音乐 
                ListMusic:[
                    {
                    artist: "清莞"
                    ,pic: "http://p2.music.126.net/1-THPVfCi05CV3EORHq4eA==/42880953495560.jpg?param=100x100"
                    ,src: "http://music.163.com/song/media/outer/url?id=285196.mp3"
                    ,title: "千年缘"
                    }
                ]
            }
        },        
        async mounted (){ 
           await this.init()
           console.log(this.$refs.player)
        },  
        methods:{
          async init(){
                this.flag=true
                let audio=[
                    {
                        title:'天空之城',
                        artist: '黄叶',
                        url: 'https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/%E5%A4%A9%E7%A9%BA%E4%B9%8B%E5%9F%8E.m4a',
                        pic: 'https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/QQ%E5%9B%BE%E7%89%8720200713203148.jpg',
                        lrc: '[00:00.00] (,,•́ . •̀,,) 刚刚开始学钢琴弹的hhhh',
                    },
                    {
                        title:'蒲空英的约定',
                        artist: '黄叶',
                        url: 'https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/%E8%92%B2%E5%85%AC%E8%8B%B1%E7%9A%84%E7%BA%A6%E5%AE%9A.m4a',
                        pic: "https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/QQ%E5%9B%BE%E7%89%8720200713203148.jpg" ,
                        lrc: '[00:00.00] (,,•́ . •̀,,) 刚刚开始学钢琴弹的hhhh',
                    },
                    {
                        title:'无畏',
                        artist: '马頔',
                        url: 'https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/%E9%A9%AC%E9%A0%94%20-%20%E6%97%A0%E7%95%8F.flac',
                        pic: 'https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/%E4%BB%A5%E5%AE%B6%E4%B9%8B%E5%90%8D.jpg', // prettier-ignore
                        lrc: '[00:00.00] (,,•́ . •̀,,) 抱歉，当前歌曲暂无歌词',
                    },
                    {
                        title:'蓝乐',
                        artist: '白纸',
                        url: 'https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/%E8%93%9D%E4%B9%90%20-%20%E7%99%BD%E7%BA%B8.flac',
                        pic: "https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/-1992181439.jpg" ,
                        lrc: '[00:00.00] (,,•́ . •̀,,) 抱歉，当前歌曲暂无歌词',
                    },
                    {
                        title:'淋雨一直走',
                        artist: '张韶涵',
                        url: 'https://webfs.yun.kugou.com/202012171002/7771ea3a976da8a2592cba75cb71cd73/G205/M05/1E/05/rZQEAF5O3gaAWdYtADJW0bqXNsE974.mp3',
                        pic: "https://imge.kugou.com/stdmusic/20200812/20200812151444109252.jpg" ,
                        lrc: `﻿[id:$00000000]
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
                    }
                ]
                this.musicList=[...this.musicList,...audio]
            }, 
        }     
    }
</script>