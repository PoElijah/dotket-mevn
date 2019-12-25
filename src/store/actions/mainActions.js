import Cookies from 'js-cookie';
export function fetchProducts () {
	return new Promise((res, rej) => {
		fetch('http://localhost:5000/api/products')
			.then(response => res(response.json()))
			// .then(response => res(response))
			.catch(err => {
				rej("Filed Fetch Products:" + err)
			})
	})
}
export function login (login, password) {
	const options = {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({email: login, password: password})
	};
	return new Promise((res, rej) => {
		fetch('http://localhost:5000/api/login', options)
			.then(response => {
				if (response.ok) {
					response.json()
						.then(user => {
							console.log(user);
							Cookies.set('_session', user.token);
							res(user)
						});
				} else { throw new Error('Invalid data') }
			})
			.catch(err => rej(err));
	});
}
export function getSession () {
	return new Promise((res, rej) => {
		const session = Cookies.get('_session');
		const options = {
			method: 'POST',
			headers: {'Content-Type': 'application/json', 'token': session},
		};
		if (session) {
			fetch('http://localhost:5000/api/login/me', options)
				.then(response => {
					if(response.ok) {
						response.json()
							.then(user => {
								res(user)
							})
					} else {
						throw new Error('Cant get by token');
					}
				})
				.catch(err => res(err))
		} else {
			rej('Not Logged');
		}

	})
}
export function logOut() {
	Cookies.remove('_session');
}
export function registerUser(user) {
	return new Promise((res, rej) => {
		const options = {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(user)
		};
		fetch('http://localhost:5000/api/register', options)
			.then(response => {
				if(response.ok) {
					res(response.json());
				} else {
					response.text()
						.then(status => rej(status));
				}
			})
			.catch(err => rej(err))
	})
}