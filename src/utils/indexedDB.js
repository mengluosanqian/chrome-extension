const defaultDbName = 'MyDatabase';
const storeName = 'UserAndPass';
const version = 3;
 
let db;
 
/**
 * 打开数据库
 * dbName 数据库名称
 * storeValue 表名称
 */
const openDB = async (dbName, storeValue) => {
  return new Promise((resolve, reject) => {
    const dbValue = dbName || defaultDbName;
    const request = window.indexedDB.open(dbValue, version);
    const realStore = storeValue || storeName;

    request.onerror = (event) => {
      console.error('Database error: ', event.target.errorCode);
      reject(event.target.errorCode);
    };
 
    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };
 
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(realStore)) {
        db.createObjectStore(realStore, { autoIncrement: true });
      }
    };
  });
};
 
/**
 * 添加数据
 * data 添加的数据
 * dbName 数据库名称
 * storeValue 表名称
 */
const addData = async (data, dbName, storeValue) => {
  await openDB(dbName, storeValue);
  const realStore = storeValue || storeName;
  const transaction = db.transaction(realStore, 'readwrite');
  const store = transaction.objectStore(realStore);
  store.add(data);
};
 
/**
 * 查询数据
 * dbName 数据库名称
 * storeValue 表名称
 */
const getAllData = async (dbName, storeValue) => {
  await openDB(dbName, storeValue);
  const realStore = storeValue || storeName;
  const transaction = db.transaction(realStore, 'readonly');
  const store = transaction.objectStore(realStore);
  return new Promise((resolve, reject) => {
    const dataRequest = store.getAll();
    dataRequest.onsuccess = function (event) {
      resolve(event.target.result);
    };
    dataRequest.onerror = function (event) {
      reject(event.target.errorCode);
    };
  });
};
 
export default {
  openDB,
  addData,
  getAllData,
};