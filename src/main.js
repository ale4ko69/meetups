// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App';
import * as firebase from 'firebase';
import router from './router';
import { store } from './store';
import VeeValidate from 'vee-validate';
import AsyncComputed from 'vue-async-computed';
import initfb from '@/initfb';
import './components/Shared';
import './filters';

// *** Import Styles
import 'vuetify/dist/vuetify.min.css';
import '../static/style.css';

// Validation
const configVeVa = {
	errorBagName: 'vverrors', // change if property conflicts
	delay: 0,
	locale: 'en',
	events: 'input|blur',
	inject: true,
	validity: false,
	aria: true
};

Vue.use(Vuetify);
Vue.use(VeeValidate, configVeVa);
Vue.use(AsyncComputed);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>',
	created() {
		firebase.initializeApp(initfb);
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.$store.dispatch('autoSignIn', user);
			}
		});
		this.$store.dispatch('loadMeetups');
	}
});
