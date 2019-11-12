<template lang="pug">
  form.new-skill__form(@submit.prevent="createSkill")
    .new-skill__title
      simple-input(
        v-model="title"
        :disabled="isDisabled"
        :error-message="validation.firstError('title')"
        placeholder="Новый навык"
      )
    .new-skill__percent
      simple-input(
        v-model="percent"
        :disabled="isDisabled"
        :error-message="validation.firstError('percent')"
        type="number"
        measure="%"
      )
    .new-skill__button
      basic-button(
        type="submit"
        icon="Plus"
        display="flat"
        :disabled="isDisabled"
        :circle="true"
      )
</template>

<script>
import SimpleVueValidation from 'simple-vue-validator';
const Validator = SimpleVueValidation.Validator;

export default {
  components: {
    SimpleInput: () => import('components/SimpleInput.vue'),
    BasicButton: () => import('components/BasicButton.vue')
  },
  props: {
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [SimpleVueValidation.mixin],
  data() {
    return {
      title: '',
      percent: 100,
    };
  },
  validators: {
    title: (value) => {
      return Validator.value(value).required('Введите навык');
    },
    percent: (value) => {
      return Validator.value(value).between(0, 100, 'Ошибка значения');
    },
  },
  methods: {
    createSkill() {
      this.$validate().then((success) => {
        if (success) {
          this.$emit('add', { title: this.title, percent: parseInt(this.percent) });
          this.resetSkillData();
          this.validation.reset();
        }
      });
    },
    resetSkillData() {
      this.title = '';
      this.percent = 100;
    },
  },
}
</script>

<style lang="postcss" scoped>
@import '../../styles/mixins.pcss';

.new-skill__form {
  display: flex;
  justify-content: flex-end;

  @include phones {
    justify-content: center;
    padding: 0 15px;
  }
}

.new-skill__title {
  flex-basis: 292px;
}

.new-skill__percent {
  margin-left: 10px;
  position: relative;
  width: 74px;
}

.new-skill__button {
  margin-left: 30px;
}
</style>