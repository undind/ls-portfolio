<template lang="pug">
  .login-page
    .login-page__form
      login-form
</template>

<script>
export default {
  components: {
    LoginForm: () => import('components/LoginForm.vue')
  }
}
</script>