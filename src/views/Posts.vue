<template>
  <div>
    <message />
    <div class="panel is-primary">
      <p class="panel-heading">Posts</p>
      <div class="panel-block">
        <p class="control">
          <input
            class="input"
            type="text"
            placeholder="Search"
            :value="getSearch"
            @input="search"
          />
        </p>
      </div>
      <div class="panel-block">
        <button @click="openModal('PostForm', {})" class="button">
          Add post
        </button>
      </div>
      <template v-if="!loading">
        <template v-if="posts.length <= 0">
          <p class="panel-block">No posts</p>
        </template>
        <template v-for="post in posts">
          <post-row :post="post" />
        </template>
      </template>
      <div v-if="!loading" class="panel-block">
        <pagination :pages="totalPages" :current-page="currentPage" />
      </div>
    </div>
  </div>
</template>

<script>
import Post from "./Post.vue";
import PostRow from "../components/PostRow.vue";
import Pagination from "../components/Pagination.vue";
import Message from "../components/Message.vue";

import store from "../store/store";

export default {
  data: function() {
    return { loading: true, currentPage: 1, message: "", isSuccess: true };
  },

  components: { Post, PostRow, Pagination, Message },

  // TODO: fix added posts overfilling full page

  methods: {
    getPosts() {
      this.$http
        .get("posts", {
          params: {
            _expand: "author",
            _page: this.currentPage,
            _limit: 5,
            q: store.state.search
          }
        })
        .then(r => {
          store.commit(
            "setTotalPages",
            Math.ceil(r.headers["x-total-count"] / 5)
          );
          store.commit("setPosts", r.data);
          this.loading = false;
        })
        .catch(e => {
          store.commit("changeMessage", {
            text: "Failed to load posts.",
            success: false
          });
        });
    },
    getAuthors() {
      this.$http
        .get("authors")
        .then(r => store.commit("setAuthors", r.data))
        .catch(e => {
          store.commit("changeMessage", {
            text: "Failed to load authors.",
            success: false
          });
        });
    },
    openModal(component, props) {
      store.commit("openModal", { component, props });
    },
    closeModal() {
      store.commit("closeModal");
    },
    search(e) {
      this.currentPage = 1;
      store.commit("setSearch", e.target.value);
      this.$router.replace({
        path: "/posts",
        query: { ...this.$route.query, q: e.target.value }
      });
    },
    clearMessage() {
      this.message = "";
    }
  },

  created() {
    this.currentPage = Number(this.$route.query._page) || 1;
    this.getPosts();
    this.getAuthors();
  },

  computed: {
    posts() {
      return store.state.posts;
    },
    postsCount() {
      return store.state.posts.length;
    },
    modalOpen() {
      return store.state.modalOpen;
    },
    modalComponent() {
      return store.state.modalComponent;
    },
    modalProps() {
      return store.state.modalProps;
    },
    totalPages() {
      return store.state.totalPages;
    },
    getSearch() {
      return store.state.search;
    }
  },

  watch: {
    $route(to, from) {
      this.currentPage = Number(to.query._page) || 1;
      this.getPosts();
    }
  }
};
</script>

<style></style>
