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
    canvas2D.fillRect(100,100,100,100);
    canvas2D.clearRect(120,120,60,60);
    canvas2D.strokeRect(125,125,50,50);

    /**
     * 首先，你需要创建路径起始点。
     * 然后你使用画图命令去画出路径。
     * 之后你把路径封闭。
     * 一旦路径生成，你就能通过描边或填充路径区域来渲染图形。
     * beginPath() 新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
     * closePath() 闭合路径之后图形绘制命令又重新指向到上下文中。
     * stroke() 通过线条来绘制图形轮廓。
     * fill() 通过填充路径的内容区域生成实心的图形。
     */

    canvas2D.beginPath();
    canvas2D.moveTo(25,50);
    canvas2D.lineTo(100,75);
    canvas2D.lineTo(100,25);
    canvas2D.fill();

    // 描边三角形
    canvas2D.beginPath();
    canvas2D.moveTo(500,125);
    canvas2D.lineTo(125,45);
    canvas2D.lineTo(45,125);
    canvas2D.closePath();
    canvas2D.stroke();

    /**
     * 圆弧画法
     * arc(x, y, radius, startAngle, endAngle, anticlockwise)
     * 画一个以（x,y）为圆心的以radius为半径的圆弧（圆），从startAngle开始到endAngle结束，
     * 按照anticlockwise给定的方向（默认为顺时针）来生成。
     * arcTo(x1, y1, x2, y2, radius)
     * 根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点。
     */

    canvas2D.beginPath();
    canvas2D.arc(75,75,50,0,Math.PI*2,true); // 绘制
    canvas2D.moveTo(110,75);
    canvas2D.arc(75,75,35,0,Math.PI,false);   // 口(顺时针)
    canvas2D.moveTo(65,65);
    canvas2D.arc(60,65,5,0,Math.PI*2,true);  // 左眼
    canvas2D.moveTo(95,65);
    canvas2D.arc(90,65,5,0,Math.PI*2,true);  // 右眼
    canvas2D.stroke();

    canvas2D.beginPath();
    canvas2D.moveTo(600, 250);
    canvas2D.arc(550, 250, 50, 0, Math.PI * 2, true);
    canvas2D.moveTo(585, 250);
    canvas2D.arc(550, 250, 35, 0, Math.PI, false);
    canvas2D.moveTo(530, 230);
    canvas2D.arc(525, 230, 5, 0, Math.PI * 2, true);
    canvas2D.moveTo(580, 230);
    canvas2D.arc(575, 230, 5, 0, Math.PI * 2, true);
    canvas2D.stroke();



    /*
    * rect(x, y, width, height)
    * 绘制一个左上角坐标为（x,y），宽高为width以及height的矩形。
    * 注意：当该方法执行的时候，moveTo()方法自动设置坐标参数（0,0），
    *      也就是说，当前笔触自动重置会默认坐标。
    */
    canvas2D.beginPath();
    canvas2D.rect(600, 100, 20, 100);
    canvas2D.stroke();


};