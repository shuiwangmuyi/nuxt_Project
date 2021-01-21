<template>
  <div>
    <div class="header">
      <div class="header_content">
        <div class="header-left">
          <el-image :src="imgpath" fit="fit" class="image"> </el-image>
        </div>
        <div class="header_input" style="">
          <el-input
            placeholder="请输入内容"
            v-model="searchText"
            @keyup.enter.native="searchClick"
            class="secahInput"
          >
            <i
              slot="prefix"
              @click="searchClick"
              class="el-input__icon el-icon-search"
            ></i>
          </el-input>
        </div>
        <!-- 右边登录等 -->
        <div class="header-right">
          <div class="logo" @click="Sign_IN">登录</div>
          <div class="control" @click="Sign_Up">注册</div>
          <div class="user" v-show="false">user</div>
        </div>
      </div>
    </div>
    <div class="wrap">
      <el-menu
        mode="horizontal"
        router
        style="height: 0px"
        :default-active="activeIndex"
      >
        <el-menu-item
          v-for="Subnav in SubnavList"
          :key="Subnav.id"
          @select="handleSelect"
          :index="Subnav.path"
        >
          <span slot="title">{{ Subnav.discover }}</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "find",
      // imgpath:require('../../assets/img/logo.jpg'),
      imgpath: require("../assets/img/ICOImg/kongbudianyingkulou.png"),
      //imgpath:require('../static/ICOImg/kongbudianyingkulou.png'),
      SubnavList: [],
      searchText: "",
    };
  },

  mounted() {
    this.getMusicSubnav();
  },
  methods: {
    Sign_IN() {
      this.$emit("func", "first");
    },
    Sign_Up() {
      this.$emit("func", "second");
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    getMusicSubnav() {
      this.$axios({
        method: "post",
        url: "https://localhost:5001/MusicType/GetMusictypeSubnav",
        dataType: "json",
      }).then((res) => {
        if (res.data[0].code === "200" && res.data[0].msg === "OK") {
          this.SubnavList = res.data[0].data;
          this.activeIndex = "find";
          console.log(this.SubnavList);
        }
      });
    },
    searchClick() {
      //  this.$router.push({ path: '/seachMusic',
      //   query:{seactText: this.searchText}})
      this.$router.push({
        name: "seachMusic",
        params: { seactText: this.searchText },
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.header {
  width: 100%;
  margin: 0 auto;

  .header_content {
    height: 70px;

    .header-left {
      width: 180px;
      text-align: center;

      .image {
        width: 200px;
        height: 60px;
        line-height: 60px;
        padding: 5px;
        float: left;
      }
    }

    .header_input {
      width: 700px;
      height: 60px;
      margin-left: 220px;
      position: relative;
      text-align: center;
      line-height: 60px;
      top: 0px;

      .secahInput {
        width: 200px;
      }
    }

    .header-right {
      width: 100px;
      right: 50px;
      position: absolute;
      line-height: 60px;
      height: 60px;
      text-align: center;
      top: 0px;
      .logo, .control, .user {
        display: inline-block;
        margin-right: 5px;
      }
    }
  }
}

.wrap {
  width: 100%;
  height: 60px;
  background: aliceblue;

  .el-menu.el-menu--horizontal {
    border-bottom: none;
    .el-menu-item{
      font-size 16px
    }
    .el-menu-item:hover{
      background #007ACC
      color #fff
      border-radius 10px
    }
    .is-active{
      background #fff
      border-bottom 3px solid #007acc
      color #007acc
    }
  }
}

</style>