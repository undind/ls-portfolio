<template lang="pug">
  section.my-works
    .admin-container
      .works__header
        .works__title Добавить отзыв
      .my-works__card
        .my-works__header
          .my-works__title Добавление работы
        .my-works__body
          .my-works__edit
            .my-works__edit-text Перетащите или загрузите для загрузки изображения
            button.app-button.my-works__edit-btn Загрузить
          .my-works__content
            .my-works__row
              label.my-works__block
                .my-works__content-title Название
                input.app-input.my-works__input
            .my-works__row
              label.my-works__block
                .my-works__content-title Ссылка
                input.app-input.my-works__input
            .my-works__row
              label.my-works__block
                .my-works__content-title Описание
                textarea.app-textarea
            .my-works__row
              label.my-works__block
                .my-works__content-title Добавление тэга
                input.app-input.my-works__input
            .my-works__content-buttons
              button.app-button__reset Отмена
              button.app-button Сохранить
      .my-works__new
        .works-new__add
          button.works-new__button
            icon.works-new__button-icon(name="Plus")
          .works-new__desc Добавить работу
        .works-new__edit
          .works-new__img
            img(src="../../images/admin/admin-works.png")
          .works-new__body
            label.works-new__label
              .works-new__text Новая работа
              input.app-input.works-new__input(placeholder="Описание работы")
            a.works-new__link(href="http://loftschool.ru") http://loftschool.ru
            .works-new__controls
              button.works-new__control
                .works-new__control-text Править
                icon.works-new__icon.works-icon__accept(name="Pencil")
              button.works-new__control
                .works-new__control-text Удалить
                icon.works-new__icon.works-icon__delete(name="Cross")
</template>

<script>
export default {
   components: {
    Icon: () => import("components/Icon.vue")
  }
}
</script>