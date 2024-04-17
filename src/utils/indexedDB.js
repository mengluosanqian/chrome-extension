const dbName = 'MyDatabase';
const storeName = 'MyStore';
const version = 1;
 
let db;
 
const openDB = async () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(dbName, version);
 
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
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { autoIncrement: true });
      }
    };
  });
};
 
const addData = async (data) => {
  await openDB();
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);
  store.add(data);
};
 
const getAllData = async () => {
  await openDB();
  const transaction = db.transaction(storeName, 'readonly');
  const store = transaction.objectStore(storeName);
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