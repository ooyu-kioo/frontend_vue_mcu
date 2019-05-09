import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import MainList from './views/MainList.vue';
import test from './views/test.vue';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/about',
			name: 'about',
			component: () =>
				import(/* webpackChunkName: "about" */ './views/About.vue')
		},
		{
			path: '/main-list',
			name: 'mainList',
			component: MainList
		},
		{
			path: '/test',
			name: 'test',
			component: test
		}
	]
});
