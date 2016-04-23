/**
 * Created by 荣耀 on 2016/4/21.
 */
function setMessage(target_id, item_name) {
    var ipt = document.querySelector("#" + target_id),
        flag = getRandomNum(1, 2);
    if(flag === 1) {
        sessionStorage.setItem(item_name, ipt.value);
    }else {
        localStorage.setItem(item_name, ipt.value);
    }

}

function getMessage(item_name) {
    var flag = getRandomNum(1, 2);
    if(flag === 1) {
        return sessionStorage.getItem(item_name);
    }else {
        return localStorage.getItem(item_name);
    }
}

window.onload = function () {

    var showNode = document.querySelector("#randomShow");
    for(var i = 0; i < 100 ; i++) {
        var child = document.createElement("span");
        child.innerHTML = new Date().getMilliseconds() + " ";
        showNode.appendChild(child);
    }

    document.querySelector("#data-commit").addEventListener('click', function (e) {
        e.preventDefault();
        setMessage("data-ipt", "data" + getRandomNum(1, 4));
    }, false);

    document.querySelector("#data-read").addEventListener('click', function (e) {
        e.preventDefault();
        var msg = getMessage("data" + getRandomNum(1, 4));
        document.querySelector("#data-show").value = msg;
    }, false);
};

function getRandomNum(min,max) {
    var range = max - min;
    return(min + Math.round(Math.random() * range));
}