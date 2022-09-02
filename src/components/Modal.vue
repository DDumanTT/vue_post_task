<template>
  <div :class="['modal', { 'is-active': open }]">
    <div class="modal-background"></div>
    <div class="modal-content box"><slot></slot></div>
  </div>
</template>

<script>
export default {
  props: ["open"]
};
</script>
