import { generateStdError } from '@/helpers/errorHandler';

export default {
  namespaced: true,
  state: {
    user: {}
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    },
    RESET_USER: (state) => {
      state.user = {};
    }
  },
  getters: {
    userIsLogged: state => {
      const userObj = state.user;
      const userObjIsEmpty = Object.keys(userObj).length === 0 && userObj.constructor === Object;
      
      return userObjIsEmpty === false;
    },
    userId: state => {
      return state.user.id;
    }
  },
  actions: {
    async logOut({ commit }, value) {
      try {
        const response = await this.$axios.post('/logout');
        localStorage.removeItem("token");
        commit('RESET_USER');
        return response;
      } catch (error) {
        generateStdError(error);
      }
    }
  }
}