<template lang="pug">
  .new-reviews
    .my-reviews__header
      .my-reviews__title Новый отзыв
    form.my-reviews__form(@submit.prevent="onSubmit")
      .my-reviews__edit
        avatar-upload(
          v-model="reviewData.photo"
          :error-message="validation.firstError('reviewData.photo')"
        )
        //- button.my-reviews__edit-btn
        //-   icon.my-reviews__edit-icon(name="user")
        //- button.my-reviews__edit-link Добавить фото
      .my-reviews__content
        .my-reviews__row
          simple-input(
            label="Имя автора"
            v-model="reviewData.author"
            :error-message="validation.firstError('reviewData.author')"
          ).my-reviews__block
          simple-input(
            label="Титул автора"
            v-model="reviewData.occ"
            :error-message="validation.firstError('reviewData.position')"
          ).my-reviews__block
          //- label.my-reviews__block
          //-   .my-reviews__content-title Имя автора
          //-   input.app-input.my-reviews__input
          //- label.my-reviews__block
          //-   .my-reviews__content-title Титул автора
          //-   input.app-input.my-reviews__input
        .my-works__row
          simple-textarea(
            label="Отзыв"
            v-model="reviewData.text"
            :error-message="validation.firstError('reviewData.text')"
          )
          //- label.my-reviews__block.my-reviews__block-textarea
          //-   .my-reviews__content-title Отзыв
          //-   textarea.app-textarea
        .my-reviews__content-buttons
          button().app-button__reset Отмена
          button(
            type="submit"
          ).app-button Сохранить
</template>

<script>
import SimpleVueValidation, { Validator } from 'simple-vue-validator';

const emptyReviewData = {
  author: '',
  occ: '',
  text: '',
  photo: null,
};

export default {
  components: {
    AvatarUpload: () => import("components/AvatarUpload.vue"),
    SimpleInput: () => import("components/SimpleInput.vue"),
    SimpleTextarea: () => import("components/SimpleTextarea.vue"),
    Icon: () => import("components/Icon.vue")
  },
  props: {
    currentReview: {
      type: Object,
      default: null,
    }
  },
  watch: {
    currentReview() {
      this.updateReviewData();
      this.validation.reset();
    },
  },
  mixins: [SimpleVueValidation.mixin],
  data() {
    return {
      reviewData: emptyReviewData,
    };
  },
  validators: {
    'reviewData.photo': (value) => {
      return Validator.value(value).required('Загрузите фото');
    },
    'reviewData.author': (value) => {
      return Validator.value(value).required('Введите автора');
    },
    'reviewData.position': (value) => {
      return Validator.value(value).required('Введите титул');
    },
    'reviewData.text': (value) => {
      return Validator.value(value).required('Введите текст отзыва');
    },
  },
  methods: {
    updateReviewData() {
      this.reviewData = this.currentReview ? { ...this.currentReview } : { ...emptyReviewData };
    },
    onSubmit() {
      this.$validate().then((success) => {
        if (success) {
          const eventType = this.currentReview ? 'update' : 'create';
          this.$emit(eventType, this.reviewData);
          this.validation.reset();
        }
      });
    },
    created() {
      this.updateReviewData();
    },
  }
}
</script>

<style lang="postcss" scoped>
@import "../../styles/mixins.pcss";

.my-reviews__header {
  border-bottom: 1px solid rgba(#1f232d, 0.15);
  padding-bottom: 20px;
  padding-left: 15px;
}

.my-reviews__title {
  font-size: 18px;
  font-weight: 700;
}

.my-reviews__form {
  display: grid;
  grid-template-columns: max-content 60%;
  padding: 50px 8px 0;
  grid-gap: 30px;

  @include tablets {
    grid-template-columns: max-content 1fr;
    padding: 20px 15px;
  }

  @include phones {
    grid-template-columns: 1fr;
  }
}

.my-reviews__edit {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-self: start;
}

.my-reviews__edit-link  {
  background: none;
  color: $admin-color;
  font-weight: 600;
  margin-top: 30px;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.85;
  }
}

.my-reviews__row {
  margin-bottom: 30px;
  display: flex;

  @include tablets {
    flex-direction: column;
  }
}

.my-reviews__block {
  flex: 1;
  display: block;
  margin-right: 30px;

  @include tablets {
    margin-right: 0;
    margin-bottom: 30px;
    width: 70%;
  }

  @include phones {
    width: 100%;
  }

  &:last-child {
    margin-right: 0;
  }
}

.my-reviews__content-buttons {
  margin-top: 60px;
  display: flex;
  justify-content: flex-end;

  @include phones {
    justify-content: center;
    margin-top: 30px;
  }
}
</style>