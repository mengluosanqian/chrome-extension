<template>
  <div>
    测试indexedDB
    <el-button type="primary" @click="addItem">Add Item</el-button>
    <el-button type="primary" @click="getItems">Get Items</el-button>
    <el-button type="primary" @click="handleCaptureScreen">截屏</el-button>
  </div>
</template>

<script setup>
import indexedDB from '../../utils/indexedDB';
async function addItem() {
  const item = {
    user: 'admin',
    userXpath: '/test',
    password: 'admin',
    passwordXpath: '/test',
  };
  try {
    await indexedDB.addData(item, 'User', 'xpathValue');
    console.log('Item added successfully');
  } catch (error) {
    console.error('Error adding item:', error);
  }
}
async function getItems() {
  try {
    const items = await indexedDB.getAllData('User', 'xpathValue');
    console.log('Items:', items);
  } catch (error) {
    console.error('Error getting items:', error);
  }
}

// 开始截屏
function handleCaptureScreen() {
  // 获取当前窗口 -> 回调函数包括当前窗口的详细信息，如窗口id等
  chrome.windows.getCurrent(function (win) {
    // 抓取当前tab的内容
    chrome.tabs.captureVisibleTab(win.id, {}, function (dataUrl) {
      const info = {
        action: 'CAPTURE_SCREEN',
        payload: dataUrl
      }
      console.log(info);
      
    })
  })
}


</script>

<style></style>