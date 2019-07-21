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



