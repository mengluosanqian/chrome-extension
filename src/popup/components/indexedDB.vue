<template>
  <div>
    测试indexedDB
    <el-button type="primary" @click="addItem">Add Item</el-button>
    <el-button type="primary" @click="getItems">Get Items</el-button>
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


</script>

<style></style>