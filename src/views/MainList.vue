// TODO デザイン
// ・ロゴ作成
// ・filerの子要素表示位置
// ・filerボタン２押しで閉じれない

// ・アニメーション
//  ・画面遷移
// ・カード下部にcreated_at表示(短い時間表示に直して)

// TODO 機能
// ・リリースカレンダー
// ・artistのフィルターの表示(el-button配置)自動でできない？

// TODO その他


<template>
  <div class="main-list">
    <!-- <el-button @click="searchApi">API通信</el-button> -->

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
      <el-submenu popper-class="el-submenu">
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
    </el-menu>

    <!-- infomationカード(loadingがfalseで表示) -->
    <!-- api読み込み時のloading -->
    <div class="loading" v-show="isLoading"></div>
    <div class="container" v-show="!isLoading">
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
            >
            <div style="padding: 10px;">
              <div>
                <strong>{{ result.artist_name }}</strong>
              </div>
              <span>{{ result.info_title }}</span>
            </div>
          </el-card>
        </li>
      </transition-group>
    </div>
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
      // json格納用(allResults=filter用のマスタデータ)
      results: null,
      allResults: null,
      // modal表示用
      modalVisible: false,
      dialogVisible: false,
      // modalに渡すresultOBJ
      modalResult: "",
      // loading表示用
      isLoading: true
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
          this.isLoading = false; // loadingアニメーション表示切り替え
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
    // modal処理
    openModal(result) {
      this.modalResult = result; // modal表示用変数に元データをコピー
      // this.modalVisible = true;
      this.dialogVisible = true; // 表示切り替え
    },
    // modal非表示
    closeModal() {
      this.modalVisible = false;
    },
    // info詳細：外部ページへの遷移
    transition(link) {
      window.location.href = link; // 同一ページ遷移
      // window.open(link, "_blank"); // 別タブ遷移
    },
    // load表示切り替え
    loaded() {
      this.isLoading = false;
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

.el-submenu {
  width: 100%;
}

#unfiltered {
  background-color: azure;
}
</style>


<style>
/* globalのcssに上書きしたいからscopedと別に定義する */

/* サブメニューのアイテム表示域を拡大(artistフィルター) */
.el-menu--horizontal {
  width: 100%;
}
</style>
