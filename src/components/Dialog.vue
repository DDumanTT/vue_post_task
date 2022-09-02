<template>
  <div>
    <h2>Delete post {{ post.id }}?</h2>
    <button class="button" @click="deletePost">Yes</button>
    <button class="button" @click="closeModal">No</button>
  </div>
</template>

<script>
import store from "../store/store";

export default {
  props: ["post", "to"],

  methods: {
    deletePost() {
      this.$http
        .delete(`posts/${this.post.id}`)
        .then(r => {
          this.to && this.$router.push(this.to);
          store.commit("removePost", this.post.id);
          store.commit("closeModal");
          store.commit("changeMessage", {
            text: `Successfully deleted post ${this.post.id}`,
            success: true
          });
        })
        .catch(e =>
          store.commit("changeMessage", {
            text: `Failed to delete post ${this.post.id}`,
            success: false
          })
        );
    },
    closeModal() {
      store.commit("closeModal");
    }
  }
};
</script>
