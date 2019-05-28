const getSingle = function(fn) {
    // 创建实例对象
    let result; // 闭包保存缓存的登录框节点
    return function() {
        return result || (result = fn.apply(this, arguments));
    };
};

const createLoginLayer = function() {
    // 管理实例对象
    const div = document.createElement('div');
    div.innerHTML = '我是登录浮窗';
    div.style.display = 'none';
    document.body.appendChild(div);
    return div;
};

const createSingleLoginLayer = getSingle(createLoginLayer);

document.getElementById('loginBtn').onclick = function() {
    const loginLayer = createSingleLoginLayer();
    loginLayer.style.display = 'block';
};

//例二：事件绑定只有一次
const bindEvent = getSingle(function() {
    document.getElementById('div1').addEventListener = function() {
        alert('click');
    };
    return true;
});

const render = function() {
    console.log('渲染列表');
    bindEvent();
};

render();
render();
render(); // bindEvent存入了三次但是时间绑定只有一次
