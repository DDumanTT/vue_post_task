<template>
  <nav class="level container" role="navigation" aria-label="pagination">
    <router-link
      :to="{
        path: '/posts',
        query: { ...this.$route.query, _page: 1, _limit: 5 }
      }"
      :is="currentPage === 1 ? 'span' : 'router-link'"
      class="button"
      :disabled="currentPage === 1"
      >First</router-link
    >
    <router-link
      :to="{
        path: '/posts',
        query: { ...this.$route.query, _page: currentPage - 1, _limit: 5 }
      }"
      :is="currentPage === 1 ? 'span' : 'router-link'"
      class="button"
      :disabled="currentPage === 1"
      >Previous</router-link
    >
    <span class="">{{ currentPage }}</span>
    <router-link
      :to="{
        path: '/posts',
        query: { ...this.$route.query, _page: currentPage + 1, _limit: 5 }
      }"
      :is="currentPage >= pages ? 'span' : 'router-link'"
      class="button"
      :disabled="currentPage >= pages"
      >Next</router-link
    >
    <router-link
      :to="{
        path: '/posts',
        query: { ...this.$route.query, _page: pages, _limit: 5 }
      }"
      :is="currentPage >= pages ? 'span' : 'router-link'"
      class="button"
      :disabled="currentPage >= pages"
      >Last</router-link
    >
  </nav>
</template>

<script>
export default {
  props: ["pages", "currentPage"]
};
</script>
