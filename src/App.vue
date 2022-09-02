<template>
  <div id="app">
    <div class="container mt-6 column is-half">
      <router-view></router-view>
    </div>
    <modal @close="closeModal" :open="modalOpen">
      <component :is="modalComponent" v-bind="modalProps" />
    </modal>
  </div>
</template>

<script>
import store from "./store/store";
import Modal from "./components/Modal.vue";
import PostForm from "./components/PostForm.vue";
import Dialog from "./components/Dialog.vue";

export default {
  name: "app",
  components: { Modal, PostForm, Dialog },

  methods: {
    closeModal() {
      store.commit("closeModal");
    }
  },
  computed: {
    modalOpen() {
      return store.state.modalOpen;
    },
    modalComponent() {
      return store.state.modalComponent;
    },
    modalProps() {
      return store.state.modalProps;
    }
  }
};
</script>
