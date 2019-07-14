
const createProxyFactory = function(fn:Function): Function {// 后面添加一下泛型的概念
    const cache = {};
    return function(): any {
        const args = Array.prototype.join.call(arguments,',');
        if (args in cache) {
            return cache[args];
        }
        // 这里将返回值cache[args]的具体值和给cache赋值的操作结合在了一起
        return cache[args] = fn.apply(this,arguments);
    }
}

const mult = function() {
    let a = 1;
    for(let i = 0,l = arguments.length; i < l;i++) {
        a = a * arguments[i];
    }
    return a;
}

const plus = function() {
    let a = 1;
    for(let i = 0,l = arguments.length; i < l;i++) {
        a = a + arguments[i];
    }
    return a;
}

const proxyMult = createProxyFactory(mult);
const proxyPlus = createProxyFactory(plus);

alert(proxyMult(1,2,3,4));
alert(proxyMult(1,2,3,4));