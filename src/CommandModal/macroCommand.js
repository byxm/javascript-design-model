/* 宏命令，可以一次批量执行命令 */

const closeDoorCommand = {
    execute: function() {
        console.log('关门');
    }
}

const openPcCommand = {
    execute: function() {
        console.log('电脑');
    }
}

const openQQCommand = {
    execute: function() {
        console.log('登录QQ');
    }
}

const macroCommand = function() {
    return {
        commandsList: [],
        add: function(command) {
            this.commandsList.push(command);
        },
        execute: function(){
            for(let i = 0,command;command = this.commandsList[i++];) {
                command.execute();
            }
        }
    }
}

const macCommand = macroCommand();
macCommand.add(closeDoorCommand);
macCommand.add(openPcCommand);
macCommand.add(openQQCommand);

macCommand.execute();

