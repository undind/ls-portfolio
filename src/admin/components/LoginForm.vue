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
          :error-message="validation.firstError('name')"
        )
      .login-form__control
        basic-input(
          v-model="password"
          icon="key"
          label="Пароль"
          type="password"
          :error-message="validation.firstError('password')"
        )
      .login-form__button
        basic-button(
          type="submit"
        ) ОТПРАВИТЬ
</template>

<script>
  import Vue from 'vue';
  import SimpleVueValidation from 'simple-vue-validator';
  import axios from 'axios';
  import Icon from './Icon.vue';
  import BasicInput from './BasicInput.vue';
  import BasicButton from './BasicButton.vue';

  Vue.use(SimpleVueValidation);
  const Validator = SimpleVueValidation.Validator;

  export default {
    components: {
      Icon,
      BasicInput,
      BasicButton
    },
    mixins: [SimpleVueValidation.mixin],
    data() {
      return {
        name: '',
        password: '',
        isLoading: false,
      };
    },
    validators: {
      name: (value) => {
        return Validator.value(value)
          .required('Заполните имя');
      },
      password: (value) => {
        return Validator.value(value)
          .required('Введите пароль')
          .minLength(4, 'Минимум 4 символа');
      },
    },
    methods: {
      signIn() {
        this.$validate().then((success) => {
          if (success) {
            this.login();
          }
        });
      },
      login() {
        // this.isLoading = true;
        axios
          .post('https://webdev-api.loftschool.com/login', {
            name: this.name,
            password: this.password
          })
          .then((response) => {
            alert("ВСЕ ОК!");  
          })
          .catch((e) => {
            alert(e.response.data.error);
          });
        // this.password = '';
        // this.isLoading = false;
      },
      exitFromAdmin() {
        location.href = 'https://undind.github.io/ls-portfolio/';
      },
    },
  }
</script>