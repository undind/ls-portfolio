<template lang="pug">
  .works-new__item(:class="{ 'works-new__active': isActive }")
    .works-new__img
      img(:src="imageSrc")
    .works-new__body
      .works-new__label
        .works-new__title {{work.title}}
        .works-new__desc {{work.description}}
      a.works-new__link(:href="`//${work.link}`" target="_blank") {{work.link}}
      .works-new__controls
        button(
          @click="$emit('edit')"
        ).works-new__control
          .works-new__control-text Править
          icon.works-new__icon.works-icon__accept(name="Pencil")
        button(
          @click="$emit('delete')"
        ).works-new__control
          .works-new__control-text Удалить
          icon.works-new__icon.works-icon__delete(name="Cross")
</template>

<script>
import { getAbsoluteImgPath } from '@/helpers/pictures';

export default {
  components: {
    Icon: () => import("components/Icon.vue")
  },
  props: {
    work: {
      type: Object,
      default: () => ({})
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    imageSrc() {
      return getAbsoluteImgPath(this.work.photo);
    },
  },
}
</script>

<style lang="postcss" scoped>
@import "../../styles/mixins.pcss";

.works-new__item {
  box-shadow: $admin-shadow;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  position: relative;
}

.works-new__active {
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

.works-new__body {
  padding: 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.works-new__img {
  display: flex;
  justify-content: center;
}

.works-new__title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
}

.works-new__desc {
  opacity: 0.7;
  font-weight: 600;
  line-height: $l-height;
  margin-bottom: 10px;
}

.works-new__link {
  color: $admin-color;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
}

.works-new__controls {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;

  @include tablets {
    margin-top: 20px;
  }
}

.works-new__control {
  background: none;
  display: flex;
  align-items: center;
  padding: 0;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
}

.works-new__control-text {
  opacity: 0.5;
  font-weight: 600;
}

.works-new__icon {
  width: 17px;
  height: 17px;
  margin-left: 10px;
}

.works-icon__accept {
  fill: #383bcf;
}

.works-icon__delete {
  fill: #c92e2e;
}
</style>