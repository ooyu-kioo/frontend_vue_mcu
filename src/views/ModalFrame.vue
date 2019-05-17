<template>
  <div class="modal-frame">
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

    <div class="container">
      <ul class="listArea">
        <li class="list" v-for="result in results" :key="result.id" @click="openModal(result)">
          <el-card class="el-card" :body-style="{padding:'0px'}" shadow="hover">
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
        </li>
      </ul>
    </div>
    <!-- カードクリック時のダイアログcomponent -->
    <el-dialog custom-class="el-dialog" :visible.sync="dialogVisible" width="90%" top=5vh>
      <iframe class="modal-iframe" sandbox="allow-scripts" :src=frameSrc></iframe>
    </el-dialog>
  </div>
</template>

<script src="vue.js"></script>
<script>
import axios from "axios";
//
export default {
  name: "modalFrame",
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
      modalResult: "",
      // frameに渡すURL
      frameSrc: ""
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
        .get("https://django-vue-mcu.herokuapp.com/api/v1/infomation/?format=json")
        .then(
          response => (
            (this.results = response.data), (this.allResults = response.data)
          )
        );
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
      this.frameSrc = result.info_body_link; // iframeのsrcをURL指定
      this.dialogVisible = true; // 表示切り替え
    },
    // modal非表示
    closeModal() {
      this.modalVisible = false;
    },
    // info詳細：外部ページへの遷移
    transition(link) {
      // window.location.href = link; // 同一ページ遷移
      window.open(link, "_blank"); // 別タブ遷移
    }
  }
};
</script>

<style scoped>

* { box-sizing: border-box; } /* 全要素に対してpadding, margin適用時の崩れ補正 */

li {
  list-style: none;
}

.container {
  text-align: center;
}

.listArea {
  padding: 0;
  display: flex; 
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: auto;
  flex-wrap: wrap;
}

.list {
  width: 256px;
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
  padding: 0;
  background: #fff;
  margin: 0px;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.modal-iframe {
  width: 90%;
  height: 630px;
  border: none;
}
/* レスポンシブ：スマホ */
@media(max-width: 600px){
  .list{
    width: 100%;
    margin: 20px 20px;
  }
  .el-dialog{
    height: 500px;
  }
}

</style>
