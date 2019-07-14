# 代理模式
书中对代理模式的定义是：``为一个对象提供一个代用品或占位符，以便控制对它的访问。``这个解释对刚接触的我来说就比较陌生了。不同于策略模式的那种感觉，对这种模式的使用没有什么印象。代理模式的关键在于``当一个用户不能直接访问一个对象或者不满足访问这个对象的条件的时候，就可以提供一个中间对象来控制对这个对象的访问。这个中间对象对这个请求做出一些处理之后再把请求转给本体对象。``

## 小明追MM
先用小明追MM的例子来展示一下代理模式。
```typescript
interface IreceiveObj {
    receiveFlower:(flower: object) => void;
}

class Flower {

}

const xiaoming = {
    /** 传入要接受鲜花的对象*/
    sendFlower: (target: IreceiveObj): void => {
        const flower = new Flower;
        target.receiveFlower(flower);
    }
}

const A = {// 实际接受鲜花的对象A
    receiveFlower: (flower: object):void => {
        console.log(`收到花${flower}`);
    },
    listenGoodMood: (fn: Function) => {// 假设10S之后A的心情变好
        setTimeout(() => {
            fn();
        }, 1000 * 10);
    }
}

const B = {// 接受鲜花的中间对象B
    receiveFlower: (flower: object): void => {// B收到花之后监听A心情好的时候，在A心情好的时候把花送给A
        A.listenGoodMood(function(){
            A.receiveFlower(flower);
        })
    }
}

xiaoming.sendFlower(B)
```
这个例子在这里的运用场景就是小明并不知道他想要访问的对象A的情况。因为并不是什么时候A都有一个好心情接受鲜花。而这个时候B因为和A关系很近，所以可以委托B在A心情好的时候把花交给A，由B去监听A的心情变化。``就是在这种不确定访问对象的情况下代理模式就显示出了它的作用``