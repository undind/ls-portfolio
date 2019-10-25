<template lang="pug">
  .app
    .login-page
      .login-page__form
    .inner-page
      .admin-section
        .container
          header.admin-header
            .header__desc
              a.header__avatar
                img.header__avatar-img(src="../images/greeting/me.png" alt="")
              .header__username Сергей Антонов
              .header__panelname Панель администратора
            .admin-logout
              a.logout__link Выйти
      .navbar-section
        .container
          .navbar__list
            - var navbars = ['Обо мне', 'Работы', 'Отзывы']
              each item, i in navbars 
                a.navbar__item(class=`${i === 0 ? 'navbar__item-active' : ''}`) #{item}
</template>

<script>
export default {
  
}
</script>

<style lang="postcss">
  @import "./styles/main.pcss";
</style>