<template lang="pug">
  .app
    router-view      
</template>

<script>
  import LoginForm from './components/LoginForm.vue';
  import Icon from './components/Icon.vue';

  export default {
    components: {
      LoginForm,
      Icon
    }
  }
</script>

<style lang="postcss">
  @import "./styles/main.pcss";
</style>