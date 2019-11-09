<template lang="pug">
  tr.skill
    td.skill__title
      simple-input(
        v-model="skillTitle"
        :readonly="!isEditMode"
        :error-message="validation.firstError('skillTitle')"
        placeholder="Название навыка"
        @keydown.enter="onSave"
      )
    td.skill__percent
      simple-input(
        v-model="skillPercent"
        :readonly="!isEditMode"
        :error-message="validation.firstError('skillPercent')"
        type="number"
        measure="%"
        @keydown.enter="onSave"
      )
    td.skill__controls
      .skill__buttons(v-if="isEditMode")
        button.skill__button.skill__button-save(
          key="save"
          @click="onSave"
        )
          icon(name="Tick")
        button.skill__button.skill__button-cancel(
          key="cancel"
          @click="onCancel"
        )
          icon(name="Cross")
      .skill__buttons(v-else)
        button.skill__button.skill__button-edit(
          key="edit"
          @click="onEdit"
        )
          icon(name="Pencil")
        button.skill__button.skill__button-remove(
          key="delete"
          @click="onDelete"
        )
          icon(name="Trash")
</template>

<script>
import SimpleVueValidation from 'simple-vue-validator';
const Validator = SimpleVueValidation.Validator;

export default {
  components: {
    SimpleInput: () => import('components/SimpleInput.vue'),
    Icon: () => import("components/Icon.vue")
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    percent: {
      type: Number,
      default: 100,
    },
  },
  mixins: [SimpleVueValidation.mixin],
  watch: {
    isEditMode(value) {
      if (value) {
        const inputElements = this.$el.querySelectorAll('input');
        inputElements[0].focus();
      }
    },
  },
  data() {
    return {
      isEditMode: false,
      skillTitle: '',
      skillPercent: '',
    };
  },
  validators: {
    skillTitle: (value) => {
      return Validator.value(value).required('Введите навык');
    },
    skillPercent: (value) => {
      return Validator.value(value).between(0, 100, 'Ошибка значения');
    },
  },
  methods: {
    onSave() {
      this.$validate().then((success) => {
        if (success) {
          this.$emit('save', { title: this.skillTitle, percent: this.skillPercent });
          this.isEditMode = false;
          this.validation.reset();
        }
      });
    },
    onCancel() {
      this.skillTitle = this.title;
      this.skillPercent = this.percent;
      this.isEditMode = false;
    },
    onDelete() {
      this.$emit('delete');
    },
    onEdit() {
      this.isEditMode = true;
    },
  },
  created() {
    this.skillTitle = this.title;
    this.skillPercent = this.percent;
  },
}
</script>

<style lang="postcss" scoped>
@import '../../styles/mixins.pcss';

.skill__percent {
  padding: 0 30px 0 20px;
  width: 124px;
}
.skill__controls {
  width: 70px;
}

.skill__buttons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.skill__button {
  padding: 0;
  margin: 0 10px;
  width: 16px;
  height: 16px;
  fill: $text-color;
  border: none;
  background: none;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
}

.skill__button-save {
  fill: #00d70a;
  opacity: 1;
  transition: opacity 0.2 ease;

  &:hover {
    opacity: 0.5;
  }
}

.skill__button-cancel {
  fill: #bf2929;
  opacity: 1;
  transition: opacity 0.2 ease;

  &:hover {
    opacity: 0.5;
  }
}
</style>