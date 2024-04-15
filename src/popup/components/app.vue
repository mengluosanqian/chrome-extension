<template>
	<el-button @click="changeRouter">切换路由</el-button>
	<router-view></router-view>
</template>

<script>
	export default {
		methods: {
			changeRouter() {
				this.$router.replace('/userAndPass')
			}
		}
	}
</script>

<style lang="less" scoped>
	.popup_page{
		color: red;
		.popup_page_main{
			color: green;
		}
	}
</style>