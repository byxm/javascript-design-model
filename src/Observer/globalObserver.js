/* 全局的发布订阅，不用考虑发布的对象和订阅的对象是谁，通过全局的对象去替代 */

const Event = (function() {
    let clientList = {},
        listen,
        trigger,
        remove;
    listen = function(key, fn) {
        if (!clientList[key]) {
            clientList[key] = [];
        }
        clientList[key].push(fn);
    };
    trigger = function() {
        let key = Array.prototype.shift.call(arguments),
            fns = clientList[key];
            if (!fns || fns.length === 0) {
                return false;
            }
            for(let i = 0,fn; fn = fns[i++];) {
                fn.apply(this,arguments);
            }
    }
    remove = function() {
        const fns = clientList[key];
        if (!fns) {
            return false;
        }
        if (!fn) {
            fns && (fns.length = 0);
        }else {
            for(let l = fns.length - 1;l >=0;l--) {
                const _fn = fns[l];
                if (_fn === fn) {
                    fns.splice(l,1)
                }
            }
        }
    }
    return {
        listen,
        trigger,
        remove
    }
})()

Event.listen('squareMeter88', function(price) {// 小红订阅消息
    console.log(`价格=${price}`)
})

Event.trigger('squareMeter88', 2000000);

module.exports = Event