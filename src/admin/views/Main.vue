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