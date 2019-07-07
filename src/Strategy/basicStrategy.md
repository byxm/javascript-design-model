# 概念
书中所讲的策略模式其实在平时开发中经常用。不过做的时候并不知道这种写法可以归纳为策略模式。典型的平时使用的场景就是讲一系列的方法放在一个对象里面，当程序运行到某个阶段需要使用某种方法的时候去执行对应的方法。一直以来我都是用这种方式减少if语句，书中对这种模式的运用又做了很多系统的讲解。
> ``定义一系列的算法，把他们一个个封装起来，并且使它们可以相互替换。``这是书中对策略模式下的定义。

## 计算奖金的例子
书中一个例子是根据员工的工资和绩效等级来计算奖金。可能普通的实现方式通常就是封装一个函数，传入对应的等级和工资在函数里面做计算。这样做的话后续的扩展都会叠加在这个计算函数的内部.
```typescript
const caculateBonus = (performancel: string,salary: number): void => {
    if(performancel === 'A') {
        return salary * 4;
    }
    if(performancel === 'B') {
        return salary * 3;
    }
}
caculateBonus('A',4000);
```
> 像这种计算函数内部既需要判断绩效等级，又要做计算奖金的过程，当业务也越来越复杂的时候caculateBonus的扩展性就会变得相当的差。

``接下来使用策略模式重构，需要将不变的和变化的分离开来，这是设计模式的基本要求。这个例子里面算法的使用方式的不变的，而算法的实现过程是变化的，每种绩效对应着不同的计算规则。``
``一个策略模式至少由两部分组成，第一个部分是一组策略类，这个类里面用于封装计算各种需求的算法。第二个是context上下文通过这个将请求委托给某一个策略类。那么context中就要维持对某一个策略对象的引用。``
先模仿在传统面向对象语言中的实现
```typescript
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

const bonus = new Bonus(4000,new PerformanceS);
console.log(bonus.getBonus());
```
在这个写法中，将算法单独封装在了performance*这几个类中，调用这几个方法的context类Bonus在发起请求的时候直接传入要访问的那个算法，然后在内部去调用对应的算法。下面用javascript来实现相应的策略模式
```typescript
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
```
> 在javascript中因为函数也是对象，所以可以直接把strategy定义为函数，就不用像使用类里面的那种方式去定义了。这也是以前优化代码的基本写法。我一直理解的就是通过对象去匹配，并不知道有策略模式的定义在里面。