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
import initfb from '@/firebase/initfb';
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

/*
 * By extending the Vue prototype with a new '$bus' property
 * we can easily access our global event bus from any child component.
 */
Object.defineProperty(Vue.prototype, '$bus', {
	get() {
		return this.$root.bus;
	}
});

// This empty Vue model will serve as our event bus.
var bus = new Vue({});

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>',
	data: {
		bus: bus
	},
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

/**
 *  // Register event listener
	this.$bus.$on('specialEvent', event => {
		this.msg = event.msg;
		alert(event.alert);
		console.log(event);
	});

	// emit the event and pass with it an object of "event data".
	this.$bus.$emit('specialEvent', {
		msg: 'This message came from the event.',
		alert: 'Alert! Alert! Alert!'
	});

 */
