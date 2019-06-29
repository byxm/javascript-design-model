# 概念
书中对单例模式的定义是：``保证一个类仅有一个实例，并提供一个访问它的全局访问点。``类的实例仅有一个，并能够在全局访问，这似乎就是单例模式的核心概念。回想了一下自己在日常的开发中，这种场景并不少见，如点击登录按钮出现的modal框，缓存对象等。但是我在实现他们的时候并没有只让这个实例生成一次，总是在点击的时候加载，关闭的时候清除。看似是正常的逻辑，实则频繁的创建和清除对象可能对性能会有点影响，也没能很好的利用缓存的功能去优化代码。
## 用代理实现单例模式
```typescript
class CreateDiv {                                    
    html: string;
    constructor(html: string) {
        this.html = html;
        this.init();
    }
    init(): void {
       const div = document.createElement('div');
       div.innerHTML = this.html;
       document.body.append(div);
    }
}

const ProxySingletonCreateDiv = (function(){
    let instance: object;
    return class {
        constructor(html: string) {
            if (!instance) {//如果没有类生成则说明是第一次创建，如果有则直接返回，保证只有一个实例
                instance = new CreateDiv(html);
            }
            return instance;
        }
    }
})()

const a = new ProxySingletonCreateDiv('这是1类单例');
const b = new ProxySingletonCreateDiv('这是2类单例');
console.log(a === b);
```
> 这个例子用了一个创建div的类CreateDiv，这个类只创建一次，那么在第二次访问他的时候，通过缓存下来第一次创建的实例就可以了。使用ProxySingletonCreateDiv这个代理类可以很好的控制对CreateDiv的访问，将创建div的业务逻辑与访问生成实例的逻辑做了区分。