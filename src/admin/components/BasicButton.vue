<template lang="pug">
  button.basic-button(
     :class="buttonClass"
     :type="type"
     :disabled="disabled"
     v-on="listeners"
    )
    .basic-button__icon-wrapper(v-if="icon")
      icon.basic-button__icon(:name="icon")
    .basic-button__text
      slot
</template>

<script>
  import Icon from './Icon.vue'

  export default {
    components: {
      Icon
    },
    props: {
      theme: {
        type: 'primary' | 'default',
        default: 'primary'
      },
      type: {
        type: String,
        default: 'button'
      },
      display: {
        type: 'filled' | 'border' | 'flat',
        default: 'filled'
      },
      size: {
        type: 'large' | 'default' | 'small',
        default: 'default'
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      bordered: {
        type: Boolean,
        default: false,
      },
      circle: {
        type: Boolean,
        default: false,
      },
      icon: {
        type: String,
        default: '',
      },
    },
    computed: {
      listeners() {
        return {
          ...this.$listeners,
          click: (event) => {
            if (!this.disabled) {
              this.$emit('click', event)
            }
          }
        };
      },
      buttonClass() {
        return {
          'basic-button__circle': this.circle,
          'basic-button__disabled': this.disabled,
          'basic-button__bordered': this.bordered,
          [`basic-button__${this.size}`]: true,
          [`basic-button__${this.display}`]: true,
          [`basic-button__${this.theme}`]: true,
        }
      }
    },
  }
</script>