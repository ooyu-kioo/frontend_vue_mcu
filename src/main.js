import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import router from './router';
// Element-ui の読み込み、useの宣言
import './plugins/element.js';

Vue.config.productionTip = false;

new Vue({
	router,
	render: h => h(App)
}).$mount('#app');
