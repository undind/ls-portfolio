<template lang="pug">
  .login-form
    .login-form__title Авторизация
    button.login-form__close(@click="exitFromAdmin")
      icon(name="Cross")
    form.login-form__body(@submit.prevent="signIn")
      .login-form__control
        basic-input(
          v-model="name"
          icon="Avatar"
          label="Логин"
        )
      .login-form__control
        basic-input(
          v-model="password"
          icon="key"
          label="Пароль"
          type="password"
        )
      .login-form__button
        basic-button(
          type="submit"
          :disabled="isLoading || !name.length || password.length < 4"
        ) ОТПРАВИТЬ
</template>

<script>
  import axios from 'axios';
  import Icon from './Icon.vue';
  import BasicInput from './BasicInput.vue';
  import BasicButton from './BasicButton.vue';

  export default {
    components: {
      Icon,
      BasicInput,
      BasicButton
    },
    data() {
      return {
        name: '',
        password: '',
        isLoading: false,
      };
    },
    methods: {
      signIn() {
        axios
          .post('https://webdev-api.loftschool.com/login', {
            name: this.name,
            password: this.password
          }).then((response) => {
            alert("ВСЕ ОК!");  
          }).catch((e) => {
            alert(e.response.data.error);
          })
      },
      exitFromAdmin() {
        location.href = 'https://undind.github.io/ls-portfolio/';
      },
    },
  }
</script>