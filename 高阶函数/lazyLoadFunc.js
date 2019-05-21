// 一个例子，减少载入的时候对浏览器类型的判断封装一个通用的事件绑定函数

const addEvent = function(elem,type,handler) {
    // 在第一次载入的时候还是会进行一次判断，之后在内部改写这个事件监听的函数
    if (window.addEventListener) {
        addEvent = function(elem,type,handler) {
            elem.addEventListener(type,handler,false);
        }
    }else if (window.attachEvent) {
        addEvent = function(elem,type,handler) {
            elem.attachEvent('on' + type, handler);
        }
    }
    addEvent(elem,type,handler);//覆盖掉重新定义的addEvent函数
}