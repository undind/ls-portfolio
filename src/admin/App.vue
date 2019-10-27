<template lang="pug">
  .app
    .login-page
      .login-page__form
        login-form
    .inner-page
      section.admin-section
        .container
          header.admin-header
            .header__desc
              a.header__avatar
                img.header__avatar-img(src="../images/greeting/me.png" alt="")
              .header__username Сергей Антонов
              .header__panelname Панель администратора
            .admin-logout
              a.logout__link Выйти
      section.navbar-section
        .container
          .navbar__list
            - var navbars = ['Обо мне', 'Работы', 'Отзывы']
              each item, i in navbars 
                a.navbar__item(class=`${i === 0 ? 'navbar__item-active' : ''}`) #{item}
      section.about-section
        .container
          .about__header
            h1.about__title Блок "Обо мне"
          .about__content
            .card
              .card__header.skill-group
                .skill-group__title
                  input.app-input.skill-group__input(placeholder="Название новой группы")
                .skill-group__controls
                  button.skill-group__button
                    icon.skill-group__icon.skill-group__accept(name="Tick")
                  button.skill-group__button
                    icon.skill-group__icon.skill-group__delete(name="Cross")
              .card__body
                .skills
              .card__footer
                .new-skill
                  .new-skill__name
                    input.app-input.new-skill__input(placeholder="Новый навык" disabled="disabled")
                  .new-skill__percent
                    input.app-input.new-skill__input(value="100" disabled="disabled")
                    .skills__percent-measure %
                  button.new-skill__button(disabled="disabled")
                    icon.new-skill__icon(name="Plus")
            .card
              .card__header.skill-group
                .skill-group__title
                  input.app-input.skill-group__input(value="Frontend")
                .skill-group__controls
                  button.skill-group__button
                    icon.skill-group__icon.skill-group__edit(name="Pencil")
                  //- button.skill-group__button
                  //-   icon.skill-group__icon.skill-group__delete(name="Cross")
              .card__body
                .skills
                  - var skills = [['Html', 30, 'edit'], ['CSS', 50], ['JavaScript', 100]]
                    each skill in skills
                      .skills__name
                        if skill[2]
                          input.app-input(value=skill[0])
                        else
                          input.app-input(value=skill[0] disabled="disabled")
                      .skills__percent
                        if skill[2]
                          input.app-input(value=skill[1])
                        else
                          input.app-input(value=skill[1] disabled="disabled")
                        .skills__percent-measure %
                      if skill[2]
                        .skills__controls
                          button.skills__button
                            icon.skills__icon.skills__accept(name="Tick")
                          button.skills__button
                            icon.skills__icon.skills__delete(name="Cross")
                      else
                        .skills__controls
                          button.skills__button
                            icon.skills__icon.skills__edit(name="Pencil")
                          button.skills__button
                            icon.skills__icon.skills__trash(name="Trash")
              .card__footer
                .new-skill
                  .new-skill__name
                    input.app-input.new-skill__input(placeholder="Новый навык")
                  .new-skill__percent
                    input.app-input.new-skill__input(value="100")
                    .skills__percent-measure %
                  button.new-skill__button
                    icon.new-skill__icon(name="Plus")



</template>

<script>
  import LoginForm from './components/LoginForm.vue';
  import Icon from './components/Icon.vue';

  export default {
    components: {
      LoginForm,
      Icon
    }
  }
</script>

<style lang="postcss">
  @import "./styles/main.pcss";

  .app-input {
    border: none;
    background: none;
    border-bottom: 1px solid transparent;
    outline: none;
    padding-bottom: 5px;
    color: $text-color;
    width: 100%;

    &:focus {
      border-bottom-color: $links-color;
    }

    &::placeholder {
      font-size: 18px;
      font-weight: 600;
      opacity: .5;
    }

    &:disabled {
      opacity: 0.8;
    }
  }
</style>