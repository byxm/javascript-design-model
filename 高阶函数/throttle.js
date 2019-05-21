const throttle = function(fn,interval) {
    let timer, // 保存定时器
    firstTime = true;// 是否第一次调用
    return function() {
        const args = arguments;
        if (firstTime) {
            fn.apply(this,args);
            firstTime = false
        }
        if (timer) {// 如果定时器还存在说明之前的函数延迟执行还没跑完，终止
            return ;
        }
        timer = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
            fn.apply(this,args)
        }, interval || 500);
    }
}

