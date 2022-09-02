<template>
  <div>
    <h2 class="is-size-2 mb-3">{{ getTitle }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="field">
        <label for="title">Title</label>
        <div class="control">
          <input
            id="title"
            type="text"
            :class="['input', { 'is-danger': errors.title }]"
            v-model="title"
          />
        </div>
        <p v-if="errors.title" class="help is-danger">{{ errors.title }}</p>
      </div>
      <div class="field">
        <label for="body">Body</label>
        <div class="control">
          <textarea
            id="body"
            :class="['textarea', { 'is-danger': errors.body }]"
            v-model="body"
          />
        </div>
        <p v-if="errors.body" class="help is-danger">{{ errors.body }}</p>
      </div>
      <div class="field" v-if="!post">
        <label for="author">Author</label>
        <div class="control">
          <div :class="['select', { 'is-danger': errors.author }]">
            <select name="author" id="author" v-model="author">
              <option value="" disabled>Select author</option>
              <option v-for="a in getAuthors" :value="a.id">{{
                a.name
              }}</option>
            </select>
          </div>
        </div>
        <p v-if="errors.author" class="help is-danger">{{ errors.author }}</p>
      </div>
      <div class="control">
        <button class="button is-primary" type="submit">Submit</button>
        <button class="button" @click="closeModal">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import store from "../store/store";

import InputField from "./InputField.vue";

export default {
  components: { InputField },

  props: ["post"],

  data: function() {
    return {
      title: "",
      body: "",
      author: "",
      errors: { title: "", body: "" }
    };
  },

  methods: {
    handleSubmit() {
      if (!this.validateFields()) {
        return;
      }
      this.addPost();
    },
    addPost() {
      const post = {
        title: this.title,
        body: this.body,
        authorId: this.author,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      if (this.post) {
        // Edits the post
        this.$http
          .put(`posts/${this.post.id}`, {
            ...post,
            created_at: this.post.created_at,
            updated_at: new Date().toISOString()
          })
          .then(r => {
            store.commit("updatePost", r.data);
            store.commit("closeModal");
            store.commit("changeMessage", {
              text: `Successfully edited post ${this.post.id}`,
              success: true
            });
          })
          .catch(e =>
            store.commit("changeMessage", {
              text: `Failed to edit post ${this.post.id}`,
              success: false
            })
          );
      } else {
        // Adds the post
        this.$http
          .post("posts", post)
          .then(r => {
            store.commit("addPost", {
              ...post,
              id: r.data.id,
              author: store.state.authors.find(a => a.id === this.author)
            });
            store.commit("closeModal");
            store.commit("changeMessage", {
              text: `Successfully added post ${r.data.id}`,
              success: true
            });
          })
          .catch(e =>
            store.commit("changeMessage", {
              text: `Failed to add post`,
              success: false
            })
          );
      }
    },
    validateFields() {
      this.errors = { title: "", body: "", author: "" };

      if (!this.title) {
        this.errors.title = "Title is required";
      }
      if (!this.body) {
        this.errors.body = "Body is required";
      }
      if (!this.author) {
        this.errors.author = "Author is required";
      }
      // returns true if there are errors
      return !Object.values(this.errors).some(Boolean);
    },
    closeModal() {
      this.title = "";
      this.body = "";
      this.author = "";
      store.commit("closeModal");
    },
    mapPostData() {
      if (this.post) {
        this.title = this.post.title;
        this.body = this.post.body;
        this.author = this.post.authorId;
      }
    }
  },
  computed: {
    getAuthors() {
      return store.state.authors;
    },
    getTitle() {
      return !this.post ? "New post" : `Edit post ${this.post.id}`;
    }
  },
  created() {
    this.mapPostData();
  }
};
</script>
