/* 构造一个游戏动作执行的类 */

interface IRyu {
    attack: () => void;
    defense: () => void;
    jump: () => void;
    crouch: () => void;
}

// 执行动作的命令类，它并不需要关心命令是由谁发起的，只需要在接收到这个命令之后去执行
class Ryu implements IRyu {

    attack() {
        console.log('攻击');
    }

    defense() {
        console.log('防御');
    }

    jump() {
        console.log('跳跃');
    }

    crouch() {
        console.log('蹲下');
    }
}

const makeCommands = (receiver:IRyu,state: string): Function => {// 创建命令
    return function() {
        if (receiver[state]) {
            receiver[state]();
        }
    }
}

const activeCommands = {
    '119': 'jump',
    '115': 'crouch',
    '97': 'defense',
    '100': 'attack'
}

const commandStacks = [];// 保存命令的堆栈

document.onkeypress = function(ev) {
    const keyCode = ev.keyCode;
    const command = makeCommands(new Ryu,activeCommands[keyCode]);
    if (command) {
        command(); // 执行命令
        commandStacks.push(command);// 保存执行过的命令堆栈
    }
}

document.getElementById('replay').onclick = function() {
    let command;
    while(command = commandStacks.shift()) {
        command();
    }
}

