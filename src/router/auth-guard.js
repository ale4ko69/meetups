import { store } from '../store';

export default (to, from, next) => {
	//console.log('from', from, 'to', to);
	//debugger;
	if (store.getters.user) {
		next();
	} else {
		next({
			path: '/signin',
			query: { redirect: to.fullPath }
		});
	}
};
