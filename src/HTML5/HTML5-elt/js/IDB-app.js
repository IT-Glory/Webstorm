/**
 * Created by 荣耀 on 2016/4/23.
 */

(function (window) {
    window.IDB = function (options) {

        //indexedDB操作集参数初始化
        var _opt = {
            version: options.version || 0,
            objectStoreName: options.objectStoreName || "",
            instance: options.instance || {},
            indexedDB: options.indexedDB || window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB,
            IDBTransaction: options.IDBTransaction || window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction,
            IDBKeyRange: options.IDBKeyRange || window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange,
            IDBCursor: options.IDBCursor || window.IDBCursor || window.webkitIDBCursor || window.msIDBCursor
        };

        //核心操作集
        var _actionSet = {
            options: _opt
        };

        /**
         * upgrade needed事件的事件处理程序
         * @param e
         */
        _actionSet.upgrade = function (e) {
            var _db = e.target.result,
                names = _db.objectStoreNames,
                name = _actionSet.options.objectStoreName;
            if (!names.contains(name)) {
                //创建对象仓库
                _db.createObjectStore(name, {
                        keyPath: 'id',
                        autoIncrement: true
                    });
            }

            //返回操作集对象，可执行链式操作
            return _actionSet;
        };

        /**
         * 全局错误处理程序
         * @param error
         */
        _actionSet.errorHandler = function (error) {
            window.alert('error: ' + error.target.code);
            debugger;

            return _actionSet;
        };

        /**
         * 打开数据库
         * @param callback 回调函数
         */
        _actionSet.open = function (callback) {

            //打开indexedDB请求
            var request = _actionSet.options.indexedDB.open(_actionSet.options.objectStoreName, _actionSet.options.version);

            request.onerror = _actionSet.errorHandler;
            request.onupgradeneeded = _actionSet.upgrade;
            request.onsuccess = function (e) {
                _actionSet.options.instance = e.target.result;
                _actionSet.options.instance.onerror = _actionSet.errorHandler;

                //执行成功回调函数
                callback(e.target.result);
            };

            return _actionSet;
        };

        /**
         * 获取
         * @param mode
         * @returns {*}
         */
        _actionSet.getObjectStore = function (mode) {
            var txn, store;
            mode = mode || 'readonly';                      //默认只读模式
            txn = _actionSet.options.instance.transaction([_actionSet.options.objectStoreName], mode);
            store = txn.objectStore(_actionSet.options.objectStoreName);
            return store;
        };
        
        /**
         * 
         * @param data 需要持久化的数据
         * @param callback 回调函数
         * @returns {{options: {version: (*|string|number), objectStoreName: (*|string), instance: (*|Object|{}), indexedDB: *, IDBTransaction: *, IDBKeyRange: *, IDBCursor: *}}}
         */
        _actionSet.save = function (data, callback) {

            _actionSet.open(function () {
                var store, request,
                    mode = 'readwrite';

                store = _actionSet.getObjectStore(mode);
                request = data.id ? store.put(data) : store.add(data);
                request.onsuccess = callback;
            });

            return _actionSet;
        };

        /**
         *
         * @param id 
         * @param callback
         */
        _actionSet.get = function (id, callback) {
            id = parseInt(id);
            _actionSet.open(function () {
                var store = _actionSet.getObjectStore(),
                    request = store.get(id);
                    request.onsuccess = function (e){
                    callback(e.target.result);
                };
            });

            return _actionSet;
        };

        _actionSet.getAll = function (callback) {
            _actionSet.open(function () {
                var store = _actionSet.getObjectStore(),
                    cursor = store.openCursor(),
                    data = [];

                cursor.onsuccess = function (e) {

                    var result = e.target.result;

                    if (result && result !== null) {
                        data.push(result.value);
                        result.continue();
                    } else {
                        callback(data);
                    }
                };
            });
        };

        /**
         *
         * @param id
         * @param callback
         * @returns {{options: {version: (*|string|number), objectStoreName: (*|string), instance: (*|Object|{}), indexedDB: *, IDBTransaction: *, IDBKeyRange: *, IDBCursor: *}}}
         */
        _actionSet.remove = function (id, callback) {
            id = parseInt(id);
            _actionSet.open(function () {
                var mode = 'readwrite',
                    store, request;
                store = _actionSet.getObjectStore(mode);
                request = store.remove(id);
                request.onsuccess = callback;
            });

            return _actionSet;
        };

        /**
         *
         * @param callback
         * @returns {{options: {version: (*|string|number), objectStoreName: (*|string), instance: (*|Object|{}), indexedDB: *, IDBTransaction: *, IDBKeyRange: *, IDBCursor: *}}}
         */
        _actionSet.removeAll = function (callback) {
            _actionSet.open(function () {
                var mode = 'readwrite',
                    store = _actionSet.getObjectStore(mode),
                    request = store.clear();
                request.onsuccess = callback;
            });

            return _actionSet;
        };

        //暴露indexedDB操作集
        return _actionSet;
    };
})(window);

/*------------------------------------------------------------------------------*/
/** DOM操作 */
window.onload = function () {
    var nameNode = document.getElementById("msg-name"),
        sexNode = document.getElementById("msg-sex"),
        schoolNode = document.getElementById("msg-school"),
        majorNode = document.getElementById("msg-major"),
        keyWordNode = document.getElementById("msg-keyWord"),
        btnSave = document.getElementById("btn-save"),
        btnSearch = document.getElementById("btn-get");

    //给保存按钮添加点击事件
    btnSave.addEventListener('click', function () {

        window.alert('name:' + nameNode.value + '\n' +
                      'sex:' + sexNode.value + '\n' +
                      'school:' + schoolNode.value + '\n' +
                      'major:' + majorNode.value);

        //初始化indexedDB
        IDB({version: '1', objectStoreName: 'gloryIDB'});
        /*IDB.open(function (result) {
           alert('open indexedDB result: ' + result);
        });*/
        alert(ajax.before(function () {
            return 'ajax before'
        }));
    }, false);

    //给搜索按钮添加点击事件
    btnSearch.addEventListener('click', function () {

        window.alert("keyWord: " + keyWordNode.value);
    }, false);

};


