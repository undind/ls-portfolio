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
          tags-input(
            label="Добавление тэга"
            v-model="workData.techs"
            :error-message="validation.firstError('workData.techs')"
          )
        .my-works__content-buttons
          button(
            :disabled="isSending"
            @click.prevent="$emit('reset')"
          ).app-button__reset Отмена
          button(
            type="submit"
            :disabled="isSending"
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
    TagsInput: () => import('components/TagsInput.vue'),
    SimpleInput: () => import('components/SimpleInput.vue'),
    SimpleTextarea: () => import('components/SimpleTextarea.vue'),
    PictureUpload: () => import('components/PictureUpload.vue'),
  },
  props: {
    currentWork: {
      type: Object,
      default: null
    },
    isSending: {
      type: Boolean,
      default: false
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
@import "../../styles/mixins.pcss";

.my-works__header {
  border-bottom: 1px solid rgba(#1f232d, 0.15);
  padding-bottom: 20px;
  padding-left: 15px;

  @include phones {
    padding-top: 20px;
  }
}

.my-works__title {
  font-size: 18px;
  font-weight: 700;
}

.my-works__body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 50px 8px 0;
  grid-gap: 20px;

  @include tablets {
    grid-template-columns: 1fr;
    justify-content: center;
    padding: 30px 50px;
  }

  @include tablets {
    padding: 20px 15px;
  }
}

.my-works__row {
  margin-bottom: 30px;
}

.my-works__content-buttons {
  margin-top: 60px;
  display: flex;
  justify-content: flex-end;

  @include tablets {
    justify-content: center;
  }
}

.app-button__reset {
  border: 0;
  background: none;
  color: $admin-color;
  font-weight: 600;
  margin-right: 60px;
  transition: opacity 0.3s;

  @include phones {
    margin-right: 10px;
  }

  &:hover {
    opacity: 0.85;
  }

  &:disabled {
    opacity: 0.2;
    cursor: default;
  }
}

.app-button {
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  border-radius: 25px;
  padding: 20px 45px;
  background-image: linear-gradient(to right, #006aed 0%, #3f35cb 100%);
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.85;
  }

  &:disabled {
    opacity: 0.2;
    cursor: default;
  }
}
</style>