<template lang="pug">
  section.my-reviews
    .admin-container
      .reviews__header
        .reviews__title {{$route.meta.title}}
      .my-reviews__card
        reviews-form(
          :current-review="currentReview"
        )
      .my-reviews__new
        gradient-button(
          :is-disabled="isShowForm && !currentReview"
          @click="addReview"
        ) Добавить #[br] отзыв
          //- button.my-reviews__button
          //-   icon.my-reviews__button-icon(name="Plus")
          //- .my-reviews__desc Добавить отзыв
        review-item(
          v-for="item in reviews"
          :key="item.id"
          :review="item"
          :is-active="item === currentReview"
        )
</template>

<script>
import reviews from "../../data/reviews.json";

export default {
  components: {
    ReviewsForm: () => import("components/ReviewsForm.vue"),
    ReviewItem: () => import("components/ReviewItem.vue"),
    GradientButton: () => import("components/GradientButton.vue"),
    Icon: () => import("components/Icon.vue")
  },
  data() {
    return {
      reviews: [],
      currentReview: null,
      isShowForm: false
    };
  },
  methods: {
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
    createReview(review) {
      console.log(review);
    }
  },
  created() {
    this.reviews = reviews;
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

  @include phones {
    padding: 0;
  }
}

.my-reviews__new {
  margin-top: 50px;
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