<template>
	<div class="content_page">
		content_page
		<div class="content_page_main">
			content_page_main_login
		</div>
		<div class="content_page_footer">
			content_page_footer
		</div>
	</div>
</template>

<script>
	export default {
        name: "loginPage",
	}
</script>

<style lang="less" scoped>
	.content_page{
		color: red;
		position: fixed;
		z-index: 100001;
		.content_page_main{
			color: green;
		}
	}
</style>