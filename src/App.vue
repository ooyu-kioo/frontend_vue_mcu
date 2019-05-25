<template>
  <div id="app">
    <el-menu
      class="menu-bar"
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router="true"
    >
      <!-- router="true"の場合、indexがrouterのpathになる -->
      <el-menu-item index="/">main-List</el-menu-item>
      <el-menu-item index="/modal-frame">modal-frame</el-menu-item>
      <el-menu-item index="/test">test</el-menu-item>
    </el-menu>

    <!-- views表示 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {
      activeIndex: "/"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
/* ページ表示時にブラウザでbodyに設定される隙間を消す */
* {
  padding: 0px;
  margin: 0px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.menu-bar {
  display: flex;
  justify-content: center;
  text-align: center;
  opacity: 0.7;
}
/* サイト全体の背景画像設定 */
html {
  background-image: url("./assets/image/background-image/grey_wash_wall.png");
}
</style>
