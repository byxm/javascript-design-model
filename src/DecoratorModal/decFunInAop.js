/* 使用AOP装饰函数 */

Function.prototype.before = function(beforeFn) {
    const _self = this;// 保存原函数引用
    return function() {// 返回了包含原函数和新函数的'代理函数'
        beforeFn.apply(this,arguments);//执行新函数，且保证this不被劫持，新函数接受的参数
        return _self.apply(this,arguments);
    }
}

document.getElementById = document.getElementById.before(function(){
    alert(1);
})

Function.prototype.after = function(afterfn) {
    const _self = this;
    return function() {
        const ret = _self.apply(this,arguments);
        afterfn.apply(this,arguments);
        return ret;
    }
}

const button = document.getElementById('button');
console.log(button);