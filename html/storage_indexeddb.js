// 打开或创建名为 "imagesDB" 的 IndexedDB 数据库，并创建名为 "images" 的对象存储区
var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;

// 打开或创建名为 "myDatabase" 的数据库
var request = indexedDB.open("myDatabase", 1);

// 数据库打开成功后的回调函数
request.onsuccess = function(event) {
    var db = event.target.result;
    // 在这里执行数据库操作，例如存储数据、检索数据等
};

// 数据库打开失败后的回调函数
request.onerror = function(event) {
    console.error("operate myDatabase error: " + event.target.errorCode);
};

// 数据库首次创建或版本更新时的回调函数
request.onupgradeneeded = function(event) {
    var db = event.target.result;
    // 创建一个名为 "myObjectStore" 的对象存储空间
    var objectStore = db.createObjectStore("myObjectStore", { keyPath: "id" });

    // 在对象存储空间中创建一个索引
    objectStore.createIndex("nameIndex", "20240504", { unique: false });

    // 在这里可以添加初始数据到对象存储空间中
};
