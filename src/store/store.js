import {fetchProducts, getSession, login, logOut} from "@/store/actions/mainActions";
import {router} from "./../main"

export default {
	state: {
		products: [],
		errors: 'Error',
		logged: false,
		user: {}
	},
	getters: {
		products(state) {
			return state.products
		},
		errors(state) {
			return state.errors
		},
		user(state) {
			return state.user
		},
		logged(state) {
			return state.logged
		}
	},
	mutations: {
		MUTATE_PRODUCTS: (state, payload) => {
			state.products = payload
		},
		MUTATE_ERRORS: (state, payload) => {
			state.errors = payload
		},
		MUTATE_USER: (state, payload) => {
			state.user = payload
		},
		MUTATE_LOGGED: (state, payload) => {
			state.logged = payload
		}
	},
	actions: {
		getProducts(context) {
			fetchProducts()
				.then(res => context.commit('MUTATE_PRODUCTS', res))
				.catch(err => context.commit('MUTATE_ERRORS', err))
		},
		login(context, user) {
			login(user.email, user.password)
				.then(res => {
					context.commit('MUTATE_LOGGED', true);
					context.commit('MUTATE_USER', res);
					router.go(-1);
				})
				.catch(err => context.commit('MUTATE_ERRORS', err))
		},
		getSession(context) {
			getSession()
				.then(res => {
					context.commit('MUTATE_LOGGED', true);
					context.commit('MUTATE_USER', res);
				})
				.catch(err => context.commit('MUTATE_ERRORS', err));
		},
		logout(context) {
			logOut();
			context.commit('MUTATE_USER', {});
			context.commit('MUTATE_LOGGED', false);
		},
	}
}