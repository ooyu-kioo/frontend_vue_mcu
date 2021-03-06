<template>
  <div class="main-list">
    <!-- Artistのフィルターメニュー -->
    <el-menu
      class="menu-bar"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router="true"
    >
      <el-submenu popper-class="el-submenu" v-if="!isNews">
        <template slot="title">filter Artist</template>
        <!-- クリックで呼び出すfilter()に引数を渡せる -->
        <el-menu-item @click="unfilterArtist" id="unfiltered">Unfiltered</el-menu-item>
        <el-menu-item @click="filterArtist('[Alexandros]')">[Alexandros]</el-menu-item>
        <el-menu-item @click="filterArtist('cinema staff')">cinema staff</el-menu-item>
        <el-menu-item @click="filterArtist('Hello Sleep Walkers')">Hello Sleep Walkers</el-menu-item>
        <el-menu-item @click="filterArtist('ReoNa')">ReoNa</el-menu-item>
        <el-menu-item @click="filterArtist('UVERworld')">UVERworld</el-menu-item>
        <el-menu-item @click="filterArtist('凛として時雨')">凛として時雨</el-menu-item>
        <el-menu-item @click="filterArtist('ヨルシカ')">ヨルシカ</el-menu-item>
      </el-submenu>
      <el-menu-item @click="showRelease" v-if="isNews">artist Info</el-menu-item>
      <el-menu-item @click="showRelease">release Info</el-menu-item>
    </el-menu>

    <!-- api読み込み時のloading -->
    <div class="loading" v-if="isLoading"></div>
    <!-- infomationカード(loadingがfalseで表示) -->
    <template v-if="!isLoading && isInfomation">
      <div class="container">
        <transition-group tag="ul" name="list" class="listArea" appear>
          <li
            class="list"
            v-for="result in results"
            :key="result.id"
            @click="transition(result.info_body_link)"
          >
            <el-card class="el-card" :body-style="{padding:'0px'}" shadow="hover">
              <!-- imgソースを動的に組み立て -->
              <img
                class="image"
                :src="require('./../assets/image/artist-image/' + result.artist_name + '.png')"
                alt="No Image"
              />
              <div style="padding: 10px;">
                <div>
                  <strong>{{ result.artist_name }}</strong>
                </div>
                <div></div>
                <div>{{ result.info_title }}</div>
                <div class="created_at">
                  <strong class="info_label">{{ result.info_label }}</strong>
                  <span>{{ result.created_at }}</span>
                </div>
              </div>
            </el-card>
          </li>
        </transition-group>
      </div>
    </template>

    <!-- release infoカード() -->
    <template v-if="!isLoading && isRelease">
      <div class="container">
        <transition-group tag="ul" name="list" class="listArea-release">
          <li
            class="list"
            v-for="release in releases"
            :key="release.id"
            @click="transition(release.buy_url)"
          >
            <el-card class="el-card" :body-style="{padding:'0px'}" shadow="hover">
              <img
                class="image"
                :src="require('./../assets/image/artist-image/' + release.artist_name + '.png')"
                alt="No Image"
              />
              <div>
                <strong>{{ release.artist_name }}</strong>
              </div>
              <div>{{ release.release_title }}</div>
              <div>{{ release.release_date }}</div>
            </el-card>
          </li>
        </transition-group>
      </div>
    </template>
    <!--  -->
    <!--  -->
  </div>
</template>

<script src="vue.js"></script>
<script>
import axios from "axios";
//
export default {
  name: "mainList",
  components: {},
  // 表示データの宣言・初期値設定(APIでデータ受け取ってから処理するからnull)
  data() {
    return {
      // Infomation格納用(allResults=filter用のマスタデータ)
      results: null,
      allResults: null,
      // releaseInfo格納用
      releases: null,
      // 表示切り替え
      isLoading: true, // loading
      isInfomation: false, // infomation
      isRelease: false, // release info
      // menuBarのボタン表示切り替え
      isNews: false
    };
  },
  // vueインスタンス生成時に実行する処理を記載(createdと速度差あり)
  mounted() {
    this.searchApi();
  },
  methods: {
    // API通信
    searchApi() {
      axios
        .get(
          "https://django-vue-mcu.herokuapp.com/api/v1/infomation/?format=json"
        )
        .then(response => {
          this.results = response.data;
          this.allResults = response.data;
          this.isLoading = !this.isLoading; // loadingアニメーション表示切り替え
          this.isInfomation = !this.isInfomation; // infomation表示
        });

      axios
        .get(
          "https://django-vue-mcu.herokuapp.com/api/v1/releaseInfo/?format=json"
        )
        .then(response => {
          this.releases = response.data;
        });
    },
    // 全アーティスト表示
    unfilterArtist() {
      this.results = this.allResults;
    },
    // アーティスト毎にフィルター
    filterArtist(artist) {
      this.results = this.allResults.filter(
        result => result.artist_name === artist
      );
    },
    // info詳細：外部ページへの遷移
    transition(link) {
      // window.location.href = link; // 同一ページ遷移
      window.open(link, "_blank"); // 別タブ遷移
    },
    // relase info表示切り替え
    showRelease() {
      this.isInfomation = !this.isInfomation;
      this.isRelease = !this.isRelease;
      this.isNews = !this.isNews;
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>


<style scoped>
@import "./../assets/css/loading.css";

* {
  box-sizing: border-box;
} /* 全要素に対してpadding, margin適用時の崩れ補正 */

li {
  list-style: none; /* listの黒ぽち非表示 */
}

.container {
  text-align: center;
}

.listArea {
  /* padding: 0; */
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: auto;
  flex-wrap: wrap;
}

.listArea-release {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: auto;
  flex-wrap: wrap;
}

.list {
  width: 256px; /* ここが%表記だとレスポンシブ時に画面幅に対しての%を維持するからカードが細長くなる */
  margin: 20px 20px;
}

.image {
  max-width: 100%;
  height: auto;
  display: block;
}

.el-card {
  overflow: hidden;
  width: 100%;
  background: #fff;
  border: none; /* elementの定義にcardと背景のborder設定あるから上書き */
  border-radius: 15px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.created_at {
  float: right;
  margin: 5px;
}

.info_label {
  margin: 8px;
}

/* レスポンシブ：スマホ */
@media (max-width: 600px) {
  .list {
    width: 100%;
    margin: 20px 20px;
  }
}

/* trasition開始時 */
.list-enter {
  opacity: 0;
  transform: translateY(30px);
}
/* trasition開始から終了 */
.list-enter-active {
  transition: all 1.5s;
}

/* release => info遷移時 */
.listRelease-leave {
  opacity: 0;
  transform: translateY(-30px);
}
.listRelease-leave-active {
  transition: all 1.5s;
}
</style>


<style>
/* globalのcssに上書きしたいからscopedと別に定義する */

/* サブメニューのアイテム表示域を拡大(artistフィルター) */
.el-menu--horizontal {
  width: 100%;
}
</style>
