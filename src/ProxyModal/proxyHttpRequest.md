## 合并HTTP请求
这个例子是合并大数量的HTTP请求，一次性发送大量http请求对于实时性很高的系统来说还是会带来比较大的开销。那么我们可以把多次的请求合并成一次在某个时间点一次性发送可以大大减小服务器的压力。
也是同样的将本体的发送方法和用于虚拟代理的发送方法分开来，如果后面不需要合并请求了在一次性发送。
```typescript
// 数据发送的方法
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
```
通过访问构造的代理类ProxySynChronusFile去进行服务端数据文件的实时存储，可以在设定的定时器的时间内一次性发送选好的文件。并且将代理合并发送的类和checkbox点击事件做了分离，如果后续不需要代理可以直接去掉proxySynChronusFile调用synchronousFile即可。