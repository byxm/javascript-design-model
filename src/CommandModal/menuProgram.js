const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');

// 预留好安装命令接口，让command知道如何去和对象进行沟通
const setCommand = function(button,command) {
    button.onclick = function() {
        command.execute();
    }
}

const menuBar = {
    refresh: function() {
        console.log('刷新菜单目录');
    }
}

const subMenu = {
    add: function() {
        console.log('添加子菜单');
    },
    del: function() {
        console.log('删除子菜单');
    }
}

//将这些行为都封装在命令类中
const refreshMenuBarCommand = function(receiver){
    this.receiver = receiver;
}

refreshMenuBarCommand.prototype.execute = function() {
    this.receiver.refresh();
}

const addSubMenuCommand = function(receiver) {
    this.receiver = receiver;
}

addSubMenuCommand.prototype.execute = function() {
    this.receiver.add();
}

const delSubMenuCommand = function(receiver) {
    this.receiver = receiver;
}

delSubMenuCommand.prototype.execute = function() {
    this.receiver.del();
}

const refreshBar = new refreshMenuBarCommand(menuBar);
const addSubBar = new addSubMenuCommand(subMenu);
const delSubBar = new delSubMenuCommand(subMenu);

//解耦命令和绑定命令的对象
setCommand(button1,refreshBar);
setCommand(button2,addSubBar);
setCommand(button3,delSubBar);