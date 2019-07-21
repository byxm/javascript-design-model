# 发布-订阅模式
发布-订阅模式，又叫观察者模式用于定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。javascript中用事件模型代替观察者模式。
两个优点：
> 1.可以广泛运用在异步编程中，用于替代传统回调函数。只需要订阅感兴趣的事件发生的地点就可以。

> 2.可以取代对象之间硬编码的通知机制，一个对象不用再显示地调用另外一个对象的某个接口。让两个对象松耦合的联系在一起，虽然不太清楚彼此的细节，但这不影响他们之间的通信。当有新的订阅者出现时，发布者的代码不需要任何修改，同样发布者需要改变时也不会影响到之前的订阅者。只要之前约定的事件名没有发生变化，就可以自由改变他们。

## 自定义订阅售楼处的事件
模拟一次订阅售楼处消息的事件，假设在售楼处留下了自己的联系方式等到有合适自己的楼盘出售的时候在接收到相应的推送信息，并且订阅楼盘信息的人可以根据自己需要订阅相应的楼盘信息。
```typescript
interface ISalesOffices {
    clientList: object;
    listen: (key: string, fn: (price: number) => void) => void;
    trigger: (houseSize: string, price: number) => void;
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
salfes.listen('squareMeter88',function(price) {
    console.log('squareMeter88=',price);
})
salfes.listen('squareMeter100',function(price) {
    console.log('squareMeter100=',price);
});

salfes.trigger('squareMeter88',2000000);
salfes.trigger('squareMeter100',11100000000);
```
如果第二个对象需要订阅到同样的售楼信息，那么只需要继承第一个售楼对象的方法即可。
```typescript
class OtherSaleOffice extends SalesOffice{}
const otherSales = new OtherSaleOffice;
otherSales.listen('squareMeter88',function(price) {
    console.log('squareMeter88=',price);
})
otherSales.listen('squareMeter100',function(price) {
    console.log('squareMeter100=',price);
});

otherSales.trigger('squareMeter88',666666666);
otherSales.trigger('squareMeter100',888888888);
```