<template>
  <div class="panel-block level">
    <div class="level-left">{{ post.title }}</div>
    <div class="level-item">{{ post.author.name }}</div>
    <div class="level-item">{{ updatedAt }}</div>
    <div class="level-right">
      <div>
        <button
          class="button is-danger is-light"
          @click="openModal('Dialog', { post })"
        >
          Del
        </button>
        <button
          class="button is-light"
          @click="openModal('PostForm', { post })"
        >
          Edit
        </button>
        <router-link :to="postLink" class="button is-success is-light"
          >View</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

import store from "../store/store";

export default {
  props: ["post"],

  methods: {
    openModal(component, props) {
      store.commit("openModal", { component, props });
    },
    deletePost() {
      this.$http
        .delete(`posts/${this.post.id}`)
        .then(r => {
          store.commit("closeModal");
        })
        .catch(e => console.log(e));
    }
  },

  computed: {
    updatedAt() {
      return moment(this.post.updated_at).format("LLL");
    },
    postLink() {
      return `/post/${this.post.id}`;
    }
  }
};
</script>
