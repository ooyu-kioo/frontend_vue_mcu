<template>
  <div class="test">
    <el-button @click="searchApi">API通信</el-button>
    <el-button @click="unfilterArtist">全アーティスト表示</el-button>
    <!-- クリックで呼び出すfilter()に引数を渡せる -->
    <el-button @click="filterArtist('UVERworld')">UVERworkd</el-button>
    <el-button @click="filterArtist('ReoNa')">ReoNa</el-button>
    <el-button @click="filterArtist('cinema staff')">cinema staff</el-button>

    <!-- カード -->
    <ul class="wrapperList">
      <div @click="transition(result.info_body_link)">
        <li
          v-for="result in results"
          v-bind:key="result.id"
          @click="transition(result.info_body_link)"
        >
          <div class="l-card">
            <div class="l-thumbnail">
              <div class="wrapperThumbnail">
                <!-- <img :src="imgSrc"> -->
                <span>ここにimegeだすー</span>
              </div>
            </div>
            <div class="textContent">
              <h3 class="artist_name">{{ result.artist_name }}</h3>
            </div>
          </div>
        </li>
      </div>
    </ul>
    <!-- カードクリック時のダイアログcomponent -->
    <!-- <el-dialog :title="modalResult.artist_name" :visible.sync="dialogVisible" width="30%">
      <span>This is a XXX!</span>
    </el-dialog>-->
  </div>
</template>

<script>
export default {
  name: "test",
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
        .get("http://127.0.0.1:8000/api/v1/infomation/?format=json")
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
      console.log(result);
      // modal表示用変数に元データをコピー
      this.modalResult = result;
      console.log("---modalResult---");
      console.log(this.modalResult);
      // 表示切り替え
      // this.modalVisible = true;
      this.dialogVisible = true;
    },
    // modal非表示
    closeModal() {
      this.modalVisible = false;
    },
    transition(link) {
      // window.location.href = link;
      window.open(link, "_blank");
    }
  }
};
</script>

<style scoped>
.l-card {
  overflow: hidden;
  width: 320px;
  padding: 0;
  margin: 24px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.l-thumbnail {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: auto;
}
.wrapperThumbnail {
  display: block;
  margin: 0;
  padding: 0;
}
.wrapperThumbnail::after {
  transition: 0.5s;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  opacity: 0;
}
.wrapperThumbnail img {
  transition: 0.5s;
  display: block;
  width: auto;
  height: 250px;
  margin: 0 auto;
}

.moreText {
  transition: opacity 0.5s, transform 0.8s;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -75%);
  display: inline-block;
  padding: 6px 12px 8px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  border: 1px solid #fff;
  opacity: 0;
}
.l-card:hover .wrapperThumbnail::after {
  opacity: 1;
}
.l-card:hover .wrapperThumbnail img {
  transform: scale(1.1);
  filter: blur(3px) grayscale(100%);
}
.l-card:hover .moreText {
  transform: translate(-50%, -50%);
  opacity: 1;
}

.contentMeta {
  display: flex;
  align-content: center;
  justify-content: space-between;
  margin: 5px 10px;
}

.date {
  font-size: 12px;
}

ul {
  list-style: none;
  padding: 0;
  display: flex;
  align-self: center;
}

.cardTag > li + li {
  margin-left: 10px;
}

.cardTag li {
  background: #eee;
  border: none;
  color: #666;
  padding: 6px;
  margin: 3px;
  border-radius: 3px;
  font-size: 12px;
  height: 12px;
}
</style>


