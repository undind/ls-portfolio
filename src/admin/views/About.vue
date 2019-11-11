<template lang="pug">
  .about__loader(v-if="isLoading")
      pulse-loader(
        :color="accentColor"
        :size="50"
      )
  section.about-section(v-else)
    .admin-container
      .about__header
        h1.about__title {{$route.meta.title}}
        .about__header-add(v-if="!isShowNewSkill")
          button(
            type="button"
            @click="showNewSkill"
          ).about__header-btn
            .about__header-btn-wrap
              icon.about__header-icon(name="Plus")
            .about__header-btn-text Добавить группу
      .about__content
        .about__skill-group(v-if="isShowNewSkill")
          new-skill-group(
            @create-category="createCategory"
            @reset="isShowNewSkill = false"
          )
        .about__skill-group(v-for="category in categories")
          skill-group(
            :key="category.id"
            :title="category.category"
            :category-id="category.id"
            :skills="skillsByCategory[category.id]"
            @update-category="updateCategory(category.id, $event)"
            @delete-group="deleteSkillGroup(category.id)"
            @add-skill="createSkill(category.id, $event)"
            @update-skill="updateSkill"
            @delete-skill="deleteSkill"
          )
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { PulseLoader } from '@saeris/vue-spinners';
import * as variables from '../../styles/variables.json';

export default {
   components: {
    NewSkillGroup: () => import("components/NewSkillGroup.vue"),
    SkillGroup: () => import("components/SkillGroup.vue"),
    Icon: () => import("components/Icon.vue"),
    PulseLoader
  },
  data() {
    return {
      isShowNewSkill: false,
      isLoading: false,
      accentColor: variables['admin-color'],
    };
  },
  computed: {
    ...mapState('skills', {
      categories: (state) => state.categories,
      skills: (state) => state.skills,
    }),
    skillsByCategory() {
      const result = {};
      this.categories.forEach((category) => {
        result[category.id] = [];
      });
      this.skills.forEach((skill) => {
        if (result[skill.category]) {
          result[skill.category].push(skill);
        }
      });
      return result;
    },
  },
  methods: {
    ...mapActions('tooltips', ['showTooltip']),
    ...mapActions('skills', [
      'fetchSkills',
      'addSkill',
      'editSkill',
      'removeSkill',
      'fetchCategories',
      'addNewSkillGroup',
      'updateSkillGroup',
      'removeSkillGroup',
    ]),
    showNewSkill() {
      this.isShowNewSkill = true;
    },
    hideNewSkill() {
      this.isShowNewSkill = false;
    },
    async createCategory(value) {
      try {
        await this.addNewSkillGroup(value);
        this.showTooltip({ type: 'success', text: 'Группа успешно добавлена', duration: 3000 });
      } catch (e) {
        this.showTooltip({ type: 'error', text: e.message, duration: 3000 });
      }
      this.isShowNewSkill = false;
    },
    async updateCategory(id, title) {
      const sourceCategory = this.categories.find((item) => item.id);
      if (sourceCategory && sourceCategory.category === title) {
        return;
      }
      try {
        await this.updateSkillGroup({ id, title });
        this.showTooltip({ type: 'success', text: 'Группа успешно обновлена', duration: 3000 });
      } catch (e) {
        this.showTooltip({ type: 'error', text: e.message, duration: 3000 });
      }
    },
    async createSkill(category, data) {
      try {
        await this.addSkill({ ...data, category });
        this.showTooltip({ type: 'success', text: 'Навык успешно добавлен', duration: 3000 });
      } catch (e) {
        this.showTooltip({ type: 'error', text: e.message, duration: 3000 });
      }
    },
    async updateSkill(data) {
      try {
        await this.editSkill(data);
        this.showTooltip({ type: 'success', text: 'Навык успешно обновлен', duration: 3000 });
      } catch (e) {
        this.showTooltip({ type: 'error', text: e.message, duration: 3000 });
      }
    },
    async deleteSkill(id) {
      try {
        this.removeSkill(id);
        await this.showTooltip({ type: 'success', text: 'Навык успешно удален', duration: 3000 });
      } catch (e) {
        this.showTooltip({ type: 'error', text: e.message, duration: 3000 });
      }
    },
    async deleteSkillGroup(id) {
      try {
        await this.removeSkillGroup(id);
        this.showTooltip({ type: 'success', text: 'Группа успешно удалена', duration: 3000 });
      } catch (e) {
        this.showTooltip({ type: 'error', text: e.message, duration: 3000 });
      }
    },
    async fetchData() {
      this.isLoading = true;
      try {
        await Promise.all([this.fetchSkills(), this.fetchCategories()]);
      } catch (e) {
        this.showTooltip({ type: 'error', text: 'Произошла ошибка при загрузке данных', duration: 3000 });
      } finally {
        this.isLoading = false;
      }
    },
  },
  created() {
    this.fetchData();
  },
}
</script>

<style lang="postcss" scoped>
@import "../../styles/mixins.pcss";

.about-section {
  padding: 60px 0;
  position: relative;
}

.about__loader {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.about__header {
  padding-bottom: 60px;
  display: flex;
  align-items: center;

  @include tablets {
    padding-left: 15px;
  }

  @include phones {
    flex-direction: column;
    align-items: flex-start;
  }
}

.about__title {
  font-size: 21px;
  font-weight: 700;
}

.about__content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;

  @include tablets {
    grid-template-columns: 1fr;
  }
}

.about__header-add {
  margin-left: 60px;

  @include phones {
    margin-left: 0;
    margin-top: 25px;
  }
}

.about__header-btn-wrap {
  width: 21px;
  height: 21px;
  border-radius: 50%;
  background-image: $admin-gradient;
  margin-right: 15px;
}

.about__header-btn {
  display: flex;
  align-items: center;
  background: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
}

.about__header-icon {
  width: 8px;
  height: 8px;
  fill: #fff;
}

.about__header-btn-text {
  color: $admin-color;
  font-size: 16px;
  font-weight: 700;
}
</style>