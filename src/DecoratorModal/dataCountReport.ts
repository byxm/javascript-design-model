const after = function(fn, afterFn) {
    return function() {
        const res = fn.apply(this, arguments);// 先执行原函数，在执行修饰函数
        afterFn.apply(this, arguments);
        return res;
    }
}

let showLogin = () => {
    console.log('打开登录浮窗');
}

const log = function() {
    console.log(`上报登录次数`)
}

showLogin = after(showLogin, log);

document.getElementById('button').onclick = function() {
    showLogin();
}