<template lang="pug">
  section.my-works
    .admin-container
      .works__header
        .works__title {{$route.meta.title}}
      .my-works__card(v-if="isShowForm")
        works-form(
          :current-work="currentWork"
          @reset="cencelWorkChanges"
          @create="createNewWork"
          @update="updateCurWork"
        )
      .my-works__new
        gradient-button(
          :is-disabled="isShowForm && !currentWork"
          @click="addWork"
        ) Добавить #[br] работу
        work-item(
          v-for="item in works"
          :key="item.id"
          :work="item"
          :is-active="item === currentWork"
          @edit="editWork(item)"
          @delete="deleteCurWork(item.id)"
        )
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    WorksForm: () => import("components/WorksForm.vue"),
    WorkItem: () => import("components/WorkItem.vue"),
    GradientButton: () => import("components/GradientButton.vue"),
    Icon: () => import("components/Icon.vue")
  },
  data() {
    return {
      currentWork: null,
      isShowForm: false
    };
  },
  computed: {
    ...mapState('works', { works: state => state.works })
  },
  methods: {
    ...mapActions('works', ['createWork', 'fetchWorks', 'deleteWork', 'updateWork']),
    async createNewWork(data) {
      try {
        await this.createWork(data);
      } catch (error) {
        console.log('Работы не была создана');
      }
      
      this.hideForm();
    },
    async deleteCurWork(id) {
      try {
        await this.deleteWork(id);
      } catch (error) {
        console.log('Работа не была удалена');
      }
    },
    async updateCurWork(data) {
      try {
        await this.updateWork(data);
      } catch (error) {
        console.log('Работы не была обновлена');
      }

      this.hideForm();
    },
    showForm() {
      this.isShowForm = true;
    },
    hideForm() {
      this.isShowForm = false;
    },
    addWork() {
      this.currentWork = null;
      this.showForm();
    },
    cencelWorkChanges() {
      this.currentWork = null;
      this.hideForm();
    },
    editWork(work) {
      this.currentWork = work;
      this.showForm();
    }
  },
  async created() {
    try {
      await this.fetchWorks();
    } catch (error) {
      console.log('Произошла ошибка при загрузке работ');
    }
  },
}
</script>

<style lang="postcss" scoped>
@import "../../styles/mixins.pcss";

.my-works {
  padding-top: 60px;
  padding-bottom: 100px;
}

.works__header {
  padding-bottom: 60px;

  @include tablets {
    padding-left: 15px;
  }
}

.works__title {
  font-size: 21px;
  font-weight: 700;
}

.my-works__card {
  box-shadow: $admin-shadow;
  background-color: #ffffff;
  padding: 30px;
  margin-bottom: 50px;

  @include phones {
    padding: 0;
  }
}

.my-works__new {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;

  @include desktop {
    grid-template-columns: 1fr 1fr;
  }

  @include tablets {
    grid-template-columns: 1fr;
  }
}
</style>