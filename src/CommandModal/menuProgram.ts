/* 设置安装命令的接口 */

function setCommands(button:HTMLElement, command: any): void{
    button.onclick = function() {
        command.execute();
    }
}

/* 命令方法对象 */

const MenuBar = {
    refresh: () => {
        console.log('刷新菜单目录');
    }
}

const SubMenu = {
    add: () => {
        console.log('增加子菜单');
    },
    del: () => {
        console.log('删除子菜单');
    }
}

interface IRefresh {
    refresh: () => void;
}

interface IAddSub {
    add: () => void;
}

interface IDel {
    del: () => void;
}

// 构造各自的命令类
class RefreshMenuBarCommand {
    constructor(readonly receive: IRefresh) {
        this.receive = receive;
    }

    execute(): void {
        this.receive.refresh();
    }
}

class AddSubMenuCommand {
    constructor(readonly receive: IAddSub) {
        this.receive = receive;
    }

    execute(): void {
        this.receive.add();
    }
}

class DelMenuCommand {
    constructor(readonly receive: IDel) {
        this.receive = receive;
    }

    execute(): void {
        this.receive.del();
    }
}

// 创建对应命令类的实例
const refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar);
const addSubMenuCommand = new AddSubMenuCommand(SubMenu);
const delSubMenuCommand = new DelMenuCommand(SubMenu);

const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');

setCommands(button1,refreshMenuBarCommand);
setCommands(button2,addSubMenuCommand);



/** javascript中的命令模式  */

const setCommandJS = function(button,command) {
     button.onclick = function() {
         command.execute();
     }
}


const MenuBars = {
    refresh: function() {
        console.log('刷新菜单页面');
    }
}

const refreshMenuBarCommand1 = function(receiver) {
    return {
        refresh:function() {
            receiver.refresh();
        }
    }
}

const refresh = refreshMenuBarCommand1(MenuBar);

setCommandJS(button1,refresh);
