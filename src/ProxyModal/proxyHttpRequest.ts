/* 合并http请求 */

const synchronousFile = (ids: string) => {
    console.log(`本次发送的id数量为${ids}`);
}

interface IproxyFile {
    cache: Array<string>;
    timer: any;
    synchronousFile(id: string)
}
class ProxySynChronusFile implements IproxyFile {
    readonly cache: Array<string>;
    timer: any;
    constructor() {
        this.cache = [];
        this.timer = null;
    }

    synchronousFile(id: string) {
        this.cache.push(id);
        if(this.timer) {// 如果定时器还在说明合并请求还未发送，不能影响到已有的定时器
            return ;
        }
        this.timer = setTimeout(() => {
            synchronousFile(this.cache.join(','));
            this.timer = null;
            clearTimeout(this.timer);
            this.cache.length = 0;
        }, 2000);
    }
}

const proxySynChronusFile = new ProxySynChronusFile;

const checkbox = document.getElementsByTagName('input');
for(let i = 0,input;input = checkbox[i++];) {
    input.onclick = function() {
        proxySynChronusFile.synchronousFile(this.id);
    }
}