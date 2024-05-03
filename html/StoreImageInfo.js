// �򿪻򴴽���Ϊ "imagesDB" �� IndexedDB ���ݿ⣬��������Ϊ "images" �Ķ���洢��
var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;

if (!indexedDB) {
    //console.error("�����������֧�� IndexedDB.");
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

        // ��������Խ��д洢���ݵĲ���������ӡ��޸ġ�ɾ����
        // ���磺�����洢�����һ������
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
