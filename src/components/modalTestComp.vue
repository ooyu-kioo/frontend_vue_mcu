<template>
  <transition name="modal">
    <div class="modal-mask" @click="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container">
          {{ postItem.id }}
          {{ postItem.name }}
          <!-- 子 > 親へのイベント発火 -->
          <button @click="$emit('close')">OK</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// 単一ファイルコンポーネント化する場合インスタンス生成でなくexport
export default {
  name: "modalTest",
  props: {
    // 親(コンポーネント)から受け取る属性名,validationを指定
    postItem: Object // オブジェクトのみ受け取る
  }
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 70%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
</style>