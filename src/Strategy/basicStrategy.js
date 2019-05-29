// 策略模式封装一系列的算法，相互之间可以替换

const strategies = {
    'S':function(salary) {
        return salary * 4;
    },
    'A':function(salary) {
        return salary * 3;
    },
    'B':function(salary) {
        return salary * 2;
    },
}

const caculateBonus = function(level,salary) {
    return strategies[level](salary);
}

console.log(caculateBonus('S',3000));
console.log(caculateBonus('A',3000));
console.log(caculateBonus('B',3000));