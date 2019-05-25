import Vue from 'vue';
import Router from 'vue-router';
import MainList from './views/MainList.vue';
import ModalFrame from './views/ModalFrame.vue';
import Test from './views/Test.vue';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'mainList',
			component: MainList
		},
		{
			path: '/test',
			name: 'test',
			component: Test
		},
		{
			path: '/modal-frame',
			name: 'modalFrame',
			component: ModalFrame
		}
	]
});
