import Vue from "vue";
import Vuex from "vuex";

import PostForm from "../components/PostForm.vue";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    posts: [],
    authors: [],
    modalOpen: false,
    modalComponent: "",
    modalProps: {},
    totalPages: 0,
    search: "",
    message: "",
    isSuccess: true
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    // addPost(state, post) {
    //   state.posts.push(post);
    // },
    updatePost(state, post) {
      const postId = state.posts.findIndex(p => p.id === post.id);
      state.posts[postId].title = post.title;
      state.posts[postId].body = post.body;
      state.posts[postId].updated_at = post.updated_at;
    },
    removePost(state, postId) {
      state.posts = state.posts.filter(post => post.id !== postId);
    },
    setAuthors(state, authors) {
      state.authors = authors;
    },
    openModal(state, { component, props }) {
      state.modalComponent = component;
      state.modalProps = props;
      state.modalOpen = true;
    },
    closeModal(state) {
      state.modalOpen = false;
      state.modalComponent = "";
    },
    setTotalPages(state, pages) {
      state.totalPages = pages;
    },
    setSearch(state, term) {
      state.search = term;
    },
    changeMessage(state, { text, success }) {
      state.message = text;
      state.isSuccess = success;
    },
    clearMessage(state) {
      state.message = "";
    }
  }
});

export default store;
