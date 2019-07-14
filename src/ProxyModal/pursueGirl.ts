/* 模仿小明追MM的例子 */

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