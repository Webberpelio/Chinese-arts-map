// 打开或创建名为 "imageDatabase" 的数据库
var request = indexedDB.open("imageDatabase", 1);

// 数据库首次创建或版本更新时的回调函数
request.onupgradeneeded = function(event) {
    var db = event.target.result;

    // 创建一个名为 "images" 的对象存储空间，指定 "id" 作为键路径
    var objectStore = db.createObjectStore("images", { keyPath: "id", autoIncrement: true });

    // 在对象存储空间中创建索引，以便后续检索
    objectStore.createIndex("name", "name", { unique: false });
    objectStore.createIndex("time", "time", { unique: false });
    objectStore.createIndex("description", "description", { unique: false });
    objectStore.createIndex("category", "category", { unique: false });
    objectStore.createIndex("material", "material", { unique: false });
};

// 数据库打开成功后的回调函数
request.onsuccess = function(event) {
    var db = event.target.result;

    // 在这里执行数据库操作，例如存储数据
    var transaction = db.transaction(["images"], "readwrite");
    var objectStore = transaction.objectStore("images");

    // 循环将数据存储至对象存储空间
    for (var i = 0; i < imageData.length; i++) {
        objectStore.add(imageData[i]);
    }
};

// 数据库打开失败后的回调函数
request.onerror = function(event) {
    console.error("Database error: " + event.target.errorCode);
};
