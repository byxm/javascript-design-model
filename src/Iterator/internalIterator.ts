/* 简单迭代器的实现 */

const each = function(array: Array<any>,callBack: (item: any, index: number) => void) {
    for(let i = 0; i < array.length; i++) {
        callBack.call(array[i],array[i],i);
    }
}

each([1,2,3,4,5],(item: any,index: number) => {
    console.log(item,index);
})