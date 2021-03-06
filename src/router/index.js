import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Meetups from '@/components/Meetup/Meetups';
import CreateMeetup from '@/components/Meetup/CreateMeetup';
import Profile from '@/components/User/Profile';
import Signin from '@/components/User/Signin';
import Signup from '@/components/User/Signup';
import Meetup from '@/components/Meetup/Meetup';
import AuthGuard from './auth-guard';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Hello',
			component: Home
		},
		{
			path: '/meetups',
			name: 'Meetups',
			component: Meetups
		},
		{
			path: '/meetup/new',
			name: 'CreateMeetup',
			component: CreateMeetup,
			beforeEnter: AuthGuard
		},
		{
			path: '/meetup/:id',
			name: 'Meetup',
			props: true,
			component: Meetup
		},
		{
			path: '/profile',
			name: 'Profile',
			component: Profile,
			beforeEnter: AuthGuard
		},
		{
			path: '/signup',
			name: 'Signup',
			component: Signup
		},
		{
			path: '/signin',
			name: 'Signin',
			component: Signin
		}
	],
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return { x: 0, y: 0 };
		}
	},
	mode: 'history'
});
