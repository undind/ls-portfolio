<template lang="pug">
  .login-form
    .login-form__title Авторизация
    button.login-form__close(@click="exitFromAdmin")
      icon(name="Cross")
    form.login-form__body(@submit.prevent="signIn")
      .login-form__control
        basic-input(
          v-model="user.name"
          icon="Avatar"
          label="Логин"
          :error-message="validation.firstError('user.name')"
        )
      .login-form__control
        basic-input(
          v-model="user.password"
          icon="key"
          label="Пароль"
          type="password"
          :error-message="validation.firstError('user.password')"
        )
      .login-form__button
        basic-button(
          type="submit"
        ) ОТПРАВИТЬ
</template>

<script>
  import Vue from 'vue';
  import SimpleVueValidation from 'simple-vue-validator';
  import $axios from '@/requests';

  Vue.use(SimpleVueValidation);
  const Validator = SimpleVueValidation.Validator;

  export default {
    components: {
      Icon: () => import('components/Icon.vue'),
      BasicInput: () => import('components/BasicInput.vue'),
      BasicButton: () => import('components/BasicButton.vue')
    },
    mixins: [SimpleVueValidation.mixin],
    data() {
      return {
        user: {
          name: '',
          password: '',
        }
      };
    },
    validators: {
      'user.name': (value) => {
        return Validator.value(value)
          .required('Заполните имя');
      },
      'user.password': (value) => {
        return Validator.value(value)
          .required('Введите пароль')
          .minLength(3, 'Минимум 3 символа');
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
      async login() {
        try {
          const response = await $axios.post('/login', this.user);
          const token = response.data.token;

          localStorage.setItem("token", token);
          $axios.defaults.headers["Authorization"] = `Bearer ${token}`;

          this.$router.replace("/");
        } catch (error) {
          alert('FALSE');
          this.user.password = '';
        }
      },
      exitFromAdmin() {
        location.href = 'https://undind.github.io/ls-portfolio/';
      },
    },
  }
</script>