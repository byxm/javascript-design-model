// 策略模式封装的小球运动

/**
 * 参数代表动画消耗时间，小球原始位置，小球目标位置，动画持续总时间
 */

const tween = {
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

// 构造Animate类
const Animate = function(dom) {
    this.dom = dom;
    this.startTime = 0;
    this.startPos = 0;
    this.endPos = 0;
    this.propertyName = null; // dom节点需要被改变的css属性名
    this.easing = null; // 缓动算法
    this.duration = null; // 持续时间
};

Animate.prototype.start = function(propertyName, endPos, duration, easing) {
    this.startTime = +new Date;
    this.startPos = this.dom.getBoundingClientRect()[propertyName];
    this.propertyName = propertyName; // dom节点改变的属性名
    this.endPos = endPos; // dom节点目标位置
    this.duration = duration;
    this.easing = tween[easing];

    const self = this;
    const timed = setInterval(function() {
        // 启动定时器
        if (self.step() === false) {
            // 如果动画已结束，则清楚定时器
            clearInterval(timed);
        }
    }, 19);
};

Animate.prototype.step = function() {
    const t = +new Date;
    if (t >= this.startTime + this.duration) {
        this.update(this.endPos);
        return false;
    }
    const pos = this.easing(t - this.startTime,this.startPos,this.endPos - this.startPos,this.duration)// pos为小球当前位置
    this.update(pos)
};

Animate.prototype.update = function(pos) {
    this.dom.style[this.propertyName] = pos + 'px';
}

const div = document.getElementById('div');
const animate = new Animate(div)

animate.start('left',500,1000,'strongEaseOut')
