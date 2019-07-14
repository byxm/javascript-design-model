/* 代理图片预加载的例子 */

// interface Iimage {
//     setSrc: (src: string) => void;
// }

// // 首先构造加载图片的方法
// const myImage = (function(): Iimage {
//     const img = document.createElement('img');
//     document.body.appendChild(img);

//     return {
//         setSrc: function(src: string) {
//             img.src = src;
//             console.log(src,img);
//         }
//     }
// })()

// // 虚拟代理用于添加loading动画，只有在网络请求的图片加载完成才加载img的图片
// const proxyImage = (function(): Iimage {
//     const img: object = new Image;
//     (img as any).onload = function() {
//         // 网络请求的图片url加载完成在渲染请求的图片
//         myImage.setSrc(this.src);
//     }

//     return {
//         setSrc: function(src: string) {
//             // 先加载loading图片
//             myImage.setSrc('./images/loading.gif');
//             (img as any).src = src;
//         }
//     }
// })()

// proxyImage.setSrc('http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg');



// const MyImage = (function() {
//     const imgNode: any = document.createElement('div');
//     document.body.appendChild(imgNode);
//     const img = new Image;
//     img.onload = function() {
//         imgNode.src = img.src;
//     }
//     return {
//         setSrc: function(src) {
//             imgNode.src = './images/loading.gif';
//             img.src = src;
//         }
//     }
// })()
// MyImage.setSrc('http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg');

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