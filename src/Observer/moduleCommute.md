## 模块间的通信
可以使用全局的发布订阅对象来进行模块之间的通信，这两个模块可以完全不知道对方的存在。
```javascript
import Event from './customEvent';

const a = (function() {
    let count = 0;
    const button = document.getElementById('count');
    button.onclick = function() {
        Event.trigger('add',count++);
    }
})()

const b = (function() {
    const div = document.getElementById('show');
    Event.listen('add',function(count) {
        div.innerHTML = count;
    });
})()
```
<img src='./images/发布-订阅.png' />
