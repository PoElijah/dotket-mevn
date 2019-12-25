<template>
    <div id="app">
        <Header v-bind:logged="logged" v-bind:user="user"/>
        <div class="mainContainer">
            <router-view></router-view>
        </div>
        <div class="messageBlock">
            {{errors}}
        </div>
    </div>
</template>

<script>
	import Header from "@/components/Header";

	import './assets/styles/index.scss';


	export default {
		name: 'app',
		components: {
			Header
		},
		computed: {
			errors() { return this.$store.getters.errors },
            user() {return this.$store.getters.user},
            logged() {return this.$store.getters.logged}
        },
        beforeCreate() {
			this.$store.dispatch('getSession');
        },
	}
</script>

