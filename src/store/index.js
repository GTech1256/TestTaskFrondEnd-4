import Vue from 'vue';
import Vuex from 'vuex';
import starship from './modules/starship/index';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    starship, // for 5 min cache
  },
});
