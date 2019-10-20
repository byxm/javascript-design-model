/* 构造beforeFn和afterFn两个AOP函数，用来给函数进行包装之前的额外操作和包装之后的额外操作 */
(Function as any).prototype.before = function(beforeFn) {
    const _self = this;
    return function() {
        beforeFn.apply(this, arguments);
        return _self.apply(this, arguments);
    }
}

(Function as any).prototype.after = function(afterFn) {
    const _self = this;
    return function() {
        const ret = _self.apply(this, arguments);
        afterFn.apply(this, arguments);
        return ret;
    }
}

document.getElementById = (document.getElementById as any).before(function() {
    console.log('按钮修饰', arguments);
})

const button = document.getElementById('button');

console.log(button);


/* 以上的写法会污染原型，所以可以做一种变通的方式不用绑定在原型上面 */
const before = function(fn, beforeFn) {// 修饰函数
    return function() {
        beforeFn.apply(this, arguments);
        return fn.apply(this, arguments);
    }
}

let at = function() {
    console.log('我是原本的函数要弹出at');
}

at = before(at, function() {
    console.log('我是在at弹出前修饰at函数的function');
})

at();