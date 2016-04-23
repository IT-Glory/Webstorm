/**
 * Created by 荣耀 on 2016/4/22.
 */

window.onload = function () {
    dbOperation();
};

function dbOperation() {
    var btnNode = document.getElementById("btn-msg"),
        iptNode = document.getElementById("nickName"),
        txNode = document.getElementById("message"),
        tbNode = document.getElementById("show-msg");

    var idSequence = 0;
    var WB = new WebDB();
    WB.initDB("testDB", 1024 * 2);

    btnNode.addEventListener('click', function () {
        WB.insertMsg(++idSequence, iptNode.value, txNode.value);
    });

    btnNode.addEventListener('dblclick', function () {
        var result = WB.selectMsg("刘荣耀");
        alert(result);
    });

}

/**
 * db 数据库实例
 * @constructor
 */
function WebDB() {
    var db;
}
WebDB.prototype.initDB = function (db_name, db_size) {
    this.db = window.openDatabase("gloryDB", "2.0", db_name, db_size);

    this.db.transaction(function (tx){
        tx.executeSql('CREATE TABLE IF NOT EXISTS MESSAGE (id unique, nickname, msg)');
        alert("init database");
    });

    return this;
};

WebDB.prototype.insertMsg = function (id, nickname, msg) {
    this.db.transaction(function (tx) {
        tx.executeSql('INSERT INTO MESSAGE (id, nickname, msg) VALUES (?, ?, ?)', [id, nickname, msg]);
    });
    return this;
};

WebDB.prototype.selectMsg = function (keyWord) {
    var selResult = null;
    this.db.transaction(function (tx) {
        tx.executeSql('select nickname, msg from MESSAGE where id = ? or nickname = ? or msg = ?',
                        [keyWord, keyWord, keyWord], function (tx, results) {
                selResult = results;
                alert(results.rows.item(0).msg);
            }, null);
    });
    return selResult;
};

/**
 * 随机数生成函数
 * @param min 最小值
 * @param max 最大值
 * @returns {*} 返回随机数
 */
function randomID(min, max) {
    var range = max - min;
    return(min + Math.round(Math.random() * range));
}
