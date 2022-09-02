import Vue from "vue";
import VueRouter from "vue-router";

import Posts from "./views/Posts.vue";
import Post from "./views/Post.vue";
import Error from "./views/Error.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/posts",
      component: Posts
    },
    {
      path: "/post/:postId",
      component: Post
    },
    {
      path: "*",
      component: Error
    }
  ]
});

export default router;
