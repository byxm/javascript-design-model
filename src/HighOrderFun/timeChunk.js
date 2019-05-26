const timeChunk = function(arr,fn,count) {// 传入要节流的数据，执行操作事件的函数，以及每次节流完成的数量
    let t;
    const start = function() {
        for(let i = 0;i < Math.min(count | 1,arr.length);i++) {// 每次的取值需要小于count
            const obj = arr.shift();// 通过shift每次截取第一个值从而改变arr里面的内容这样可以减少计算量
            fn(obj);
        }
    }
    return function() {
        t = setInterval(()=>{
            if (arr.length === 0) {
                clearInterval(t);
            }
            start();
        },200)
    }
}