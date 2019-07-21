## 网站登录
在网站登录中通常会有这样的场景，在接收到登录成功的信息之后再渲染网站对应的模块，比如导航栏，购物车栏、用户头像等等。按照一般的通过回调事件的方式去获取这些内容信息，通常是在登录成功的回调里面进行。
```typescript
login.succ((data) => {
    header.setAvatar(data.avatar);// 设置header头像
    nav.setAvatar(data.avatar);// 设置导航头像
    message.refresh();// 刷新消息列表
    cart.refresh();// 刷新购物车列表
})
```
首先这里面每个模块的实现方式是未知的，如果以后修改了登录名字或者需要增加登录模块的功能那么势必要到login模块里面去添加。现在将登录成功的事件发布出来，相应的各个模块只需要去订阅登录成功的事件即可。
```typescript
$.ajax('http://www.baidu.com',function(data) {
    login.trigger('loginSuccess',data);
))

const header = (function() {
    return {
        setAvatar: function(data) {
           console.log('设置header的头像');
        }
    }
})()

const nav = (function() {
    return {
        setAvatar: function(data) {
            console.log('设置nav头像');
        }
    }
})

login.listen('loginSuccess',function(data){
        header.setAvatar(data);
})

login.listen('loginSuccess',function(data) {
        nav.setAvatar(data);
})
```
现在通过发布订阅的写法我们无需业务模块的实现，在每个业务模块实现的时候调用订阅好的事件进行登录成功的逻辑编写。