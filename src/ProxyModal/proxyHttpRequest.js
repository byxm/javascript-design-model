/* 代理合并多次http请求，将多次的http请求合并到一处在发送，可以有效的减少请求时间 */


const synchronousFile = function(id) {
    console.log('开始同步id为',id);
}

const proxySynchronousFile = (function(){
    const cache = [];// 保存一段时间内需要同步的id
    let timer;

    return function(id) {
        cache.push(id);
        if (timer) { // 避免定时器覆盖
            return;
        }
        timer = setTimeout(() => {// 2s的延迟之后才会把需要向服务端发送同步的文件进行发送，对延时要求不高的系统来说很能减少服务器的压力
         synchronousFile(cache.join(','));
         clearTimeout(timer)
         timer = null;
         cache.length = 0;
        }, 2000);
    }
})()

const checkbox = document.getElementsByTagName('input');

for(let i=0,check;check=checkbox[i++];){
    check.onclick = function(){
        if (this.checked === true) {
            proxySynchronousFile(this.id);// 代理存储所有请求然后一次性发送
        }
    }
}

