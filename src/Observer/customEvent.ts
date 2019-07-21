interface ISalesOffices {
    clientList: object;
    listen: (key: string, fn: (price: number) => void) => void;
    trigger: (houseSize: string, price: number) => void;
    remove: (key: string, fn: Function) => void;
}

class SalesOffice implements ISalesOffices {
    clientList = {}; // 缓存列表，如果没有订阅过该类消息，给给该类消息添加一个缓存列表

    listen(key, fn) {
        if (!this.clientList[key]) {
            // 如果还没有订阅过此消息，给此消息创建一个缓存列表
            this.clientList[key] = [];
        }
        // 订阅消息添加进缓存列表
        this.clientList[key].push(fn);
    }

    trigger(houseSize,price) {
        const fns = this.clientList[houseSize];
        if (!fns || fns.length === 0) {// 如果没有订阅该消息则返回
            return false;
        }
        for(let i = 0,fn;fn=fns[i++];) {
            fn(price);
        }
    }

    //移除对应的订阅事件
    remove(key,fn) {
        const fns = this.clientList[key];
        if (!key) {// 如果对应的key没有人订阅
            return false;
        }
        if (!fn) {// 如果没有传入具体回调函数，表示需要取消key对应的所有订阅
            fns && (fns.length = 0);
        }else {
            for(let i = 0;i < fns.length;i++) {
                const _fns = fns[i];
                console.log(_fns,fn);
                if (_fns === fn) {
                    fns.splice(i,1);
                }
            }
        }
    }
}

const salfes = new SalesOffice;
const fn12= function(price) {
    console.log('squareMeter88=',price);
}
salfes.listen('squareMeter88',fn12)
salfes.listen('squareMeter88',function(price) {
    console.log('squareMeter88=',price);
});

salfes.remove('squareMeter88',fn12);
salfes.trigger('squareMeter88',2000000);
// salfes.trigger('squareMeter100',11100000000);



// class OtherSaleOffice extends SalesOffice{}
// const otherSales = new OtherSaleOffice;
// otherSales.listen('squareMeter88',function(price) {
//     console.log('squareMeter88=',price);
// })
// otherSales.listen('squareMeter100',function(price) {
//     console.log('squareMeter100=',price);
// });

// otherSales.trigger('squareMeter88',666666666);
// otherSales.trigger('squareMeter100',888888888);

export default salfes;