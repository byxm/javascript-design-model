/* 自定义迭代器的编写，理解内部迭代器的实现原理 */

const each = function(arr,callback) {
    for(let i = 0,l = arr.length;i < l;i++){
        callback.call(arr[i],arr[i],i);
    }
}

each([1,2,3,4,5],function(i,index){
    console.log([i,index],this)
})