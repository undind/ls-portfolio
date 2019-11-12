<template lang="pug">
  .tag(
    :class="`tag__${color}`"
  )
    .tag__text
      slot
    icon.tag__close(
      v-if="!isReadonly"
      name="Cross"
      @click.native="$emit('remove')"
    )
</template>

<script>
export default {
  components: {
    Icon: () => import('components/Icon.vue')
  },
  props: {
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

.tag {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #fff;
  color: #283340;;
  opacity: 0.7;
  font-size: 13px;
  font-weight: 700;
  line-height: 2.7;
  border-radius: 15px;
}

.tag__grey {
  background-color: #f4f4f4;
}

.tag__close {
  width: 11px;
  height: 11px;
  margin-left: 10px;
  fill: $text-color;
  transition: fill 0.2s ease;
  cursor: pointer;
  
  &:hover {
    fill: $danger-color;
  }
}
</style>