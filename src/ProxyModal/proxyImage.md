## 保护代理和虚拟代理
像这个例子中B可以帮助A过滤一些请求，比如不符合条件的对象直接过滤掉，对A对象的访问可以起到保护作用。还有一种情况new flower这样的操作非常的昂贵，那么就可以把这个操作交给B,让B在合适的时候在进行new flower的操作，这种代理方式叫做虚拟代理，**通过将开销很大的操作放到需要它的的时候再去执行。书中重点讲解的是虚拟代理。**就记录虚拟代理的例子。


## 图片预加载
工作中经常遇到的加载一个图片资源的时候，在还没有加载完成前先用一张loading图片来代替。
```typescript
// 首先构造加载图片的方法
const myImage = (function(): Iimage {
    const img = document.createElement('img');
    document.body.appendChild(img);

    return {
        setSrc: function(src: string) {
            img.src = src;
            console.log(src,img);
        }
    }
})()
```
先构造加载图片的方法，用于载入loading图片和请求成功的图片，它的职责只有一个，加载图片

```typescript
// 虚拟代理用于添加loading动画，只有在网络请求的图片加载完成才加载img的图片
const proxyImage = (function(): Iimage {
    const img: object = new Image;
    (img as any).onload = function() {
        // 网络请求的图片url加载完成在渲染请求的图片
        myImage.setSrc(this.src);
    }

    return {
        setSrc: function(src: string) {
            // 先加载loading图片
            myImage.setSrc('./images/loading.gif');
            (img as any).src = src;
        }
    }
})()

proxyImage.setSrc('http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg');
```
通过proxyImage间接访问MyImage,间接控制了对MyImage的访问，使得可以访问之前做一些事情。

## 代理的意义
上面那段代码如果不用代理模式可以这样写。
```typescript
const MyImage = (function() {
    const imgNode = document.createElement('div');
    document.body.appendChild(imgNode);
    const img = new Image;
    img.onload = function() {
        imgNode.src = img.src;
    }
    return {
        setSrc: function(src) {
            imgNode.src = './images/loading.gif';
            img.src = src;
        }
    }
})()
MyImage.setSrc('http://k.zolimg.com.cn/sjbbs/7692/a7691515_s.jpg');
```
这也是我一般会使用的写法，将渲染图片的imgNode和判断加载完成前渲染loading的功能放在了一个类里面。这样就违反了单一职责原则。如果以后我不需要loading这个功能，势必要到Myimage这个类里面去删除代码。如果用代理，只需要在外面删除屌proxyImage的调用即可。用代理负责预加载，把和加载图片的功能类分离开来。下面是es6的实现
```typescript
interface Imyimage {
    setSrcImge: (src: string) => void;
}
// 设置图片src
class MyImage implements Imyimage {
    readonly img: any;
    constructor() {
        this.img = document.createElement('img');
        document.body.appendChild(this.img);
    }
    setSrcImge(src: string) {
        this.img.src = src;
    }
}

// 预加载图片处理
class ProxyImage extends MyImage {
    readonly imageNode: any;
    constructor() {
        super();
        this.imageNode = new Image;
    }
    setSrcImge(src: string) {// 重写setSrcImge方法
        this.imageNode.onload = () => {
            super.setSrcImge(src);// 调用父类的setSrcImge方法
        }
        super.setSrcImge('./images/loading.gif');
        this.imageNode.src = src
    }
}

const proxyImage = new ProxyImage;
proxyImage.setSrcImge('http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg');
```
这里我在MyImage和ProxyImage这个派生类里面都设置了相同的方法setSrcImge。这样使得预加载图片这个功能和本体的渲染图片的功能分离开来了。如果以后不需要预加载那么只需要直接访问本地即可。不用再源代码上面做任何修改。
使用书上的话说，两个好处：
1.用户可以放心地请求代理，他只关心能否得到想要的结果。
2.再任何使本体的地方都可以替换成使用代理。