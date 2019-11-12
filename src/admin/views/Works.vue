<template lang="pug">
  .works__loader(v-if="isLoading")
    pulse-loader(
      :color="accentColor"
      :size="50"
    )
  section.my-works(v-else)
    .admin-container
      .works__header
        .works__title {{$route.meta.title}}
      .my-works__card(v-if="isShowForm")
        works-form(
          :is-sending="isSendingForm"
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
import { PulseLoader } from '@saeris/vue-spinners';
import * as variables from '../../styles/variables.json';

export default {
  components: {
    WorksForm: () => import("components/WorksForm.vue"),
    WorkItem: () => import("components/WorkItem.vue"),
    GradientButton: () => import("components/GradientButton.vue"),
    Icon: () => import("components/Icon.vue"),
    PulseLoader
  },
  data() {
    return {
      currentWork: null,
      isShowForm: false,
      isSendingForm: false,
      isLoading: false,
      accentColor: variables['admin-color'],
    };
  },
  computed: {
    ...mapState('works', { works: state => state.works })
  },
  methods: {
    ...mapActions('tooltips', ['showTooltip']),
    ...mapActions('works', ['createWork', 'fetchWorks', 'deleteWork', 'updateWork']),
    async createNewWork(data) {
      this.isSendingForm = true;

      try {
        await this.createWork(data);
        this.showTooltip({ type: 'success', text: 'Работа успешно создана', duration: 3000 });
      } catch (error) {
        this.showTooltip({ type: 'error', text: error.message, duration: 3000 });
      } finally {
        this.isSendingForm = false;
      }
      
      this.hideForm();
    },
    async deleteCurWork(id) {
      try {
        await this.deleteWork(id);
        this.showTooltip({ type: 'success', text: 'Работа успешно удалена', duration: 3000 });
      } catch (error) {
        this.showTooltip({ type: 'error', text: error.message, duration: 3000 });
      }
    },
    async updateCurWork(data) {
      this.isSendingForm = true;

      try {
        await this.updateWork(data);
        this.showTooltip({ type: 'success', text: 'Работа успешно обновлена', duration: 3000 });
      } catch (error) {
        this.showTooltip({ type: 'error', text: error.message, duration: 3000 });
      } finally {
        this.isSendingForm = false;
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
    },
    async fetchData() {
      this.isLoading = true;
      try {
        await this.fetchWorks();
      } catch (e) {
        this.showTooltip({ type: 'error', text: 'Произошла ошибка при загрузке работ', duration: 3000 });
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

.my-works {
  padding-top: 60px;
  padding-bottom: 100px;
}

.works__loader {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
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