<template>
  <div>
    <message />
    <div v-if="!loading" class="box">
      <div class="level">
        <div>
          <h2 class="level-left is-size-2">{{ post.title }}</h2>
          <h2 class="subtitle is-size-4 has-text-grey">
            By {{ post.author.name }}
          </h2>
        </div>
        <span class="level-right">{{ updatedAt }}</span>
      </div>
      <p>{{ post.body }}</p>
      <hr class="my-3" />
      <button
        class="button is-danger is-light"
        @click="openModal('Dialog', { post, to: '../posts' })"
      >
        Del
      </button>
      <button class="button is-light" @click="openModal('PostForm', { post })">
        Edit
      </button>
    </div>
  </div>
</template>

<script>
import moment from "moment";

import store from "../store/store";

import Message from "../components/Message.vue";

export default {
  components: { Message },

  data: function() {
    return { post: {}, loading: true };
  },

  methods: {
    getPost() {
      this.$http
        .get(`posts/${this.$route.params.postId}`, {
          params: { _expand: "author" }
        })
        .then(r => {
          store.commit("setPosts", [r.data]);
          this.post = r.data;
          this.loading = false;
        })
        .catch(e =>
          store.commit("changeMessage", {
            text: "Failed to load post.",
            success: true
          })
        );
    },
    getAuthors() {
      this.$http
        .get("authors")
        .then(r => store.commit("setAuthors", r.data))
        .catch(e =>
          store.commit("changeMessage", {
            text: "Failed to load authors.",
            success: false
          })
        );
    },
    openModal(component, props) {
      store.commit("openModal", { component, props });
    }
  },

  computed: {
    updatedAt() {
      return moment(this.post.updated_at).format("LLL");
    }
  },

  mounted() {
    this.getPost();
    this.getAuthors();
  }
};
</script>
