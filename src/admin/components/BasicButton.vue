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

<style lang="postcss" scoped>
  @import '../../styles/mixins.pcss';

  .basic-button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 32px 120px;
    background-image: $primary-gradient;
    color: white;
    font-size: 18px;
    font-weight: 700;
    border-radius: 40px 5px;
    transition: background-image 0.2s ease;
    z-index: 10;
    outline: none;
    cursor: pointer;
    
    @include phones {
      width: 100%;
      padding: 24px 50px;
      border-radius: 30px 0;
    }

    &:before {
      border-radius: inherit;
      background-image: $reverse-gradient;
      content: '';
      height: 100%;
      position: absolute;
      top: 0; 
      left: 0;
      opacity: 0;
      width: 100%;
      z-index: -100;
      transition: opacity 0.35s ease;
    }

    &:not(.basic-button__disabled):hover {
      &::before {
        opacity: 1;
      }
    }

    &__disabled {
      cursor: default;

      /* &:hover {
        background-image: none;
      } */
      
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(#fff, 0.3);
      }
    }

    &__flat {
      background-image: none;
      transition: all 0.2s ease;
      &:not(.basic-button_disabled):hover {
        background-image: none;
        opacity: 0.8;
      }
    }

    &__small {
      font-size: 16px;
      padding: 21px 40px;
    }

    &__small &__text {
      padding: 0 13px;
    }

    &__small&__bordered {
      border-radius: 30px;
    }

    &__primary&__flat &__text {
      color: $accent-color;
    }

    &__circle {
      background: none;
      padding: 0;

      &:hover {
        opacity: 0.7;
      }
      
      &:before {
        background-image: none;
      }
    }

    &__circle &__icon-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-image: $admin-gradient;
      transition: opacity 0.2s ease;
    }

    &__circle:hover &__icon-wrapper {
      background-image: $admin-gradient;
    }

    &__circle:hover &__text {
      opacity: 0.9;
    }

    &__small&__circle &__icon-wrapper {
      width: 21px;
      height: 21px;
    }

    &__circle&__disabled &__icon-wrapper {
      cursor: default;
      opacity: 0.3;
    }

    &__icon {
      width: 15px;
      height: 15px;
      fill: white;
    }

    &__small &__icon {
      width: 8px;
      height: 8px;
    }
}
</style>