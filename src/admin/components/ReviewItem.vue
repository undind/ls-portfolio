<template lang="pug">
  .my-reviews__item(:class="{ 'my-reviews__active': isActive }")
    .my-reviews__head
      .my-reviews__img
        img().my-reviews__avatar
      .my-reviews__about
        .my-reviews__author {{ review.author }}
        .my-reviews__position {{ review.position }}
    .my-reviews__new-body
      .my-reviews__text {{ review.text }}
      .my-reviews__controls
        button(
          @click="$emit('edit')"
        ).my-reviews__control
          .my-reviews__control-text Править
          icon.my-reviews__icon.reviews-icon__accept(name="Pencil")
        button.my-reviews__control
          .my-reviews__control-text Удалить
          icon.my-reviews__icon.reviews-icon__delete(name="Cross")
</template>

<script>
import { getAbsoluteImgPath } from '@/helpers/pictures';

export default {
  components: {
    Icon: () => import("components/Icon.vue")
  },
  props: {
    review: {
      type: Object,
      default: {},
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  // computed: {
  //   imageSrc() {
  //     return getAbsoluteImgPath(this.review.photo);
  //   },
  // },
}
</script>

<style lang="postcss" scoped>
@import "../../styles/mixins.pcss";

.my-reviews__item {
  box-shadow: $admin-shadow;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 30px;
  height: 100%;
  position: relative;
}

.my-reviews__active {
  &::after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(white, 0.7);
  }
}

.my-reviews__desc {
  width: 30%;
  text-align: center;
  margin-top: 30px;
  color: #fff;
  font-size: 18px;
  font-weight: 700;

  @include tablets {
    width: auto;
    margin-top: 0;
    margin-left: 30px;
  }
}

.my-reviews__head {
  display: flex;
  width: 100%;
  border-bottom: 1px solid rgba(#1f232d, 0.15);
  padding-bottom: 20px;
}

.my-reviews__img {
  width: 50px;
  height: 50px;
  margin-right: 20px;
  border-radius: 50%;
  background: svg-load('user.svg', fill=#fff, width=30px, height=30px) center center no-repeat #dee4ed;
}

.my-reviews__author {
  font-size: 18px;
  font-weight: 700;
}

.my-reviews__position {
  opacity: 0.5;
}

.my-reviews__new-body {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 30px;
}

.my-reviews__controls {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;

  @include tablets {
    margin-top: 20px;
  }
}

.my-reviews__control {
  background: none;
  display: flex;
  align-items: center;
  padding: 0;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
}

.my-reviews__control-text {
  opacity: 0.5;
  font-weight: 600;
}

.my-reviews__icon {
  width: 17px;
  height: 17px;
  margin-left: 10px;
}

.reviews-icon__accept {
  fill: #383bcf;
}

.reviews-icon__delete {
  fill: #c92e2e;
}
</style>