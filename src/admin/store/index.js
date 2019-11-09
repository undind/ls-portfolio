import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import user from '@/store/modules/user';
import reviews from '@/store/modules/reviews';
import works from '@/store/modules/works';
import categories from '@/store/modules/categories';
import skills from '@/store/modules/skills';

export default new Vuex.Store({
  modules: {
    user,
    reviews,
    works,
    categories,
    skills
  }
});