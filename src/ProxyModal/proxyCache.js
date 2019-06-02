/**代理缓存
 * 计算乘集的例子,计算函数中不需要关心乘集参数是否相同，在参数相同的时候直接返回上次计算的值
 */

const mult = function() {
    console.log('开始计算乘积');
    let sum = 1;
    for (let i = 0, l = arguments.length; i < l; i++) {
        sum *= arguments[i];
    }
    return sum;
};

// 代理参数缓存，记录下来每一次计算的传入参数
const proxyMult = (function() {
    const cache = {};
    return function() {
        const args = Array.prototype.join.call(arguments, ',');
        // 如果已经存在，则直接返回上次的计算结果
        if (args in cache) {
            return cache[args];
        }
        return (cache[args] = mult.apply(this, arguments));
    };
})();

console.log(proxyMult(10,10,2,3))
console.log(proxyMult(10,10,2,3))