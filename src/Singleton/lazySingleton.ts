/* 惰性加载单例 */

// exp1
// 管理创建单例的方法，如果已经创建过相应的单例那么直接 返回，否则创建单例
const getSingle = (fn: Function): Function => {
    let isCreated: any;
    return function() {
        return isCreated || (isCreated = fn.apply(this, arguments));
    };
};

// 创建节点
const createDiv = (): HTMLElement => {
    const div = document.createElement('div');
    div.innerHTML = '登录浮窗';
    document.body.append(div);
    div.style.display = 'none';
    return div;
}

// 创建登录框的单例类
const getLoginSingleLayer = getSingle(createDiv);
// 打开登录浮窗
document.getElementById('loginBtn').onclick = function() {
    const loginLayer = getLoginSingleLayer();
    loginLayer.style.display = 'block';
}
// 退出登录浮窗
document.getElementById('logoutBtn').onclick = function() {
    const loginLayer = getLoginSingleLayer();
    loginLayer.style.display = 'none';
}

// exp2
//事件绑定
const bindEvent = (): Boolean => {
    const div1 = document.getElementById('div1');
    console.log('执行添加点击事件');
    div1.addEventListener('click',function() {
        alert('添加点击事件');
    })
    return true;
}

const isBindEvent = getSingle(bindEvent);

const renders = (): void => {
    console.log('渲染点击事件');
    isBindEvent();
}
// 可以看到执行了三次绑定函数但是只绑定了一次事件
renders();
renders();
renders();
