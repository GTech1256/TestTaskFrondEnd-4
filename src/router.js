import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      // path '/q?koko' be {query: 'koko'} in vue Template
      props: route => ({
        query: route.query.q,
        page: route.query.p ? parseInt(route.query.p, 10) : 1,
      }),
    },
    {
      path: '/starship/:id',
      name: 'starship',
      component: () => import('./views/StarshipDetails.vue'),
      props: route => ({ id: route.params.id }),
    },
  ],
});
