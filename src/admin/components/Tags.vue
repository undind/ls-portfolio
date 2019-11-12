<template lang="pug">
  .tags
    .tags__item(
      v-for="(tag, i) in tags"
      :key="i"
    )
      tag(
        :is-readonly="isReadonly"
        :color="color"
        @remove="$emit('remove', i)"
      ) {{tag}}
</template>

<script>
export default {
  components: {
    Tag: () => import('components/Tag.vue')
  },
  props: {
    tags: {
      type: Array,
      default: () => []
    },
    isReadonly: {
      type: Boolean,
      default: true
    },
    color: {
      type: 'white' | 'grey',
      default: 'white'
    }
  }
}
</script>

<style lang="postcss" scoped>
@import '../../styles/mixins.pcss';

.tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap-reverse;
}

.tags__item {
  margin: 5px 8px;
  margin-left: 0;
  background-color: #fff;
  color: #283340;
  opacity: 0.7;
  font-size: 13px;
  font-weight: 700;
  line-height: 2.7;
  border-radius: 15px;
}
</style>