// 打开名为 "imageDatabase" 的数据库
var request = indexedDB.open("imagesDB", 1);

// 数据库打开成功后的回调函数
request.onsuccess = function(event) {
    var db = event.target.result;

    // 创建一个事务并获取对象存储空间
    var transaction = db.transaction(["images"], "readonly");
    var objectStore = transaction.objectStore("images");

    // 打开游标来遍历存储空间中的数据
    var cursorRequest = objectStore.openCursor();

    cursorRequest.onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
            var image = cursor.value;
            console.log("Image id:", image.id);
            console.log("Image URL:", image.url);
            console.log("Image description:", image.description);

            // 继续遍历下一条数据
            cursor.continue();
        } else {
            console.log("No more images.");
        }
    };

    // // 获取索引
    // var index = objectStore.index("url");
    // console.log("index:", index);

    // // 使用索引检索数据
    // var getImageByName = index.get("example.jpg");

    // // 检索成功后的回调函数
    // getImageByName.onsuccess = function(event) {
    //     var image = event.target.result;
    //     if (image) {
    //         console.log("Image found:", image.url, image.description);
    //     } else {
    //         console.log("Image not found.");
    //     }
    // };

    // // 检索失败后的回调函数
    // getImageByName.onerror = function(event) {
    //     console.error("query imagesDB Error retrieving image:", event.target.error);
    // };
};

// 数据库打开失败后的回调函数
request.onerror = function(event) {
    console.error("query imagesDB Database error: " + event.target.errorCode);
};
