/* 好莱坞原则改写茶和咖啡的例子，传统javascript中相对于对象委托的继承方式来说，高阶函数反而是实现这个例子的最好方法 */
const Beverage = function(param){
    const boilWater = function() {
        console.log('把水煮沸');
    }
    const brew = param.brew || function() {
        throw new Error('必须传递brew方法');
    }
    const pourInCup = param.pourInCup || function() {
        throw new Error('必须传入pourInCop方法');
    }
    const addCondiments = param.addCondiments || function() {
        throw new Error('必须传入addCondiments方法');
    }
    const F = function() {}
    F.prototype.init = function() {
        boilWater();
        brew();
        pourInCup();
        addCondiments();
    }
    return F;
}

const Coffee = Beverage({
    brew: function() {
        console.log('用沸水冲泡咖啡');
    },
    pourInCup: function() {
        console.log('把咖啡倒进杯子里');
    },
    addCondiments: function() {
        console.log('加糖和牛奶');
    }
})

const Tea = Beverage({
    brew: function() {
        console.log('用沸水冲泡茶叶');
    },
    pourInCup: function() {
        console.log('把茶叶倒进杯子里');
    },
    addCondiments: function() {
        console.log('加柠檬');
    }
})

const coffee = new Coffee();
coffee.init();

const tea = new Tea();
tea.init();