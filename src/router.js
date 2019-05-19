import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import MainList from './views/MainList.vue';
import ModalFrame from './views/ModalFrame.vue';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'mainList',
			component: MainList
		},
		{
			path: '/about',
			name: 'about',
			component: () =>
				import(/* webpackChunkName: "about" */ './views/About.vue')
		},
		{
			path: '/modal-frame',
			name: 'modalFrame',
			component: ModalFrame
		}
	]
});
