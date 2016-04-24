/**
 * Created by 荣耀 on 2016/4/24.
 */

/**
 * 初始化canvas元素样式
 * @param canvas_id canvas元素id
 */
function initCanvas(cs) {
    cs.width = window.innerWidth;
    cs.height = window.innerHeight;
}
function getCanvas(canvasID) {
    return document.getElementById(canvasID);
}

window.onload = function () {

    var canvas = getCanvas("cs");
    initCanvas(canvas);

    var canvas2D = canvas.getContext("2d");

   /**
    *  fillRect(x, y, width, height)
    *  绘制一个填充的矩形
    *  strokeRect(x, y, width, height)
    *  绘制一个矩形的边框
    *  clearRect(x, y, width, height)
    *  清除指定矩形区域，让清除部分完全透明。
    */
    canvas2D.fillStyle = '#222';
    canvas2D.fillRect(0,0,100,100);
    canvas2D.clearRect(20,20,60,60);
    canvas2D.strokeRect(25,25,50,50);

    /**
     * 首先，你需要创建路径起始点。
     * 然后你使用画图命令去画出路径。
     * 之后你把路径封闭。
     * 一旦路径生成，你就能通过描边或填充路径区域来渲染图形。
     */


};