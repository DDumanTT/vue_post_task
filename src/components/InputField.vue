<template>
  <div class="field">
    <label :for="label">Title</label>
    <div class="control">
      <slot></slot>
    </div>
    <span class="help is-danger">{{ error }}</span>
  </div>
</template>

<script>
export default {
  props: ["label", "error"]
};
</script>
