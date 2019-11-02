<template lang="pug">
  section.navbar-section
    .admin-container
      .navbar__list
        router-link.navbar__item(
          v-for="(tab, index) in navbars"
          :key="index"
          :to="tab.link"
          exact-active-class="navbar__item-active"
        ) {{ tab.title }}
</template>

<script>
export default {
  data() {
    return {
      navbars: [
        {
          title: "Обо мне",
          link: "/"
        },
        {
          title: "Работы",
          link: "/works"
        },
        {
          title: "Отзывы",
          link: "/reviews"
        }
      ]
    };
  }
};
</script>

<style lang="postcss" scoped>
@import "../../styles/mixins.pcss";

.navbar-section {
  background-color: #fff;
}

.navbar__list {
  display: flex;
  align-items: center;

  @include tablets {
    padding: 0 45px;
  }

  @include phones {
    padding: 0 0 0 15px;
  }
}

.navbar__item {
  padding: 27px 30px;
  color: $text-color;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.3s;

  @include phones {
    padding: 27px 25px;
  }

  &:hover {
    color: $admin-color;
  }

  &-active {
    position: relative;
    color: $admin-color;
    font-weight: 600;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      height: 3px;
      background-color: $admin-color;
    }
  }
}
</style>