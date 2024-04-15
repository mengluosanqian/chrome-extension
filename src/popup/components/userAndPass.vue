<template>
    <div>
      测试indexedDB
      <el-button type="primary" @click="createDB">创建数据库</el-button>
      <el-button type="primary" @click="initAdd">添加数据</el-button>
      <el-button type="primary" @click="read">读取数据</el-button>
    </div>
  </template>
      
      <script>
  import { defineComponent, onMounted, ref } from "vue";
  export default defineComponent({
    setup() {
      onMounted(() => {
        initRead();
      });
      let index = ref(1);
      function createDB() {
        let request = window.indexedDB.open("userAndPass");
        request.onupgradeneeded = function (event) {
          let db = event.target.result;
          if (!db.objectStoreNames.contains("person")) {
            let objectStore = db.createObjectStore("person", { keyPath: "id" });
            objectStore.createIndex("name", "name", { unique: false });
            objectStore.createIndex("email", "email", { unique: true });
          }
        };
      }
      function initRead() {
        let request = window.indexedDB.open("userAndPass", 2);
        request.onsuccess = function (ev) {
          //拿到数据库实例对象，其中包含了对数据库表的的创建编辑等功能
          let db = ev.target.result;
          console.log("数据库打开成功", db);
          //调用read方法向我们创建的数据库表中拿取数据
          read(db);
        };
      }
      //从indexedDB数据库中读取数据
      function read(db) {
        //创建一个指定表的事务对象
        let transaction = db.transaction(["person"]);
        //获取指定表的实例
        let objectStore = transaction.objectStore("person");
        //通过get(索引)拿取数据
        let request = objectStore.get(1);
        //获取全部数据 var request = objectStore.getAll();
        //获取数据总数 var request = objectStore.count();
        // 数据拿取失败
        request.onerror = function () {
          console.log("事务失败");
        };
        //数据拿取成功
        request.onsuccess = function () {
          //这里数据拿取成功的话，传入的事件对象中的target的result就是我们拿取到的数据了
          //如果上面是用objectStore.get(1);拿取的那就是单个数据
          //使用objectStore.getAll();拿取的就是全部数据
          //不管拿取的那种数据都会被存到事件对象的target.result中去
          if (request.result) {
            console.log("Name: " + request.result.name);
            console.log("Age: " + request.result.age);
            console.log("Email: " + request.result.email);
          } else {
            console.log("未获得数据记录");
          }
        };
      }
  
      function initAdd() {
        let request = window.indexedDB.open("userAndPass", 4);
        request.onsuccess = function (ev) {
          //拿到数据库实例对象，其中包含了对数据库表的的创建编辑等功能
          let db = ev.target.result;
          console.log("数据库打开成功", db);
          //调用read方法向我们创建的数据库表中拿取数据
          add(db);
        };
      }
      function add(db) {
        let request = db
          .transaction(["person"], "readwrite")
          .objectStore("person")
          .add({ id: 2, name: "张三", age: 24, email: "zhangsan@example.com" });
  
        request.onsuccess = function () {
          console.log("数据写入成功");
        };
  
        request.onerror = function () {
          console.log("数据写入失败");
        };
      }
  
      return {
        createDB,
        read,
        initRead,
        initAdd,
        index,
      };
    },
  });
  </script>
      
      <style>
  </style>
      
      