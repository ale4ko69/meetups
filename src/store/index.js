import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';
import router from '@/router';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		loadedMeetups: [],
		user: null,
		loading: false,
		error: null
	},
	mutations: {
		setLoadedMeetups(state, payload) {
			state.loadedMeetups = payload;
		},
		createMeetup(state, payload) {
			state.loadedMeetups.push(payload);
		},
		updateMeetup(state, payload) {
			const meetup = state.loadedMeetups.find(meetup => {
				return meetup.id === payload.id;
			});

			if (payload.title) {
				meetup.title = payload.title;
			}
			if (payload.location) {
				meetup.location = payload.location;
			}
			if (payload.description) {
				meetup.description = payload.description;
			}
			if (payload.date) {
				meetup.date = payload.date;
			}
			if (payload.imageUrl) {
				meetup.imageUrl = payload.imageUrl;
			}
		},
		setUser(state, payload) {
			state.user = payload;
		},
		setLoading(state, payload) {
			state.loading = payload;
		},
		setError(state, payload) {
			state.error = payload;
		},
		clearError(state) {
			state.error = null;
		}
	},
	actions: {
		loadMeetups({ commit }) {
			commit('setLoading', true);

			firebase
				.database()
				.ref('meetups')
				.once('value')
				.then(data => {
					const meetups = [];
					const obj = data.val();
					for (let key in obj) {
						meetups.push({
							id: key,
							title: obj[key].title,
							location: obj[key].location,
							description: obj[key].description,
							imageUrl: obj[key].imageUrl,
							date: obj[key].date,
							creatorId: obj[key].creatorId
						});
					}

					commit('setLoadedMeetups', meetups);
					commit('setLoading', false);
				})
				.catch(error => {
					console.log(error);
					commit('setLoading', false);
				});
		},
		createMeetup({ commit, getters }, payload) {
			const meetup = {
				title: payload.title,
				location: payload.location,
				// imageUrl: payload.imageUrl,
				description: payload.description,
				date: payload.date.toISOString(),
				creatorId: getters.user.id
			};
			let key, imageUrl;
			firebase
				.database()
				.ref('meetups')
				.push(meetup)
				.then(function(data) {
					key = data.key;
					return key;
				})
				.then(key => {
					const filename = payload.image.name;
					const ext = filename.slice(filename.lastIndexOf('.'));
					return firebase
						.storage()
						.ref('meetups/' + key + ext)
						.put(payload.image);
				})
				.then(fileData => {
					imageUrl = fileData.metadata.downloadURLs[0];
					return firebase
						.database()
						.ref('meetups')
						.child(key)
						.update({ imageUrl: imageUrl });
				})
				.then(() => {
					commit('createMeetup', {
						...meetup,
						imageUrl: imageUrl,
						id: key
					});
				})
				.catch(error => {
					console.log(error);
				});
		},
		updateMeetupData({ commit }, payload) {
			commit('setLoading', true);
			const updateObj = {};
			if (payload.title) {
				updateObj.title = payload.title;
			}
			if (payload.description) {
				updateObj.description = payload.description;
			}
			if (payload.location) {
				updateObj.location = payload.location;
			}
			if (payload.date) {
				updateObj.date = payload.date;
			}

			firebase
				.database()
				.ref('meetups')
				.child(payload.id)
				.update(updateObj)
				.then(() => {
					commit('setLoading', false);
					commit('updateMeetup', payload);
				})
				.catch(error => {
					console.log(error);
					commit('setLoading', false);
				});
		},
		updateMeetupImage({ commit }, payload) {
			commit('setLoading', true);

			if (!payload.image) {
				return false;
			}
			const filename =  payload.id + '.jpg';
			let imageUrl;

			firebase
				.storage()
				.ref('meetups/' + filename)
				.put(payload.image)
				.then(fileData => {
					imageUrl = fileData.metadata.downloadURLs[0];
					return firebase
						.database()
						.ref('meetups')
						.child(payload.id)
						.update({ imageUrl: imageUrl });
				})
				.then(() => {
					commit('setLoading', false);
					commit('updateMeetup', {
						imageUrl: imageUrl,
						id: payload.id
					});
				})
				.catch(error => {
					console.log(error);
					commit('setLoading', false);
				});
		},
		autoSignIn({ commit }, payload) {
			commit('setUser', { id: payload.uid, registeredMeetups: [] });
		},
		logout({ commit }) {
			firebase.auth().signOut();
			commit('setUser', null);
			router.push('/'); // Redirect to home after logout
		},
		signUserUp({ commit }, payload) {
			commit('setLoading', true);
			commit('clearError');

			firebase
				.auth()
				.createUserWithEmailAndPassword(payload.email, payload.password)
				.then(function(user) {
					commit('setLoading', false);
					const newUser = {
						id: user.uid,
						registeredMeetups: []
					};

					commit('setUser', newUser);
				})
				.catch(error => {
					// Create Alert component
					commit('setLoading', false);
					commit('setError', error);
				});
		},
		signUserIn({ commit }, payload) {
			commit('setLoading', true);
			commit('clearError');

			firebase
				.auth()
				.signInWithEmailAndPassword(payload.email, payload.password)
				.then(function(user) {
					commit('setLoading', false);
					const newUser = {
						id: user.uid,
						registeredMeetups: []
					};

					commit('setUser', newUser);
				})
				.catch(error => {
					// Create Alert component
					commit('setLoading', false);
					commit('setError', error);
					//console.log(error);
				});
		},
		clearError({ commit }) {
			commit('clearError');
		}
	},
	getters: {
		loadedMeetups(state) {
			return state.loadedMeetups.sort((meetupA, meetupB) => {
				return meetupA.date > meetupB.date;
			});
		},
		featuredMeetups(state, getters) {
			return state.loadedMeetups.sort((meetupA, meetupB) => {
				return meetupA.date > meetupB.date;
			}).slice(0, 5);
		},
		loadedMeetup(state) {
			return meetupId => {
				return state.loadedMeetups.find(meetup => {
					return meetup.id.toString() === meetupId;
				});
			};
		},
		user(state) {
			return state.user;
		},
		loading(state) {
			return state.loading;
		},
		error(state) {
			return state.error;
		}
	}
});
