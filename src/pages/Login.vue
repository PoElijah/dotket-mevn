<template>
    <div class="loginPage">
        <div class="loginPage__links">
            <span @click="tab = 'signin'" v-bind:class="`loginPage__tab ${tab === 'signin' ? 'loginPage__tab--active' : ''}`">
                Sign in
            </span>
            /
            <span @click="tab = 'signup'" v-bind:class="`loginPage__tab ${tab === 'signup' ? 'loginPage__tab--active' : ''}`">
                Sign up
            </span>
        </div>
        <template v-if="tab === 'signin'">
            <form @submit.prevent="acceptForm" class="loginPage__content">
                <label class="customForm">
                    <input type="text" v-model="login" class="customForm__input" placeholder="Email">
                </label>
                <label class="customForm">
                    <input type="password" v-model="password" class="customForm__input" placeholder="Password">
                </label>
                <div class="loginPage__btn">
                    <button type="submit" class="customButton">Login</button>
                </div>
            </form>
        </template>
        <template v-if="tab === 'signup'">
            <div v-if="errors">
                <ul>
                    <li v-for="(fieldsErrors, fieldName) in errors" :key="fieldName">
                        {{fieldName}}:{{fieldsErrors && fieldsErrors.join('\n')}}
                    </li>
                </ul>
            </div>
            <form @submit.prevent="registerUser" class="loginPage__content">
                <label class="customForm">
                    <input type="text" v-model="register.name.first" class="customForm__input" placeholder="First Name">
                </label>
                <label class="customForm">
                    <input type="text" v-model="register.name.last" class="customForm__input" placeholder="Last Name">
                </label>
                <label class="customForm">
                    <input type="text" v-model="register.name.nickname" class="customForm__input" placeholder="Nickname">
                </label>
                <label class="customForm">
                    <input type="text" v-model="register.email" class="customForm__input" placeholder="Email">
                </label>
                <label class="customForm">
                    <input type="password" v-model="register.password" class="customForm__input" placeholder="Password">
                </label>
                <label class="customForm">
                    <input type="password" v-model="register.password_confirm" class="customForm__input" placeholder="Confirm Password">
                </label>
                <button class="customButton" type="submit">Sign up</button>
            </form>
        </template>
    </div>
</template>

<script>
    import validate from 'validate.js'
	import {registerUser} from "@/store/actions/mainActions";
	export default {
		name: "Login",
		data: function () {
			return {
				login: '',
                password: '',
                register: {
					name: {
						first: '',
                        last: '',
                        nickname: ''
                    },
					email: '',
                    password: '',
                    password_confirm: '',
                },
                errors: '',
                tab: 'signin'
            }
		},
        methods: {
			acceptForm: function () {
                this.$store.dispatch('login', {email: this.login, password: this.password})
            },
            registerUser: function () {
				const constraints = this.getConstraints();
				const register_errors = validate(this.$data.register, constraints);
				if (register_errors) {
					this.errors = register_errors;
                } else if (this.register.password !== this.register.password_confirm) {
					this.errors = {password: ['Incorrect password confirmation']}
                } else {
					this.errors = '';
					const user = {
						name: this.register.name,
                        email: this.register.email,
                        password: this.register.password
                    };
					registerUser(user)
						.then(() => {
							this.login = user.email;
							this.password = user.password;
							this.tab = 'signin';
						})
						.catch(err => this.errors = {server: [err]});

                }
            },
            getConstraints() {
				return {
					"name.first": {
						presence: true,
                        length: {
							minimum: 3,
							maximum: 100
                        }
                    },
                    "name.last": {
						presence: true,
						length: {
							minimum: 3,
							maximum: 100
						}
                    },
                    email: {
						presence: true,
                        email: true,
						length: {
							minimum: 3,
							maximum: 250
                        }
                    }
                }
			}
		}
	}
</script>
