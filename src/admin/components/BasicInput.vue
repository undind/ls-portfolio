<template lang="pug">
  .basic-input(:class="`basic-input_${theme}`")
    input.basic-input__control(
      :type="type"
      :value="value"
      :required="required"
      :class="inputClass"
      v-on="listeners"
    )
    .basic-input__icon(v-if="icon")
      icon(:name="icon")
    label.basic-input__label {{ label }}
    transition(name="slide-up")
      .basic-input__error(v-if="errorMessage") {{ errorMessage }}
</template>

<script>
  import Icon from './Icon.vue';
  
  export default {
    components: {
      Icon,
    },
    props: {
      value: {
        type: String,
        default: '',
      },
      errorMessage: {
        type: String,
        default: '',
      },
      required: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      icon: {
        type: String,
        default: '',
      },
      label: {
        type: String,
        default: '',
      },
      theme: {
        type: String,
        default: 'dark',
      },
      type: {
        type: String,
        default: 'text',
      },
    },
    computed: {
      listeners() {
        return {
          ...this.$listeners,
          input: (event) => {
            if (!this.disabled) {
              this.$emit('input', event.target.value);
            }
          },
        };
      },
      inputClass() {
        return {
          'basic-input__control_dirty': this.value.length,
          'basic-input__control_disabled': this.disabled,
          'basic-input__control_invalid': this.errorMessage,
        };
      },
    },
  };
</script>