// TODO デザイン
// ・divタグのリンク影響範囲
// ・カードの幅できれば固定かなー
// ・リリースカレンダー

// TODO 機能
// ・artistのフィルターの表示(el-button配置)自動でできない？

// TODO その他
// ・カード表示のcss設定理解

<template>
  <div class="main-list">
    <el-button @click="searchApi">API通信</el-button>
    <el-button @click="unfilterArtist">新着</el-button>
    <!-- クリックで呼び出すfilter()に引数を渡せる -->
    <el-button @click="filterArtist('UVERworld')">UVERworkd</el-button>
    <el-button @click="filterArtist('ReoNa')">ReoNa</el-button>
    <el-button @click="filterArtist('凛として時雨')">凛として時雨</el-button>
    <el-button @click="filterArtist('Hello Sleep Walkers')">Hello Sleep Walkers</el-button>
    <el-button @click="filterArtist('cinema staff')">cinema staff</el-button>
    <el-button @click="filterArtist('[Alexandros]')">[Alexandros]</el-button>
    <el-button @click="filterArtist('ヨルシカ')">ヨルシカ</el-button>

    <!-- カード -->
    <!-- :gutter="10" -->
    <el-row class="row-list">
      <!--  :offset="2" -->
      <el-col :span="8" v-for="result in results" :key="result.id">
        <!-- @click="openModal(result)" -->
        <div @click="transition(result.info_body_link)">
          <el-card class="el-card" :body-style="  { padding: '0px' }" shadow="hover">
            <!-- imgソースを動的に組み立て -->
            <img
              class="image"
              :src="require('./../assets/' + result.artist_name + '.png')"
              alt="No Image"
            />
            <div style="padding: 10px;">
              <div><strong>{{ result.artist_name }}</strong></div>
              <span>{{ result.info_title }}</span>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>

    <!-- テスト用 -->
    <!-- <el-row>
      <el-col
        :span="8"
        v-for="(result, index) in results"
        :key="result.id"
        :offset="index > 0 ? 2 : 0"
      >
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <div>{{ result.artist_name }}</div>
            <div>{{ result.info_title }}</div>
            <div class="bottom clearfix"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>-->

    <!-- カードクリック時のダイアログcomponent -->
    <!-- <modal v-bind:modal-result="modalResult" v-if="modalVisible" @close="closeModal"></modal> -->
    <!-- <el-dialog :title="modalResult.artist_name" :visible.sync="dialogVisible" width="30%">
      <span>This is a XXX!</span>
    </el-dialog>-->
  </div>
</template>

<script src="vue.js"></script>
<script>
// import modal from "../components/modalComp.vue";
import axios from "axios";
//
export default {
  name: "mainList",
  components: {
    // modal
  },
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
      modalResult: ""
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
      // http://127.0.0.1:8000/api/v1/infomation/?format=json
        .get("https://django-vue-mcu.herokuapp.com/api/v1/infomation/?format=json")
        .then(
          response => (
            (this.results = response.data), (this.allResults = response.data)
          )
        );
      // .finally(() => this.makeImgSrc());
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
      // modal表示用変数に元データをコピー
      this.modalResult = result;
      // 表示切り替え
      // this.modalVisible = true;
      this.dialogVisible = true;
    },
    // modal非表示
    closeModal() {
      this.modalVisible = false;
    },
    // info詳細：外部ページへの遷移
    transition(link) {
      // 同一ページ遷移
      window.location.href = link;
      // 別タブ遷移
      // window.open(link, "_blank");
    }
  }
};
</script>

<style scoped>

.row-list {
  padding: 0;
  display: flex;
  justify-content: center;
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
}

.image {
  max-width: 100%;
  height: auto;
  display: block;
}

.el-card {
  overflow: hidden;
  width: 320px;
  padding: 0;
  background: #fff;
  margin: 24px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
</style>
