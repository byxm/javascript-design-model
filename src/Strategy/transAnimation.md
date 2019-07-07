# 策略模式实现缓动动画
实现一个缓动动画的封装，动画的方式也就是这里需要封装的策略算法。
```typescript
/* 缓动动画的封装 */

interface Itween {
    linear: (t: number, b: number, c: number, d: number) => number;
    easeIn: (t: number, b: number, c: number, d: number) => number;
    strongEaseIn: (t: number, b: number, c: number, d: number) => number;
    strongEaseOut: (t: number, b: number, c: number, d: number) => number;
    sineaseIn: (t: number, b: number, c: number, d: number) => number;
    sineaseOut: (t: number, b: number, c: number, d: number) => number;
}

interface Ianimate {
    dom: HTMLElement;
    startTime: number;
    startPos: number;
    endPos: number;
    propertyName: string;
    easing: (t: number, b: number, c: number, d: number) => number;
    duration: number;
}

const tween: Itween = {
    linear: function(t, b, c, d) {
        return (c * t) / d + b;
    },
    easeIn: function(t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    strongEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    strongEaseOut: function(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    sineaseIn: function(t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    sineaseOut: function(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
};

class Animate implements Ianimate {
    startTime = 0; // 动画开始时间
    startPos = 0; // 动画开始时，dom节点位置
    endPos = 0; // 结束时dom节点的位置
    propertyName; // dom节点需要被改变的属性名
    easing; // 缓动算法
    duration; // 持续时间

    constructor(readonly dom: HTMLElement) {}

    start(propertyName: string, endPos: number, duration: number, easing: string): void {
        this.startTime = +new Date(); // 动画启动时间点
        this.startPos = this.dom.getBoundingClientRect()[propertyName]; // dom节点起始位置
        this.propertyName = propertyName; // dom节点需要被改变的css属性名
        this.endPos = endPos;
        this.duration = duration;
        this.easing = tween[easing];
        const self = this;
        const timeId = setInterval(function() {
            if (self.step() === false) {
                clearInterval(timeId);
            }
        }, 19);
    }

    step(): boolean | void {
        const t = +new Date();
        if (t >= this.startTime + this.duration) {// 如果还没到达结束时间
            this.update(this.endPos); // 更新小球的css属性值
            return false;
        }
        // 如果到达了结束时间
        const pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration);
        this.update(pos);// 更新小球的属性值
    }

    update(pos: number) {
        this.dom.style[this.propertyName] = pos + 'px';
    }
}

const div = document.getElementById('div');
const animate = new Animate(div);
animate.start('left',500,1000,'strongEaseOut');
```
这种动画运动框架在最初学习前端的时候有封装过，不过以前并没有用过这种设计模式去实现，就是封装了个函数然后往里面传入各种参数判断这样运动的那个函数就非常的臃肿。这里将运动的算法放在tween这个策略对象里面，访问它的环境类context在Animate里面，然后自定义它的运动规则的调用，包括步长的计算，位置的更新这些操作都放在animate里面去分布定义。