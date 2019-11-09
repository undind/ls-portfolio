<template lang="pug">
  .card__header.skill-group
    .skill-group__title
      simple-input(
        :value="value"
        :readonly="!isEditMode"
        :error-message="validation.firstError('value')"
        size="large"
        placeholder="Название новой группы"
        @input="$emit('input', $event)"
        @keydown.enter="save"
      )
    .skill-group__controls
      template(v-if="!isEditMode")
        button(
          key="edit"
          @click="$emit('edit')"
        ).skill-group__button
          icon.skill-group__icon.skill-group__pencil(name="Pencil")
        button(
          key="delete"
          @click="$emit('delete')"
        ).skill-group__button
          icon.skill-group__icon.skill-group__trash(name="Trash")
      template(v-else)
        button(
          key="save"
          @click="save"
        ).skill-group__button
          icon.skill-group__icon.skill-group__accept(name="Tick")
        button(
          key="cancel"
          @click="$emit('cancel')"
        ).skill-group__button
          icon.skill-group__icon.skill-group__delete(name="Cross")
</template>

<script>
import SimpleVueValidation from 'simple-vue-validator';
const Validator = SimpleVueValidation.Validator;

export default {
  components: {
    SimpleInput: () => import('components/SimpleInput.vue'),
    Icon: () => import("components/Icon.vue")
  },
  mixins: [SimpleVueValidation.mixin],
  props: {
    value: {
      type: String,
      default: ''
    },
    isEditMode: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isEditMode(value) {
      if (value) {
        const inputElements = this.$el.querySelectorAll('input');
        inputElements[0].focus();
      }
    }
  },
  validators: {
    value: (value) => {
      return Validator.value(value).required('Введите название группы');
    },
  },
  methods: {
    save() {
      this.$validate().then(success => {
        if (success) {
          this.$emit('save');
          this.validation.reset();
        }
      })
    }
  },
}
</script>

<style lang="postcss" scoped>
@import "../../styles/mixins.pcss";

.card__header {
  padding: 0 12px 14px 0;
  border-bottom: 1px solid rgba(#1f232d, 0.15);

  @include phones {
    padding: 0 15px 20px 15px;
  }
}

.skill-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skill-group__button {
  border: 0;
  background-color: #fff;
  padding: 0;
  margin-right: 20px;

  @include phones {
    margin-right: 10px;
  }

  &:last-child {
    margin-right: 0;
  }
}

.skill-group__icon {
  width: 16px;
  height: 15px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
}

.skill-group__accept {
  fill: #00d70a;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.5;
  }
}

.skill-group__delete {
  fill: #bf2929;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.5;
  }
}

.skill-group__pencil,
.skill-group__trash {
  fill: $text-color;
  opacity: 0.5;
}
</style>