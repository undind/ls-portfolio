<template lang="pug">
  .simple-input(
    :class="{ 'simple-input__disabled': disabled }"
  )
    .simple-input__label(v-if="label") {{ label }}
    input.simple-input__control(
      :type="type"
      :value="value"
      :min="minValue"
      :max="maxValue"
      :step="step"
      :readonly="readonly"
      :placeholder="placeholder"
      :class="inputClass"
      v-on="listeners"
    )
    .simple-input__measure(v-if="measure") {{ measure }}
    transition(name="slide-up")
      .simple-input__error(v-if="errorMessage")
        error-tooltip {{ errorMessage }}
</template>

<script>
export default {
  components: {
    ErrorTooltip: () => import("components/ErrorTooltip.vue")
  },
  props: {
    value: {
      type: String | Number,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    maxValue: {
      type: Number
    },
    minValue: {
      type: Number
    },
    step: {
      type: Number,
      default: 1
    },
    placeholder: {
      type: String,
      default: ""
    },
    errorMessage: {
      type: String,
      default: ""
    },
    readonly: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "text"
    },
    size: {
      type: String,
      default: "default"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    measure: {
      type: String,
      default: ""
    }
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: (event) => {
          if (!this.disabled) {
            this.$emit('input', event.target.value);
          }
        }
      }
    },
    inputClass() {
      return {
        [`simple-input__control_${this.size}`]: true,
        'simple-input__control_error': this.errorMessage,
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
@import '../../styles/mixins.pcss';

.simple-input {
  position: relative;
  width: 100%;
}

.simple-input__control {
  width: 100%;
  color: $text-color;
  font-size: 16px;
  font-weight: inherit;
  line-height: 42px;
  font-weight: 600;
  background: none;
  border: none;
  outline: transparent;
  border-bottom: 1px solid $text-color;
  transition: border 0.2s ease;

  &:focus {
    border-bottom-color: $accent-color;
  }

  &:read-only {
    border-color: transparent;
  }

  @include desktop {
    font-size: 14px;
  }
}

.simple-input__control_error,
.simple-input__control_error:focus {
  border-bottom-color: $danger-color;
}

.simple-input__control_large {
  font-size: 18px;
  font-weight: 600;
  line-height: 44px;

  &::placeholder {
    font-weight: 400;
  }
}

.simple-input__label {
  color: rgba($text-color, 0.5);
  margin-bottom: 8px;
  font-weight: 600;
}

.simple-input__measure {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}

.simple-input__disabled {
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(white, 0.8);
  }
}

.simple-input__error {
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 0;
}

.slide-up {
  &-enter-to,
  &-leave {
    transition: all 0.3s ease;
  }

  &-enter,
  &-leave-to {
    transform: translateY(50%);
    opacity: 0;
  }
}
</style>