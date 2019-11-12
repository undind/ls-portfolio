import { generateStdError } from '@/helpers/errorHandler';

export default {
  namespaced: true,
  state: {
    reviews: []
  },
  mutations: {
    SET_REVIEWS: (state, reviews) => (state.reviews = reviews),
    DEL_REVIEW: (state, delReviewId) => {
      state.reviews = state.reviews.filter(review => review.id !== delReviewId);
    },
    ADD_REVIEW: (state, review) => state.reviews.push(review),
    EDIT_REVIEW: (state, editReview) => {
      state.reviews = state.reviews.map(review => {
        return review.id === editReview.id ? editReview : review;
      })
    }
  },
  actions: {
    async createReview({ commit }, review) {
      const intoFormData = (obj) => {
        const formData = new FormData();
        Object.keys(obj).forEach((key) => {
          formData.append(key, obj[key]);
        });

        return formData;
      }
      const data = intoFormData(review);
      
      try {
        const response = await this.$axios.post('/reviews', data);
        commit('ADD_REVIEW', response.data);
        return response;
      } catch (error) {
        generateStdError(error);
      }
    },
    async fetchReviews({ commit, rootGetters }) {
      try {
        const userId = rootGetters['user/userId'];
        const response = await this.$axios.get(`/reviews/${userId}`);
        commit('SET_REVIEWS', response.data);
        return response;
      } catch (error) {
        generateStdError(error);
      }
    },
    async deleteReview({ commit }, reviewId) {
      try {
        const response = await this.$axios.delete(`/reviews/${reviewId}`);
        commit('DEL_REVIEW', reviewId);
        return response;
      } catch (error) {
        generateStdError(error);
      }
    },
    async updateReview({ commit }, review) {
      const intoFormData = (obj) => {
        const formData = new FormData();
        Object.keys(obj).forEach((key) => {
          formData.append(key, obj[key]);
        });

        return formData;
      }
      const data = intoFormData(review);

      try {
        const response = await this.$axios.post(`/reviews/${review.id}`, data);
        commit('EDIT_REVIEW', response.data.review);
        return response;
      } catch (error) {
        generateStdError(error);
      }
    }
  }
}