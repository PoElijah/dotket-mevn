<template>
    <div class="mainHeader">
        <div class="mainHeader__main">
            <router-link to="/" class="mainLogo">
                .Ket
            </router-link>
            <label class="mainHeader__search">
                <input type="text">
                <i class="fa fa-search"></i>
            </label>
            <div v-if="!logged" class="mainActions__actions">
                <router-link to="/login" class="actionBlock">
                    <i class="fa fa-sign-in-alt"></i>
                </router-link>
            </div>
            <div v-click-outside="hideBlock" @click="switchBlock" v-else class="mainActions__actions">
                <div class="actionBlock">
                    <img v-if="user.photo" v-bind:src="`http://localhost:5000/images/${user.photo}`" alt="user_photo">
                    <img v-else src="./../assets/images/default-user.png" alt="default_photo">
                </div>
                <div v-bind:class="`userBlock userBlock--${userBlock}`" >
                    <div class="userBlock__img">
                        <img v-if="user.photo" v-bind:src="`http://localhost:5000/images/${user.photo}`" alt="user_photo">
                        <img v-else src="./../assets/images/default-user.png" alt="default_photo">
                    </div>
                    <router-link class="userBlock__name" to="/profile">
                        {{user.name && user.name.first || ''}}
                        {{user.name && `"${user.name.nickname}"` || ''}}
                        {{user.name && user.name.last || ''}}
                    </router-link>
                    <div class="userBlock__btn">
                        <button @click="logOut" class="customButton">
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="mainHeader__nav">
            <nav class="mainNav">
                <ul class="mainNav__ul">
                    <li><router-link class="mainNav__link" to="/">Home</router-link></li>
                    <li><router-link class="mainNav__link" to="/women">Women</router-link></li>
                    <li><router-link class="mainNav__link" to="/men">Men</router-link></li>
                    <li><router-link class="mainNav__link" to="/men">Sale</router-link></li>
                    <li><router-link class="mainNav__link" to="/men">Electronics</router-link></li>
                    <li><router-link class="mainNav__link" to="/men">Store</router-link></li>
                    <li><router-link class="mainNav__link" to="/men">Information</router-link></li>
                    <li><router-link class="mainNav__link" to="/men">Blog & News</router-link></li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
	import ClickOutside from 'vue-click-outside'
	export default {
		name: "Header",
        props: ['user', 'logged'],
        data() {
			return {
				userBlock: false
            }
        },
        methods: {
            hideBlock: function () {
				this.userBlock = false
            },
			switchBlock: function () {
				this.userBlock = !this.userBlock
            },
			logOut: function () {
				this.$store.dispatch('logout');
            }
        },
		directives: {
			ClickOutside
		}
	}
</script>
