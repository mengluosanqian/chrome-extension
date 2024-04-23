<template>
  <div>
    <el-button @click="visible = true">添加</el-button>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="user" label="账号"  />
      <el-table-column prop="userXpath" label="账号xpath"  />
      <el-table-column prop="password" label="密码" />
      <el-table-column prop="passwordXpath" label="密码xpath" />
    </el-table>
    <el-dialog v-model="visible" title="账号密码信息" width="500">
      <el-form :model="form" label-width="auto" style="max-width: 600px">
        <el-form-item label="账号xpath">
          <el-input v-model="form.user">
            <template #append>
              <el-button :icon="Search" @click="checkUserXpath" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="form.userXpath" />
        </el-form-item>
        <el-form-item label="密码xpath">
          <el-input v-model="form.password">
            <template #append>
              <el-button :icon="Search" @click="checkPassXpath" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.passwordXpath" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="visible = false">关闭</el-button>
          <el-button type="primary" @click="addValue">添加</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from 'vue';
import indexedDB from '../../utils/indexedDB';
let visible = ref(false)
onBeforeMount(
  getItems()
)
const form = reactive({
  user: '',
  userXpath: '',
  password: '',
  passwordXpath: '',
})
let tableData = reactive([])
function checkUserXpath() {
  console.log('checkUserXpath');
}
function checkPassXpath() {
  console.log('checkPassXpath');
}
function addValue() {
  addItem();
}
async function getItems() {
  try {
    const items = await indexedDB.getAllData('User', 'xpathValue');
    tableData = items;
    console.log('tableData:', tableData);
  } catch (error) {
    console.error('Error getting items:', error);
  }
}
async function addItem() {
  const item = {
    user: form.user,
    userXpath: form.userXpath,
    password: form.password,
    passwordXpath: form.passwordXpath,
  };
  try {
    await indexedDB.addData(item, 'User', 'xpathValue');
    console.log('Item added successfully');
    visible.value = false;
    getItems();
  } catch (error) {
    console.error('Error adding item:', error);
  }
}
</script>

<style></style>