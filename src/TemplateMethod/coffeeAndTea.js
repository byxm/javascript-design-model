/* 构造咖啡和牛奶的公共类
    煮沸水
    倒饮料
    加调料
*/

const Beverage = function() {};

Beverage.prototype.boilWater = function() {
    console.log('把水煮沸');
}

Beverage.prototype.brew = function() {
    throw new Error('子类必须重写brew方法');
} // 空方法应该由子类重写

Beverage.prototype.pourInCup = function() {
    throw new Error('子类必须重写pourInCup方法');
} // 空方法应该由子类重写

Beverage.prototype.addCondiments = function() {
    throw new Error('子类必须重写addCondiments方法');
}// 空方法应该由子类重写

Beverage.prototype.customerWantsCondiments = function() {
    return true;// 默认需要调料
}

Beverage.prototype.init = function() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    if (this.customerWantsCondiments()) {// 如果挂钩返回true，则需要调料
        this.addCondiments();
    }
}

// 创建Coffee子类和Tea子类
const Coffee = function() {};
Coffee.prototype = new Beverage();

Coffee.prototype.brew = function() {
    console.log('用沸水泡咖啡');
}

Coffee.prototype.pourInCup = function() {
    console.log('把咖啡倒进杯子里');
}

Coffee.prototype.customerWantsCondiments = function() {
    return window.confirm('请问咖啡需要调料吗？')
}

Coffee.prototype.addCondiments = function() {
    console.log('加糖和牛奶');
}


const coffee = new Coffee();
coffee.init();

const Tea = function() {};
Tea.prototype = new Beverage();

Tea.prototype.brew = function() { 
    console.log('用沸水泡茶');
}

Tea.prototype.pourInCup = function() {
    console.log('把茶叶倒进杯子里');
}

Tea.prototype.addCondiments = function() {
    console.log('加柠檬');
}

const tea = new Tea();
tea.init();