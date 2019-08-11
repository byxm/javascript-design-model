
interface ICommandObject {
    execute: () => any;
}

interface IMacroCommand {
    commandList: Array<any>;
    add: (command: ICommandObject) => any;
    execute: () => any;
}

class BetterMacroCommand implements IMacroCommand {
    commandList = [];

    add(command) {
        this.commandList.push(command);
    }
    execute() {
        for(let i = 0,command;command = this.commandList[i++];) {
            command.execute();
        }
    } 
}

const betterMacroCommand1 = new BetterMacroCommand;
const betterMacroCommand2 = new BetterMacroCommand;
const betterMacroCommand3 = new BetterMacroCommand;

const openAcCommand = {
    execute: function() {
        console.log('打开空调');
    }
}

//由于电视和音响是连在一起的，所以可以构建一个宏命令来组合打开电视和打开音响
const openTvCommand = {
    execute: function() {
        console.log('打开电视');
    },
    add: function() {
        throw new Error('叶对象里面不能再添加叶对象');
    }
}

const openSoundCommand = {
    execute: function() {
        console.log('打开音响');
    },
    add: function() {
        throw new Error('叶对象里面不能再添加叶对象');
    }
}
betterMacroCommand1.add(openAcCommand);
betterMacroCommand1.add(openTvCommand);
betterMacroCommand1.add(openSoundCommand);

const closeDoorCommand = {
    execute: function() {
        console.log('关门');
    },
    add: function() {
        throw new Error('叶对象里面不能再添加叶对象');
    }
}

const openPcCommand = {
    execute: function() {
        console.log('开电脑');
    },
    add: function() {
        throw new Error('叶对象里面不能再添加叶对象');
    }
}

const openQQCommand = {
    execute: function() {
        console.log('打开QQ');
    },
    add: function() {
        throw new Error('叶对象里面不能再添加叶对象');
    }
}

betterMacroCommand2.add(closeDoorCommand);
betterMacroCommand2.add(openPcCommand);
betterMacroCommand2.add(openQQCommand);

// 组合所有命令
betterMacroCommand3.add(openTvCommand);
betterMacroCommand3.add(betterMacroCommand1);
betterMacroCommand3.add(betterMacroCommand2);

const setCommand = (function(command) {
    document.getElementById('button').onclick = function() {
        command.execute();
    }
})(betterMacroCommand3)