<template>
  <div class="musicTopList">
    <div class="table_title">
      <h1>歌曲列表</h1>
      <span class="span_count">{{musiCount}}<em class="span_text">首歌</em></span>
    </div>
    <el-table style="width:100%;" :data="topMusicList" row-key="M_Id" >
      <el-table-column label="" width="80">
        <template>
           <el-button @click="PlayMusic(list)" icon="el-icon-video-play" circle></el-button>
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          <div class="title_content">
            <el-image class="title_img" :src="`${scope.row.M_Img}`" fit="fit"></el-image>
            <span class="title_text">{{scope.row.M_Name}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="歌手" width="200" prop="M_Author"></el-table-column>
      <el-table-column label="热度" width="200" prop="M_Hot"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      musiCount: 0,
      topMusicList:[]
    };
  },
  mounted() {
    this.GetTopList();
  },
  methods: {
    GetTopList() {
      this.$axios({
        method: "post",
        url: "https://localhost:5001/Music/GetMusicHotName",
        dataType: "json",
      }).then((res) => {
        if (res.data[0].code === "200" && res.data[0].msg === "OK") {
          this.topMusicList = res.data[0].data;
          this.musiCount = res.data[0].Total;
          console.log(this.topMusicList);
        }
      });
    },
    PlayMusic(list) {
      console.log(list);
    },
  },
};
</script>
<style lang="stylus" scoped>
.musicTopList{
  .table_title{
    text-align:left;
    height:60px;
    width: 100%;
    display: inline-block;
    line-height: 60px;
    h1{
      font-size: xx-large;
      float:left;
      width:80%
    }
    .span_count{
      color: red;
      .span_text{
        color:black;
      }
    }
  }
  .el-table{
    margin-top:20px;
    /deep/ thead{
      color #909399
      font-size 18px
      font-weight bold
    }
    /deep/ td, /deep/ th.is-leaf{
      border none
    }
    .title_content{
      width 100%
      height 100%
      .title_img{
        width 50px
        height 50px
        float left
        border-radius 50%
      }
      .title_text{
        display inline-block
        line-height 50px
        margin-left 20px
      }
    }
  }
  .el-table::before{
    background none
  }
}
</style>
