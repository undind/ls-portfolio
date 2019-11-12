<template lang="pug">
  .card
    category-control(
      slot="title"
      v-model="categoryTitle"
      :is-edit-mode="isEditMode"
      @edit="isEditMode = true"
      @cancel="onReset"
      @save="onSave"
    )
    .skill-group__new-skill
      new-skill(
        :is-disabled="true"
      )
</template>

<script>
export default {
  components: {
    CategoryControl: () => import('components/CategoryControl.vue'),
    NewSkill: () => import('components/NewSkill.vue'),
  },
  data() {
    return {
      isEditMode: true,
      categoryTitle: '',
    };
  },
  methods: {
    onReset() {
      this.$emit('reset');
    },
    onSave() {
      if (this.categoryTitle) {
        this.$emit('create-category', this.categoryTitle);
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
@import "../../styles/mixins.pcss";

.card {
  box-shadow: $admin-shadow;
  background-color: #ffffff;
  width: 100%;
  min-height: 387px;
  padding: 20px;
  display: grid;
  grid-template-rows: max-content 1fr max-content;

  @include phones {
    padding: 20px 0;
  }
}

.skill-group__new-skill {
  align-self: flex-end;
  margin-top: auto;
  margin-bottom: 14px;
}
</style>