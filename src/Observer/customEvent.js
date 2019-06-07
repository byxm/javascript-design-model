;/* 自定义事件发布订阅 */

// const salesOffices = {}; // 自定义售楼处

// salesOffices.clientList = {}; // 缓存列表，缓存订阅者的回调函数

// salesOffices.listen = function(key,fn) {
//     if (!this.clientList[key]) {// 如果还没有订阅过此消息，给此消息添加缓存列表
//         this.clientList[key] = [];
//     }
//     this.clientList[key].push(fn); // 订阅的消息添加进缓存列表
// }

// salesOffices.trigger = function() {// 发布消息
//     const key = Array.prototype.shift.call(arguments), // 取出消息类型
//           fns = this.clientList[key]; //取出该消息对应的函数集合
//     if (!fns || fns.length === 0) { // 如果没有订阅该消息则返回
//         return false;
//     }
//     for(let i = 0,fn;fn = fns[i++];) {
//         fn.apply(this,arguments); // arguments是发送消息时附赠的参数
//     }
// }

// salesOffices.listen('squareMeter88',function(price) {
//     console.log(`价格${price}`);
// })

// salesOffices.listen('squareMeter110',function(price) {
//     console.log(`价格${price}`);
// })

// salesOffices.trigger('squareMeter88',2000000);// 发布两百万的房子
// salesOffices.trigger('squareMeter110',3000000); // 发布三百万的房子

//现在根据订阅的消息，发布来看自己的房子




//现在把发布-订阅的功能提取出来，单独放到一个对象里面：
const event = {
    clientList: {},
    listen: function(key,fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = [];
        }
        this.clientList[key].push(fn)
    },
    trigger: function() {
        const key = Array.prototype.shift.call(arguments),
        fns = this.clientList[key];
        if (!fns || fns.length === 0) {
            return false;
        }
        for(let i = 0,fn;fn = fns[i++];) {
            fn.apply(this,arguments);
        }
    }
}
event.remove = function(key, fn) {// 取消之前的订阅事件
    const fns = this.clientList[key];
    if (!fns) {// 如果相应的的key没有被订阅过，直接返回
        return false;
    }
    if (!fn) {// 如果没有传入具体的回掉函数，表示需要取消key对应消息的所有订阅
        fns && (fns.length = 0)
    }else {
        for(let l = fns.length - 1;l >= 0;l--) {// 反向遍历要订阅的回掉函数
            const _fn = fns[l];
            if (_fn === fn) {
                fns.splice(l,1);
            }
        }
    }
}

const installEvent = function(obj) {
    for(const i in event){
        obj[i] = event[i];
    }
}

const salesOffices = {};// 给售楼处动态添加发布-订阅功能
installEvent(salesOffices);
salesOffices.listen('squareMeter88',fn1 = function(price){
    console.log(`小明订阅的88平方米的价格,${price}`)
});
salesOffices.listen('squareMeter100',fn2 = function(price) {
    console.log(`小红订阅的100平方米的价格,${price}`);
});


// salesOffices.trigger('squareMeter88',3000000);
salesOffices.remove('squareMeter88',fn1)
salesOffices.trigger('squareMeter100',6000000);

