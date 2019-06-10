/* 撤销和重做 */

const ryu = {
    attack: function() {
        console.log('攻击');
    },
    defense: function() {
        console.log('防御');
    },
    jump: function() {
        console.log('跳跃');
    },
    crouch: function() {
        console.log('蹲下');
    }
};

const makeCommand = function(receiver,state) {// 创建命令
    return function() {
        receiver[state]();
    }
}

const commands = {
    '119': 'jump',
    '115': 'crouch',
    '97': 'defense',
    '100': 'attack'
}

const commandStack = [];// 保存命令堆栈

document.onkeypress = function(e) {
    const keyCode = e.keyCode;
    const command = makeCommand(ryu,commands[keyCode]);
    if (command) {
        command();
        commandStack.push(command);// 将刚刚执行过的命令保存进堆栈
    }
}

document.getElementById('replay').onclick = function() {
    let command;
    while(command = commandStack.shift()) {// 依次从堆栈里面取出命令执行
        command();
    }
}