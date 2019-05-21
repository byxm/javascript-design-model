// 柯里化部分求值，遍历当月的消费记录，只有在不输入消费值的时候才输出本月总消费

const currying = function(fn) {// 接收一个函数将它修饰成柯里化函数
    const args = [];
    return function() {
        if (arguments.length === 0) {
            return fn.apply(this,args);// 将传值的数组转换成单个的值传入
        }else {
            [].push.apply(args,arguments);
            return arguments.callee;// 当有参数传进来的时候，此时不进行求和的计算，返回另外一个函数
        }
    }
}

// const cost = (function() {
//     let money = 0;
//     return function() {
//         for(let i = 0;i < arguments.length;i++) {
//             money += arguments[i];
//         }
//         return money;
//     }
// })()

const cost = function() {
    let money = 0;
    for(let i = 0;i < arguments.length;i++){
        money += arguments[i];
    }
    return money;
}


const curCost = currying(cost);
curCost(200);
curCost(200);
curCost(200);
console.log(curCost());