<template lang="pug">
  .my-works__form
    .my-works__header
      .my-works__title {{ title }}
    form.my-works__body(
      @submit.prevent="onSubmit"
    )
      picture-upload(
        v-model="workData.photo"
        :error-message="validation.firstError('workData.photo')"
      )
      .my-works__content
        .my-works__row
          simple-input(
            label="Название"
            v-model="workData.title"
            :error-message="validation.firstError('workData.title')"
          )
        .my-works__row
          simple-input(
            label="Ссылка"
            v-model="workData.link"
            :error-message="validation.firstError('workData.link')"
          )
        .my-works__row
          simple-textarea(
            label="Описание"
            v-model="workData.description"
            :error-message="validation.firstError('workData.description')"
          )
        .my-works__row
          simple-input(
            label="Добавление тэга"
            v-model="workData.techs"
            :error-message="validation.firstError('workData.techs')"
          )
        .my-works__content-buttons
          button(
            @click.prevent="$emit('reset')"
          ).app-button__reset Отмена
          button(
            type="submit"
          ).app-button Сохранить
</template>

<script>
import SimpleVueValidation, { Validator } from 'simple-vue-validator';

const emptyWorkData = {
  title: '',
  link: '',
  description: '',
  techs: '',
  photo: null,
};

export default {
  components: {
    SimpleInput: () => import('components/SimpleInput.vue'),
    SimpleTextarea: () => import('components/SimpleTextarea.vue'),
    PictureUpload: () => import('components/PictureUpload.vue'),
  },
  props: {
    currentWork: {
      type: Object,
      default: null
    }
  },
  watch: {
    currentWork() {
      this.updateWorkData();
      this.validation.reset();
    }
  },
  mixins: [SimpleVueValidation.mixin],
  data() {
    return {
      workData: emptyWorkData,
    };
  },
  validators: {
    'workData.photo': (value) => {
      return Validator.value(value).required('Загрузите фото');
    },
    'workData.title': (value) => {
      return Validator.value(value).required('Введите название');
    },
    'workData.techs': (value) => {
      return Validator.value(value).required('Введите технологии');
    },
    'workData.link': (value) => {
      return Validator.value(value).required('Введите ссылку');
    },
    'workData.description': (value) => {
      return Validator.value(value).required('Введите описание работы');
    },
  },
  computed: {
    title() {
      return this.currentWork ? "Редактирование работы" : "Новая работа";
    },
  },
  methods: {
    updateWorkData() {
      this.workData = this.currentWork ? { ...this.currentWork } : { ...emptyWorkData };
    },
    onSubmit() {
      this.$validate().then((success) => {
        if (success) {
          const eventType = this.currentWork ? 'update' : 'create';
          this.$emit(eventType, this.workData);
          this.validation.reset();
        }
      })
    }
  },
  created() {
    this.updateWorkData();
  },
}
</script>

<style lang="postcss" scoped>

</style>