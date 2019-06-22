/* 数据统计上报的登录实例 */

Function.prototype.after = function(afterfn) {
    const _self = this;
    return function() {
        const ret = _self.apply(this,arguments);
        afterfn.apply(this,arguments);
        return ret;
    }
}

let showLogin = function() {
    console.log('打开登录浮窗');
}

const log = function() {
    console.log(`上报标签为：${this.getAttribute('tag')}`);
}
showLogin = showLogin.after(log);

document.getElementById('button').onclick = showLogin;