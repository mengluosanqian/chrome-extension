<template>
	<div class="head">this is the content</div>
</template>

<script setup>
document.addEventListener('click', function (event) {
	debugger;
	// 获取点击的元素
	let targetElement = event.target;
	// 使用xpath获取元素的路径
	let xpath = getXPath(targetElement);
	console.log(xpath, 'xpath');
})

// 获取元素的路径
function getXPath(element) {
	let xpath = '';
	for (; element && element.nodeType === 1; element = element.parentNode) {
		// 获取元素在父节点中的位置
		let index = getElementIndex(element);
		// 构建XPath路径
		xpath = `/${element.tagName.toLowerCase()}[${index}]${xpath}`
	}
	return xpath;
}

// 获取元素在父节点中的位置
function getElementIndex(element) {
	let siblings = element.parentNode.childNodes;
	let index = 1;
	for (let i = 0; i < siblings.length; i++) {
		if (siblings[i] === element) {
			return index;
		}
		if (siblings[i].nodeType === 1 && siblings[i].tagName === element.tagName) {
			index++;
		}
	}
	return -1;
}
</script>

<style scoped>
.head{
	color: red;
	position: fixed;
	z-index: 100001;
	right: 10px;
	bottom: 10px;
}
</style>
