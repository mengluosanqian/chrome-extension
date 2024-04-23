<template>
	<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
		<el-menu-item index="1" @click="changeUserRouter">账号密码管理</el-menu-item>
		<el-menu-item index="2" @click="changeIndexedDBRouter">indexedDB测试</el-menu-item>
		<el-menu-item index="3" disabled>消息中心</el-menu-item>
	</el-menu>
	<div class="router-container">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	data() {
		return {
			activeIndex: '1'
		}
	},
	methods: {
		changeUserRouter() {
			this.$router.replace('/base/userAndPass')
		},
		changeIndexedDBRouter() {
			this.$router.replace('/base/indexedDB')
		},
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		}
	}
}
</script>

<style lang="less" scoped>
.popup_page {
	color: red;

	.popup_page_main {
		color: green;
	}
}

.router-container {
	margin-top: 16px;
	padding: 0 20px;
}
</style>