export default {
  namespaced: true,
  state: {
    works: []
  },
  mutations: {
    SET_WORKS: (state, works) => state.works = works,
    ADD_WORK: (state, work) => state.works.push(work),
    DEL_WORK: (state, delWorkId) => {
      state.works = state.works.filter(work => work.id !== delWorkId);
    },
    EDIT_WORK: (state, editWork) => {
      state.works = state.works.map(work => {
        return work.id === editWork.id ? editWork : work;
      });
    }
  },
  actions: {
    async createWork({ commit }, work) {
      const intoFormData = (obj) => {
        const formData = new FormData();
        Object.keys(obj).forEach((key) => {
          formData.append(key, obj[key]);
        });

        return formData;
      }
      const data = intoFormData(work);

      try {
        const response = await this.$axios.post('/works', data);
        commit('ADD_WORK', response.data);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchWorks({ commit, rootGetters }) {
      try {
        const userId = rootGetters['user/userId'];
        const response = await this.$axios.get(`/works/${userId}`);
        commit('SET_WORKS', response.data);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteWork({ commit }, workId) {
      try {
        const response = await this.$axios.delete(`/works/${workId}`);
        commit('DEL_WORK', workId);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    async updateWork({ commit }, work) {
      const intoFormData = (obj) => {
        const formData = new FormData();
        Object.keys(obj).forEach((key) => {
          formData.append(key, obj[key]);
        });

        return formData;
      }
      const data = intoFormData(work);

      try {
        const response = await this.$axios.post(`/works/${work.id}`, data);
        commit('EDIT_WORK', response.data.work);
        return response;
      } catch (error) {
        console.log(error);
      }
    }
  }
}