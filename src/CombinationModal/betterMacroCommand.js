/**更强大的宏命令 */

const macroCommand = function() {
    return {
        commandsList:[],
        add: function(command) {
            this.commandsList.push(command);
        },
        execute: function() {
            for(let i = 0,command;command = this.commandsList[i++];) {
                command.execute();
            }
        }
    }
}

const openAcCommand = {
    execute: function() {
        console.log('打开空调');
    }
}

//由于电视和音响是连在一起的，所以可以构建一个宏命令来组合打开电视和打开音响
const openTvCommand = {
    execute: function() {
        console.log('打开电视');
    }
}

const openSoundCommand = {
    execute: function() {
        console.log('打开音响');
    }
}

const macroCommand1 = macroCommand();
macroCommand1.add(openTvCommand);
macroCommand1.add(openSoundCommand);

//关门，打开电脑和QQ的命令
const closeDoorCommand = {
    execute: function() {
        console.log('关门');
    }
}

const openPcCommand = {
    execute: function() {
        console.log('开电脑');
    }
}

const openQQCommand = {
    execute: function() {
        console.log('打开QQ');
    }
}

const macroCommand2 = macroCommand();
macroCommand2.add(closeDoorCommand);
macroCommand2.add(openPcCommand);
macroCommand2.add(openQQCommand);

// 把所有命令组合成一个超级命令
const finalMacroCommand = macroCommand();
finalMacroCommand.add(openAcCommand);
finalMacroCommand.add(macroCommand1);
finalMacroCommand.add(macroCommand2);

const setCommand = (function(command) {
    document.getElementById('button').onclick = function() {
        command.execute();
    }
})(finalMacroCommand)
