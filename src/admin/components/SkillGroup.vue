<template lang="pug">
  .card
    category-control(
      slot="title"
      v-model="categoryTitle"
      :is-edit-mode="isEditMode"
      @edit="isEditMode = true"
      @cancel="onResetCategoryChanges"
      @delete="onDeleteSkillGroup"
      @save="onSaveCategoryChanges"
    )
    table.skill-group__skills-table
      skill-row(
        v-for="skill in skills"
        :key="skill.id"
        :title="skill.title"
        :percent="skill.percent"
        @save="onUpdateSkill(skill, $event)"
        @delete="$emit('delete-skill', skill.id)"
      )
    .skill-group__new-skill
      new-skill(
        @add="$emit('add-skill', $event)"
      )
</template>

<script>
export default {
  components: {
    CategoryControl: () => import('components/CategoryControl.vue'),
    NewSkill: () => import('components/NewSkill.vue'),
    SkillRow: () => import('components/SkillRow.vue'),
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    categoryId: {
      type: Number,
      default: 0,
    },
    skills: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      categoryTitle: '',
      isEditMode: false,
    };
  },
  methods: {
    onUpdateSkill(prevValue, nextValue) {
      if (prevValue.title === nextValue.title && prevValue.percent === nextValue.percent) {
        return;
      }
      this.$emit('update-skill', { ...prevValue, ...nextValue });
    },
    onResetCategoryChanges() {
      this.categoryTitle = this.title;
      this.isEditMode = false;
    },
    onSaveCategoryChanges() {
      this.$emit('update-category', this.categoryTitle);
      this.isEditMode = false;
    },
    onDeleteSkillGroup() {
      this.$emit('delete-group');
    },
  },
  created() {
    this.categoryTitle = this.title;
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

.skill-group__skills-table {
  padding-top: 20px;

  @include phones {
    padding-left: 15px;
  }
}
</style>