/* 简单单列模式的编写 */

//创建普通的生成CreateDiv的类
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

//引入代理类来控制对createDiv类的访问
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