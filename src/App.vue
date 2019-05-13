<template>
  <div id="app">
    <el-menu class="menu-bar" :default-active="activeIndex" mode="horizontal" router=true>
      <el-menu-item index="/">main-List
        <!-- <router-link to="/">Home</router-link> -->
      </el-menu-item>
      <el-menu-item index="/about">about
        <!-- <router-link to="about">About</router-link> -->
      </el-menu-item>
      <el-menu-item index="/home">Home
        <!-- <router-link to="main-list">MainList</router-link> -->
      </el-menu-item>
      <el-menu-item index="/test">test
        <!-- <router-link to="test">test</router-link> -->
      </el-menu-item>
    </el-menu>
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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.menu-bar{
  display:inline-block
}
</style>
