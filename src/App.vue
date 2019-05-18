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
      <el-menu-item index="/">main-List</el-menu-item>
      <el-menu-item index="/about">about</el-menu-item>
      <el-menu-item index="/home">Home</el-menu-item>
      <el-menu-item index="/modal-frame">modal-frame</el-menu-item>
    </el-menu>

    <!-- views表示 -->
    <router-view></router-view>
  </div>
</template>



<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloWorld
  },
  data() {
    return {
      activeIndex: "1"
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
}
html {
  background-image: url("./assets/background-image/mosaic.png");
}
</style>
