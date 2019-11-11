<template lang="pug">
  .reviews__loader(v-if="isLoading")
    pulse-loader(
      :color="accentColor"
      :size="50"
    )
  section.my-reviews(v-else)
    .admin-container
      .reviews__header
        .reviews__title {{$route.meta.title}}
      .my-reviews__card(v-if="isShowForm")
        reviews-form(
          :is-sending="isSendingForm"
          :current-review="currentReview"
          @reset="cancelReviewChanges"
          @create="createNewReview"
          @update="updateCurReview"
        )
      .my-reviews__new
        gradient-button(
          :is-disabled="isShowForm && !currentReview"
          @click="addReview"
        ) Добавить #[br] отзыв
        review-item(
          v-for="item in reviews"
          :key="item.id"
          :review="item"
          :is-active="item === currentReview"
          @edit="editReview(item)"
          @delete="deleteCurReview(item.id)"
        )
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { PulseLoader } from '@saeris/vue-spinners';
import * as variables from '../../styles/variables.json';

export default {
  components: {
    ReviewsForm: () => import("components/ReviewsForm.vue"),
    ReviewItem: () => import("components/ReviewItem.vue"),
    GradientButton: () => import("components/GradientButton.vue"),
    PulseLoader
  },
  data() {
    return {
      currentReview: null,
      isShowForm: false,
      isSendingForm: false,
      isLoading: false,
      accentColor: variables['admin-color'],
    };
  },
  computed: {
    ...mapState('reviews', { reviews: state => state.reviews })
  },
  methods: {
    ...mapActions('tooltips', ['showTooltip']),
    ...mapActions('reviews', ['createReview', 'fetchReviews', 'deleteReview', 'updateReview']),
    async createNewReview(data) {
      this.isSendingForm = true;

      try {
        await this.createReview(data);
        this.showTooltip({ type: 'success', text: 'Отзыв успешно создан', duration: 3000 });
      } catch (error) {
        this.showTooltip({ type: 'success', text: e.message, duration: 3000 });
      } finally {
        this.isSendingForm = false;
      }

      this.hideForm();
    },
    async updateCurReview(data) {
      this.isSendingForm = true;

      try {
        await this.updateReview(data);
        this.showTooltip({ type: 'success', text: 'Отзыв успешно обновлен', duration: 3000 });
      } catch (error) {
        this.showTooltip({ type: 'error', text: e.message, duration: 3000 });
      } finally {
        this.isSendingForm = false;
      }

      this.hideForm();
    },
    async deleteCurReview(id) {
      try {
        await this.deleteReview(id);
        this.showTooltip({ type: 'success', text: 'Отзыв успешно удален', duration: 3000 });
      } catch (error) {
        this.showTooltip({ type: 'error', text: e.message, duration: 3000 });
      }
    },
    showForm() {
      this.isShowForm = true;
    },
    hideForm() {
      this.isShowForm = false;
    },
    addReview() {
      this.currentReview = null;
      this.showForm();
    },
    cancelReviewChanges() {
      this.currentReview = null;
      this.hideForm();
    },
    editReview(review) {
      this.currentReview = review;
      this.showForm();
    },
    async fetchData() {
      this.isLoading = true;

      try {
        await this.fetchReviews();
      } catch (e) {
        this.showTooltip({ type: 'error', text: 'Произошла ошибка при загрузке отзывов', duration: 3000 });
      } finally {
        this.isLoading = false;
      }
    }
  },
  created() {
    this.fetchData();
  }
}
</script>

<style lang="postcss" scoped>
@import "../../styles/mixins.pcss";

.my-reviews {
  padding-top: 60px;
  padding-bottom: 40px;
}

.reviews__header {
  padding-bottom: 60px;

  @include tablets {
    padding-left: 15px;
  }
}

.reviews__loader {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.reviews__title {
  font-size: 21px;
  font-weight: 700;
}


.my-reviews__card {
  box-shadow: 4px 3px 20px rgba(0, 0, 0, 0.07);
  background-color: #ffffff;
  padding: 30px;
  margin-bottom: 50px;

  @include phones {
    padding: 0;
  }
}

.my-reviews__new {
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