<template lang="pug">
  section.my-reviews
    .admin-container
      .reviews__header
        .reviews__title Добавить отзыв
      .my-reviews__card
        .my-reviews__header
          .my-reviews__title Добавить отзыв
        .my-reviews__body
          .my-reviews__edit
            button.my-reviews__edit-btn
              icon.my-reviews__edit-icon(name="user")
            button.my-reviews__edit-link Добавить фото
          .my-reviews__content
            .my-reviews__row
              label.my-reviews__block
                .my-reviews__content-title Имя автора
                input.app-input.my-reviews__input
              label.my-reviews__block
                .my-reviews__content-title Титул автора
                input.app-input.my-reviews__input
            .my-works__row
              label.my-reviews__block.my-reviews__block-textarea
                .my-reviews__content-title Отзыв
                textarea.app-textarea
            .my-reviews__content-buttons
              button.app-button__reset Отмена
              button.app-button Сохранить
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
    Icon: () => import("components/Icon.vue")
  }
}
</script>