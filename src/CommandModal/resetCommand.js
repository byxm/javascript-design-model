const Animate = require('../Strategy/transAnimation');

const ball = document.getElementById('ball');
const pos = document.getElementById('pos');
const moveBtn = document.getElementById('moveBtn');
const cancelBtn = document.getElementById('cancelBtn');

const moveCommand = function(receiver,pos) {
    this.receiver = receiver;
    this.pos = pos;
    this.oldPos = null;
}

moveCommand.prototype.execute = function() {
    this.receiver.start('left',this.pos,1000,'strongEaseOut');
    this.oldPos = this.receiver.dom.getBoundingClientRect()[this.receiver.propertyName];
    //记录小球开始移动前的位置
}

moveCommand.prototype.undo = function() {
    this.receiver.start('left',this.oldPos,5000,'strongEaseOut');
    //回到小球移动前记录的位置
}

let excuteMove;
moveBtn.onclick = function() {
    const animate = new Animate(ball);
    excuteMove = new moveCommand(animate,pos.value);
    excuteMove.execute();
}

cancelBtn.onclick = function() {
    excuteMove.undo();
}

