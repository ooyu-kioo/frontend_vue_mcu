import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import router from './router';
// Element-ui の読み込み、useの宣言
import './plugins/element.js';

Vue.config.productionTip = false; // 製品情報の表示切替
Vue.config.devtools = true // 本番・開発切り替え(chromeのVue devtoolの使用切り替え)

new Vue({
	router,
	render: h => h(App)
}).$mount('#app');
