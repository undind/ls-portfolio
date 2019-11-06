<template lang="pug">
  section.my-reviews
    .admin-container
      .reviews__header
        .reviews__title {{$route.meta.title}}
      .my-reviews__card(v-if="isShowForm")
        reviews-form(
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

export default {
  components: {
    ReviewsForm: () => import("components/ReviewsForm.vue"),
    ReviewItem: () => import("components/ReviewItem.vue"),
    GradientButton: () => import("components/GradientButton.vue"),
  },
  data() {
    return {
      currentReview: null,
      isShowForm: false
    };
  },
  computed: {
    ...mapState('reviews', { reviews: state => state.reviews })
  },
  methods: {
    ...mapActions('reviews', ['createReview', 'fetchReviews', 'deleteReview', 'updateReview']),
    async createNewReview(data) {
      try {
        await this.createReview(data);
      } catch (error) {
        console.log('Отзыв не был создан');
      }

      this.hideForm();
    },
    async updateCurReview(data) {
      try {
        await this.updateReview(data);
        console.log(data);
      } catch (error) {
        console.log('Отзыв не был обновлен');
      }

      this.hideForm();
    },
    async deleteCurReview(id) {
      try {
        await this.deleteReview(id);
      } catch (error) {
        console.log('Отзыв не был удален');
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
  },
  async created() {
    try {
      await this.fetchReviews();
    } catch (error) {
      console.log('Произошла ошибка при загрузке отзывов');
    }
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