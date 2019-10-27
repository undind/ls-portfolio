import Vue from 'vue';
import SimpleVueValidation from 'simple-vue-validator';
import basicInput from '../admin/components/BasicInput.vue';
import basicTextarea from '../admin/components/BasicTextarea.vue';
import basicButton from '../admin/components/BasicButton.vue';
import alertModal from '../admin/components/AlertModal.vue';

Vue.use(SimpleVueValidation);
const Validator = SimpleVueValidation.Validator;

new Vue({
  el: '#form-container',
  template: '#feedback-form',
  components: {
    basicInput,
    basicTextarea,
    basicButton,
    alertModal,
  },
  mixins: [SimpleVueValidation.mixin],
  validators: {
    name: (value) => {
      return Validator.value(value).required();
    },
    email: (value) => {
      return Validator.value(value)
        .required()
        .email();
    },
    message: (value) => {
      return Validator.value(value)
        .required('Введите текст сообщения')
        .minLength(5, 'Минимум 5 символов');
    },
  },
  data() {
    return {
      name: '',
      email: '',
      message: '',
      isShowAlert: false,
    };
  },
  computed: {
    errors() {
      return {
        name: this.validation.hasError('name') ? 'Введите имя' : '',
        email: this.validation.hasError('email') ? 'Введите корректный e-mail' : '',
        // message: this.validation.hasError('message') ? 'Введите текст сообщения' : '',
      };
    },
  },
  methods: {
    resetForm() {
      this.name = '';
      this.email = '';
      this.message = '';
      this.validation.reset();
    },
    onFormSumbit() {
      this.$validate().then((success) => {
        if (success) {
          this.showModal();
          this.resetForm();
        }
      });
    },
    showModal() {
      document.body.style.overflow = 'hidden';
      this.isShowAlert = true;
    },
    hideModal() {
      document.body.style.overflow = 'auto';
      this.isShowAlert = false;
    },
  },
});