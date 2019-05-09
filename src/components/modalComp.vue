<template>
  <transition name="modal">
    <el-dialog
      v-bind:modal-result="modalResult"
      @close="closeModal"
      title="Title"
      v-if="modalVisible"
      width="80%"
    >
      <span>{{ modalResult.info_title }}</span>

      <span slot="footer" class="dialog-footer"></span>
      <button @click="$emit('close')">OK</button>
    </el-dialog>
  </transition>
</template>


<script>
//
export default {
  name: "modal",
  props: {
    modalResult: Object,
    modalVisible: Boolean
  }
};
</script>

<style scoped>
</style>