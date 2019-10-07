/**
 *茶和咖啡的例子
 *
 */

// 饮料抽象类，包含包含各种饮料制作的方法
abstract class Beverages {
    boilWater() {
        console.log('把水煮沸');
    }
    abstract brew(): void; // 浸泡种类
    abstract pourInCup(): void; // 把饮料倒进杯子里，具体到哪种饮料有继承类实现
    abstract addCondiments(): void; // 添加佐料，具体哪种由继承类实现
    customAddConimentsHook() {
        // 判定是否添加糖和牛奶的钩子,默认添加
        return true;
    }
    init() {
        this.brew();
        this.pourInCup();
        if (this.customAddConimentsHook()) {
            this.addCondiments();
        }
    }
}

// 创建咖啡类
class Coffees extends Beverages {
    brew() {
        console.log('用沸水浸泡咖啡');
    }
    pourInCup() {
        console.log('把咖啡倒进杯子');
    }
    addCondiments() {
        console.log('加糖和牛奶');
    }
    customAddConimentsHook() {
        return window.confirm('是否添加糖和牛奶');
    }
}

const cof = new Coffees();
cof.init();

// 创建茶类
class Teas extends Beverages {
    brew() {
        console.log('用沸水浸泡茶叶');
    }
    pourInCup() {
        console.log('把茶倒进杯子');
    }
    addCondiments() {
        console.log('加柠檬');
    }
}

const teas = new Teas();
teas.init();
