/**
 * Created by 荣耀 on 2016/4/25.
 */

/**
 * BP网络神经类
 * @param opts      初始化参数
 * @constructor     BP网络神经类构造函数
 */
function BPNN(opts) {

    //默认参数
    var defaultOptions = {
        inputSize: opts.inputSize || 10,
        hiddenSize: opts.hiddenSize || 10,
        outputSize: opts.outputSize || 10,
        K: opts.K || 10,
        M: opts.M || 200,
        exact: opts.exact || 3
    };

    //拓展参数
    opts = extend(defaultOptions, opts);

    //变量初始化
    this.options = {
        inputVector: new Array(opts.inputSize),                     //输入层向量
        inHidVector: new Array(opts.hiddenSize),                    //隐含层输入向量
        outHidVector: new Array(opts.hiddenSize),                   //隐含层输出向量
        inOptVector: new Array(opts.outputSize),                    //输出层输入向量
        outOptVector: new Array(opts.outputSize),                   //输出层输出向量
        expVector: new Array(opts.outputSize),                      //期望输出向量v

        iptHidWeights: twoDimArrayInit(10, 10),                     //输入层与隐含层的连接权值
        hidOptWeights: twoDimArrayInit(10, 10),                     //隐含层与输出层的连接权值

        //Threshold: 阈值
        hidThreshold: new Array(opts.hiddenSize),                   //隐含层个神经元阈值
        optThreshold: new Array(opts.outputSize),                   //输出层各个神经元阈值

        K: opts.K,                                                  //样本个数
        M: opts.M,                                                  //最大学习次数
        exact: opts.exact                                           //数据小数点后保留位（计算精度）
    };

    /**
     * 步奏一：初始化
     *          以区间(-1， 1)随机给连接权值赋值
     *          设定误差函数errorFn
     *          设置最大学习次数M、计算精度exact
     */
    this.randomizeWeights(this.options.iptHidWeights, this.options.exact);
    this.randomizeWeights(this.options.hidOptWeights, this.options.exact);
    for(var i = 0, len = this.options.hidThreshold.length; i != len; i++) {
        this.options.hidThreshold[i] = 1;
        this.options.optThreshold[i] = 1;
    }


    this.errorFn = function () {                                     //误差函数

    };

    /**
     * 步骤二：
     *          选取输入样本、期望输出
     */


    /**
     * 步骤三：
     *          计算隐含层各神经元输入和输出
     */

}




BPNN.prototype.train = function (sample) {
    //设置输入
    for(var i = 0, len = this.options.inputVector.length; i != len; i++) {
        this.options.inputVector[i] = sample[i];
    }

    //计算隐含层各神经元的输入、输出
    for(i = 0, len = this.options.inHidVector.length; i != len; i++) {
        //设置隐含层各神经元的输入
        this.options.inHidVector[i] = this.getInput(
                                this.options.inputVector,
                                this.options.iptHidWeights[i],
                                this.options.hidThreshold[i]);

        //设置隐含层各神经元的输出
        this.options.outHidVector[i] = this.getOutput(this.options.inHidVector[i]);
    }

    //计算隐含层各神经元的输入、输出
    for(i = 0, len = this.options.outHidVector.length; i != len; i++) {
        //设置输出层各神经元的输入
        this.options.inOptVector[i] = this.getInput(
                                this.options.outHidVector,
                                this.options.hidOptWeights[i],
                                this.options.optThreshold[i]);

        //设置输出层各神经元的输出
        this.options.outOptVector[i] = this.getOutput(this.options.inOptVector[i]);
    }
};

/**
 * 获取神经元节点的输入
 * @param vector        神经元的输入输入向量
 * @param weights       该神经元与前一层各神经元的连接权值
 * @param threshold     该神经元的阈值
 * @returns {number}    返回该神经元的输入
 */
BPNN.prototype.getInput = function (vector, weights, threshold) {
    var sum = 0;
    /*for(var i = 0, len1 = weights.length; i != len1; i++) {
        sum += vector[i] * weights[i];
    }*/
    console.info("weights: " + weights);

    return sum - threshold;
};

/**
 * 获取某一神经元的输出
 * @param ipt           输入
 * @returns {number}    输出
 */
BPNN.prototype.getOutput = function (ipt) {
    return this.activationFn(ipt);
};

/**
 * S型激活函数
 * @param net 输入 （net = w1*x1 + ... + wn*xn）
 * @returns {number} 输出
 */
BPNN.prototype.activationFn = function (net) {
    return 1 / (1 + Math.pow(Math.E, -net));
};

/**
 * 获取属性方法定义
 * @param target    属性名
 * @returns {{inputVector: Array, inHidVector: Array, outHidVector: Array, inOptVector: Array, outOptVector: Array, expVector: Array, iptHidWeights: Array, hidOptWeights: Array, hidThreshold: Array, optThreshold: Array, K: (*|number), M: (*|number), exact: (*|number)}|*}
 */
BPNN.prototype.getOptions = function (target) {
    return target == null ? this.options : this.options[target];
};

/**
 * 随机给权值赋值
 * @param matrix    各连接权值数组
 * @param exact     初始化数据小数点后保留位
 * @returns {BPNN}  BPNN对象
 */
BPNN.prototype.randomizeWeights = function (matrix, exact) {

    for(var i = 0, len1 = matrix.length; i !=len1; i++) {
        for(var j = 0, len2 = matrix[i].length; j != len2; j++) {
            matrix[i][j] = random(-1, 1, exact);
        }
    }

    //返回对象引用，便于执行链式操作
    return this;
};

/**
 * 用obj_2成员值替换obj_1成员值
 * @param {Object} obj_1	  被替换值对象
 * @param {Object} obj_2  	  替换值对象
 */
function extend(obj_1, obj_2){

    if(Object.prototype.toString.call(obj_1) === '[object object]' &&
        Object.prototype.toString.call(obj_2) === '[object object]') {

        for(var propName in obj_2){
            obj_1[propName] = obj_2[propName];
        }
    }

    return obj_1;
}

/**
 * 随机数生成函数
 * @param min   最小值
 * @param max   最大值
 * @param exact 小数点后保留位数
 * @returns {*} 返回随机数
 */
function random(min, max, exact) {
    var range = max - min,
        rd = min + Math.random() * range;
    return parseFloat(rd.toFixed(exact));
}

/**
 * JavaScript二维数组初始化（JavaScript没有定义二维数组）
 * @param oneDimLength  一维长度
 * @param twoDimLength  二维长度
 * @returns {Array}     返回二维初始化数组
 */
function twoDimArrayInit(oneDimLength, twoDimLength) {
    var arr = new Array(oneDimLength);
    for(var i = 0, len = oneDimLength; i != len; i++) {
        arr[i] = new Array(twoDimLength);
    }

    return arr;
}
/*--------------------------------------*/
var bp = new BPNN({K: 20, M: 150, exact: 4});
bp._train([4, 12.5, 5.7, 9.6, 8.1, 5.6, 2.1, 0.8, 12.01, 4.8]);
console.info(bp.getOptions());





var arr = bp.getOptions("iptHidWeights");
iterArr(arr[3]);

function iterArr(arr) {
    for(var i = 0, len = arr.length; i != len; i++) {
        console.info(arr);
    }
}
