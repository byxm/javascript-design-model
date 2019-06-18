const goods = {
    // 存储手机库存的JSON对象
    'red|32G': 3, // 红色32G
    'red|16G': 0, // 红色16G
    'blue|32G': 1, // 蓝色32G
    'blue|16G': 6, // 蓝色16G
};

const mediator = (function() {
    const colorSelect = document.getElementById('colorSelect');
    const numberInput = document.getElementById('numberInput');
    const memorySelect = document.getElementById('memorySelect');
    const colorInfo = document.getElementById('colorInfo');
    const numberInfo = document.getElementById('numberInfo');
    const memoryInfo = document.getElementById('memoryInfo');
    const nextBtn = document.getElementById('nextBtn');

    return {
        changed: function(obj) {
            const color = this.value;
            const memory = memorySelect.value;
            const number = numberInput.value;
            const stock = goods[`${color}|${memory}`];// 颜色和内存的手机数量

            if (obj === colorSelect) {// 如果改变的是选择颜色下拉框
                colorInfo.innerHTML = color;
            }else if (obj === memorySelect) {
                memoryInfo.innerHTML = memory;
            }else if(obj === numberInput) {
                numberInfo.innerHTML = number;
            }

            if(!color) {
                nextBtn.disabled = true;
                nextBtn.innerHTML = '请选择手机颜色';
                return;
            }
            if (!memory) {
                nextBtn.disabled = true;
                nextBtn.innerHTML = '请选择内存大小';
                return;
            }
            if (Number.isInteger(number - 0) && number > 0) {
                // 输入数量是否为正整数
                nextBtn.disabled = true;
                nextBtn.innerHTML = '请输入正确的购买数量';
                return;
            }

            nextBtn.disabled = false;
            nextBtn.innerHTML = '放入购物车';
        },
    };
})();

//事件函数
colorSelect.onchange = function() {
    mediator.changed(this);
}
memorySelect.onchange = function() {
    mediator.changed(this);
}
numberInput.oninput = function() {
    mediator.changed(this);
}
