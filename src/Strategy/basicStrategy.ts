// 计算奖金
//传统面向对象语言的实现

// 定义奖金的计算类
class PerformanceS {
    caculate(salary): number {
        return salary * 4;
    }
}

class PerformanceA {
    caculate(salary): number {
        return salary * 3;
    }
}

class PerformanceB {
    caculate(salary): number {
        return salary * 2;
    }
}

interface Istrategy {
    caculate: Function;
}
// 定义访问奖金计算方法的context
class Bonus {
    strategy: Istrategy;
    constructor(readonly salary: number,strategy: Istrategy) {// 初始化员工工资和计算工资的策略
        this.strategy = strategy;
    }
    getBonus(): number {
        if (!this.strategy) {
            throw new Error('没有设置正确的奖金计算strategy');
        }
        return this.strategy.caculate(this.salary);
    }
}

const bonusS = new Bonus(4000,new PerformanceS);
const bonusA = new Bonus(3000,new PerformanceA);
console.log(bonusS.getBonus(),bonusA.getBonus());


/**现在用javascript的策略模式来实现这个功能 */
interface IStrategy {
    S: (salary: number) => number;
    A: (salary: number) => number;
    B: (salary: number) => number;
}
interface IcaculateFunc {
    (level: string, salary: number): number;
}

const strategys: IStrategy = {
    'S':(salary: number) => {
        return salary * 4;
    },
    'A':(salary: number) => {
        return salary * 3;
    },
    'B':(salary: number) => {
        return salary * 2;
    }
}

// 直接使用caculate函数来充当context
const caculate:IcaculateFunc = (level,salary) => {
    return strategys[level](salary);
}

console.log(caculate('S',4000));
console.log(caculate('S',3000));