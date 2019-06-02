/* 虚拟代理加载图片 */
const myImage = (function() {
    const imageNode = document.createElement('img');
    document.body.appendChild(imageNode);
    return {
        setSrc: src => {
            imageNode.src = src;
        },
    };
})();

// 图片预加载的代理
const proxyImage = (function() {
    const img = new Image();
    img.onload = function() {
        // 图片资源载入完成才加载图片
        myImage.setSrc(this.src);
    };
    return {
        setSrc: src => {
            myImage.setSrc('./images/loading.gif');
            img.src = src;
        },
    };
})();

proxyImage.setSrc('http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg');

// 在这个代理里面将图片的预处理和图片的加载分开。myImage对象只负责加载图片，预加载就分开放在了另外一边，
// 如果以后预加载有新的需求，或者不需要了那么就不用动myImage对象，更好的将操作进行解耦
