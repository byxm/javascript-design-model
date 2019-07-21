# 迭代器模式
迭代器模式是指提供一种方法顺序访问一个聚合对象的各个元素，而又不暴露该对象的内部表示。迭代器模式可以把迭代的过程从业务逻辑中分离出来，在使用迭代模式之后即使不关心对象的内部构造，也可以顺序访问其中的每个元素。

## 简单迭代器的实现
```typescript
const each = function(array: Array<any>,callBack: (item: any, index: number) => void) {
    for(let i = 0; i < array.length; i++) {
        callBack.call(array[i],array[i],i);
    }
}

each([1,2,3,4,5],(item: any,index: number) => {
    console.log(item,index);
})
```

## 内部迭代器和外部迭代器
上述实现的方式是一种内部迭代器，each函数内部定义好了迭代规则，它完全接手整个迭代过程，外部只需要一次调用。
外部迭代器：
外部迭代器增加了一些调用的复杂度，但相对也增加了迭代器的灵活性，我们可以手工控制迭代过程或者顺序。外部迭代器必须显示的请求迭代下一个元素。
```typescript
/* 构造外部迭代器,比较两个数组是否相等 */

interface Iiterator {
    current: number;
    iteratorObj: Array<any>;
    length: number;
    next: () => void;
    isDone: () => boolean;
    getCurrItem: () => any;
}

class Iterator implements Iiterator {
    current = 0;
    iteratorObj;
    length;
    constructor(arr: Array<any>) {
        this.iteratorObj = arr;
        this.length = arr.length;
    }

    next() {
        this.current +=1;
    }

    isDone() {
        return this.current >= this.iteratorObj.length;
    }

    getCurrItem() {
        return this.iteratorObj[this.current]
    }
}

const iterator1 = new Iterator([1,2,3,4,5,5]);
const iterator2 = new Iterator([3,4,5,56,6,6]);

const compare = (iterator1,iterator2) => {
    if (iterator1.length !== iterator2.length) {
        throw new Error('iterator1和iterator2不相等');
    }
    while(!iterator1.isDone() && !iterator2.isDone()) {
        if (iterator1.getCurrItem() !== iterator2.getCurrItem()) {
            throw new Error('iterator1和iterator2不相等');
        }
        iterator1.next();
        iterator2.next();
    }
    alert('iterator1和iterator2相等');
}
```