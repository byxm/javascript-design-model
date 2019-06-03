/* 构造外部迭代器的例子 */
const Iterator = function(obj) {
    let current = 0;
    const next = function() {
        current += 1;
    }
    const isDone = function() {
        return current >= obj.length;
    }
    const getCurrentItem = function() {
        return obj[current];
    }
    return {
        next,
        isDone,
        getCurrentItem,
        length:obj.length
    }
}

// 一个比较compare比较函数使用外部迭代器
const compare = function(iterator1,iterator2) {
    if (iterator1.length !== iterator2.length) {
        alert('iterator1 和 iterator2不相等');
    }
    while(!iterator1.isDone() && !iterator2.isDone()) {
        if (iterator1.getCurrentItem() !== iterator2.getCurrentItem()) {
            throw new Error('iterator1 和 iterator2不相等')
        }
        iterator1.next();
        iterator2.next();
    }
}

const iterator1 = Iterator([1,2,3,4,5,6]);
const iterator2 = Iterator([1,2,3,4,5]);

compare(iterator1,iterator2)

/* 相对于内部迭代器迭代对象只能够在回掉函数里面进行相应的操作比较，外部迭代器显示的传入了比较数组，将数组内部的迭代放到了迭代器里面 */