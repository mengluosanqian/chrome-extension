<template>
  <div>
    <el-button @click="visible = true">添加</el-button>
    <el-table :data="userTable.data" stripe style="width: 100%">
      <el-table-column prop="id" label="账号" />
      <el-table-column prop="user" label="账号" />
      <el-table-column prop="userXpath" label="账号xpath" />
      <el-table-column prop="password" label="密码" />
      <el-table-column prop="passwordXpath" label="密码xpath" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="deleteValue(scope.row)">
            删除
          </el-button>
          <el-button link type="primary" size="small" @click="editValue(scope.row)">编辑</el-button>
          <el-button link type="primary" size="small" @click="editValue(scope.row)">填入</el-button>
        </template>
      </el-table-column>
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
          <el-button type="primary" @click="editValue1">编辑</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import indexedDB from "../../utils/indexedDB";
import '../style/reset.less';
let visible = ref(false);
onMounted(getItems());
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('内容脚本收到消息:', message, sender, sendResponse);
});
const form = reactive({
  id: "",
  user: "",
  userXpath: "",
  password: "",
  passwordXpath: "",
});
let userTable = reactive({
  data: [],
});
function checkUserXpath() {
  console.log("checkUserXpath");
}
function checkPassXpath() {
  console.log("checkPassXpath");
}
function addValue() {
  addItem();
}
async function editValue1() {
  const item = {
    id: form.id,
    user: form.user,
    userXpath: form.userXpath,
    password: form.password,
    passwordXpath: form.passwordXpath,
  };
  try {
    await indexedDB.editData(item, "User", "xpathValue");
    console.log("Item edit successfully");
    visible.value = false;
    getItems();
  } catch (error) {
    console.error("Error adding item:", error);
  }
}
async function deleteValue(item) {
  console.log(item);
  await indexedDB.delData(item.id, "User", "xpathValue");
  console.log("Item deled successfully");
  getItems();
}
function editValue(item) {
  console.log(item);
  visible.value = true;
  form.id = item.id;
  form.user = item.user;
  form.userXpath = item.userXpath;
  form.password = item.password;
  form.passwordXpath = item.passwordXpath;
  // await indexedDB.editData(item, "User", "xpathValue")
}
async function getItems() {
  try {
    const items = await indexedDB.getAllData("User", "xpathValue");
    userTable.data = [...items];
  } catch (error) {
    console.error("Error getting items:", error);
  }
}
async function addItem() {
  const item = {
    id: Math.floor(Math.random() * Math.pow(10, 8)),
    user: form.user,
    userXpath: form.userXpath,
    password: form.password,
    passwordXpath: form.passwordXpath,
  };
  try {
    await indexedDB.addData(item, "User", "xpathValue");
    console.log("Item added successfully");
    visible.value = false;
    getItems();
  } catch (error) {
    console.error("Error adding item:", error);
  }
}
</script>

<style></style>