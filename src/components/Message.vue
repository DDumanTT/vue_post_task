<template>
  <div
    v-if="this.message"
    :class="`message ${this.isSuccess ? 'is-success' : 'is-danger'}`"
  >
    <div class="message-body" @click="this.close">
      <p>{{ this.message }}</p>
    </div>
  </div>
</template>

<script>
import MessageMixin from "../mixins/MessageMixin";

export default {
  mixins: [MessageMixin]
};
</script>
