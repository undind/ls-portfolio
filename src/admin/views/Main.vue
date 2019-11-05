<template lang="pug">
  .inner-page
    app-header
    app-navbar
    router-view
</template>

<script>
export default {
  components: {
    AppHeader: () => import("components/AppHeader.vue"),
    AppNavbar: () => import("components/AppNavbar.vue"),
  }
}
</script>

<style lang="postcss" scoped>
.inner-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: rgba(255, 255, 255, 0.9);
}
</style>