// 打开或创建名为 "imagesDB" 的 IndexedDB 数据库，并创建名为 "images" 的对象存储区
var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;

if (!indexedDB) {
    //console.error("您的浏览器不支持 IndexedDB.");
	console.error("Browser cannot support IndexedDB.");
} else {
    var request = indexedDB.open("imagesDB", 1);

    request.onerror = function(event) {
        console.error("Cannot open IndexedDB:", event.target.errorCode);
    };

    request.onupgradeneeded = function(event) {
        var db = event.target.result;
        var objectStore = db.createObjectStore("images", { keyPath: "id" });
        objectStore.createIndex("url", "url", { unique: false });
        objectStore.createIndex("description", "description", { unique: false });
        console.log("Created IndexedDB database and object storage memory.");
    };

    request.onsuccess = function(event) {
        console.log("Opend IndexedDB database successfully.");
        var db = event.target.result;

        // 在这里可以进行存储数据的操作，如添加、修改、删除等
        // 例如：向对象存储区添加一条数据
        var transaction = db.transaction(["images"], "readwrite");
        var objectStore = transaction.objectStore("images");
        var imageData = { id: 1, url: "E:\\my-git\\Chinese-arts-map\\images\\7000-7.png", description: "This is a picture demo." };
        var request = objectStore.add(imageData);

        request.onsuccess = function(event) {
            console.log("Have stored data in IndexedDB successfully.");
        };

        request.onerror = function(event) {
            console.error("Have stored data in IndexedDB failed:", event.target.errorCode);
        };
    };
}
