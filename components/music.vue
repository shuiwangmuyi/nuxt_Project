<template>
  <div class="play">
    <aplayer autoplay :music="musicList" v-if="flag" ref="aplayer"> </aplayer>
  </div>
</template>
<script>
import Aplayer from "vue-aplayer";
export default {
  components: {
    Aplayer,
  },
  data() {
    return {
      flag: false,
      loopMode: "all",
      foat: true, //知否浮窗
      musicList: {
        artist: "",
        pic:
          "http://p2.music.126.net/1-THPVfCi05CV3EORHq4eA==/42880953495560.jpg?param=100x100",
        src: "",
        title: "",
      }, //当前播放的音乐
    };
  },
  async mounted() {
    this.init();
    // let aplayer = this.$refs.player.control;
    // aplayer.play();
  },
  methods: {
    init() {
      this.flag = true;
      this.musicList.artist = "清莞";
      this.musicList.pic =
        "http://p2.music.126.net/1-THPVfCi05CV3EORHq4eA==/42880953495560.jpg?param=100x100";
      this.musicList.src =
        "http://music.163.com/song/media/outer/url?id=285196.mp3";
      this.musicList.title = "千年缘";
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
