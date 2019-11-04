<template lang="pug">
  section.my-reviews
    .admin-container
      .reviews__header
        .reviews__title {{$route.meta.title}}
      .my-reviews__card
        reviews-form
      .my-reviews__new
        .my-reviews__add
          button.my-reviews__button
            icon.my-reviews__button-icon(name="Plus")
          .my-reviews__desc Добавить отзыв
        .my-reviews__fix
          .my-reviews__head
            .my-reviews__img
              img(src="../../images/reviews/1.png")
            .my-reviews__about
              .my-reviews__author Имя Фамилия
              .my-reviews__position Программист
          .my-reviews__new-body
            label.my-reviews__label
              textarea.app-textarea.my-reviews__textarea(placeholder="Этот код выдержит любые испытания. Только пожалуйста, не загружайте сайт на слишком старых браузерах")
            .my-reviews__controls
              button.my-reviews__control
                .my-reviews__control-text Править
                icon.my-reviews__icon.reviews-icon__accept(name="Pencil")
              button.my-reviews__control
                .my-reviews__control-text Удалить
                icon.my-reviews__icon.reviews-icon__delete(name="Cross")
</template>

<script>
export default {
   components: {
    ReviewsForm: () => import("components/ReviewsForm.vue"),
    Icon: () => import("components/Icon.vue")
  }
}
</script>

<style lang="postcss" scoped>
@import "../../styles/mixins.pcss";

.my-reviews {
  padding-top: 60px;
  padding-bottom: 40px;
}

.reviews__header {
  padding-bottom: 60px;

  @include tablets {
    padding-left: 15px;
  }
}

.reviews__title {
  font-size: 21px;
  font-weight: 700;
}


.my-reviews__card {
  box-shadow: 4px 3px 20px rgba(0, 0, 0, 0.07);
  background-color: #ffffff;
  padding: 30px;

  @include phones {
    padding: 0;
  }
}

/* .my-reviews__header {
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

.my-reviews__edit-icon {
  width: 105px;
  height: 113px;
  fill: #fff;
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

.my-reviews__block-textarea {
  @include tablets {
    width: 100%;
  }
} */

/* .my-reviews__content-title {
  opacity: 0.5;
  font-weight: 600;
  margin-bottom: 20px;
}

.my-reviews__input {
  border-bottom: 1px solid #000;
  font-weight: 600;
  padding-bottom: 20px;

  &:focus {
    border-bottom-color: $links-color;
  }
} */
</style>