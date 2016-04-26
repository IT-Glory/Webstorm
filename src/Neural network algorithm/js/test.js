/**
 * Created by 荣耀 on 2016/4/26.
 */
function random(min, max, cext) {
    var range = max - min,
        rd = min + Math.random() * range;
    return rd.toFixed(cext);
}

/*for(var i = 0; i != 20; i++) {
    console.info(random(-1, 1, 3));
}*/

function twoDimArrayInit(oneDimLength, twoDimLength) {
    var arr = new Array(oneDimLength);
    for(var i = 0, len = oneDimLength; i != len; i++) {
        arr[i] = new Array(twoDimLength);
    }

    return arr;
}

var arr = twoDimArrayInit(10, 10);
iterArr(arr[2]);
function iterArr(arr) {
    for(var i = 0, len = arr.length; i != len; i++) {
        console.info(arr[i]);
    }
}