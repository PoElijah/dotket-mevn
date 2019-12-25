<template>
    <div class="mainContent">
        <div class="categoriesBlock">
            <div class="categoriesBlock__list">
                <h2>Categories</h2>
                <ul class="categoriesBlock__ul">
                    <li class="categoriesBlock__li">
                        <router-link to="#">
                            <i class="fa fa-user"></i>
                            Fashion
                        </router-link>
                    </li>
                    <li class="categoriesBlock__li">
                        <router-link to="#">
                            <i class="fa fa-user"></i>
                            Woman accessories
                        </router-link>
                    </li>
                    <li class="categoriesBlock__li">
                        <router-link to="#">
                            <i class="fa fa-user"></i>
                            Kids store
                        </router-link>
                    </li>
                    <li class="categoriesBlock__li">
                        <router-link to="#">
                            <i class="fa fa-user"></i>
                            Electronic
                        </router-link>
                    </li>
                    <li class="categoriesBlock__li">
                        <router-link to="#">
                            <i class="fa fa-user"></i>
                            Handmade gift
                        </router-link>
                    </li>
                    <li class="categoriesBlock__li">
                        <router-link to="#">
                            <i class="fa fa-user"></i>
                            Jewellry & watch
                        </router-link>
                    </li>
                    <li class="categoriesBlock__li">
                        <router-link to="#">
                            <i class="fa fa-user"></i>
                            Food
                        </router-link>
                    </li>
                    <li class="categoriesBlock__li">
                        <router-link to="#">
                            <i class="fa fa-user"></i>
                            Home decor
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="categoriesBlock__slider">

            </div>
            <div class="categoriesBlock__side"></div>
        </div>
    </div>
</template>

<script>
	export default {
		name: "Home",
        computed: {
			products() { return this.$store.getters.products },
        },
        mounted() {
			this.$store.dispatch('getProducts')
        }
	}
</script>

<style scoped>

</style>