/* 定义各自的命令的集合 */

interface ICommand {
    execute: () => void;
}

class CloseDoorCommand implements ICommand {

    execute() {
        console.log('关上门');
    }
}

class OpenComputerCommand implements ICommand {

    execute() {
        console.log('打开电脑');
    }
}

class OpenQQCommand implements ICommand {

    execute() {
        console.log('打开QQ');
    }
}


interface IMacro {
    commandList: Array<any>;
    add: (command: ICommand) => void;
    execute: () => void;
}

class MacroCommand implements IMacro {
    commandList = [];

    add(command) {
        this.commandList.push(command);
    }

    execute() {
        this.commandList.forEach((command: ICommand) => {
            command.execute();
        })
    }    
}

const macroCommands = new MacroCommand();
macroCommands.add(new CloseDoorCommand);
macroCommands.add(new OpenComputerCommand);
macroCommands.add(new OpenQQCommand);

macroCommands.execute();
