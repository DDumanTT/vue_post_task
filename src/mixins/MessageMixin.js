import store from "../store/store";

const MessageMixin = {
  name: "MessageMixin",
  methods: {
    close() {
      store.commit("clearMessage");
    }
  },
  computed: {
    message() {
      return store.state.message;
    },
    isSuccess() {
      return store.state.isSuccess;
    }
  }
};

export default MessageMixin;
