/* 控制点灯程序，根据不同的按钮显示不同的电灯类型 */

const OffLightState = function(light) {
    this.light = light;
}

OffLightState.prototype.buttonWasPressed = function() {
    console.log('弱光');// 对应的光亮的行为
    this.light.setState(this.light.weakLightState);// 切换状态到weakLightState
}

const WeakLightState = function(light) {
    this.light = light;
}

WeakLightState.prototype.buttonWasPressed = function() {
    console.log('强光');// 按下弱光对应的行为
    this.light.setState(this.light.strongLightState);// 切换状态到strongLightState
}

const StrongLightState = function(light) {
    this.light = light;
}

StrongLightState.prototype.buttonWasPressed = function() {
    console.log('超强光');// strongLightState对应的行为
    this.light.setState(this.light.superStrongLightState);/// 切换到对应的关灯状态
}

const SuperStrongLightState = function(light) {
    this.light = light;
}

SuperStrongLightState.prototype.buttonWasPressed = function() {
    console.log('关灯');
    this.light.setState(this.light.offLightState);
}

const Light = function() {// 现在为每个状态类创建状态对象
    this.offLightState = new OffLightState(this);
    this.weakLightState = new WeakLightState(this);
    this.strongLightState = new StrongLightState(this);
    this.superStrongLightState = new SuperStrongLightState(this);
    this.button = null;
}

Light.prototype.init = function() {
    const button = document.createElement('button');
    const self = this;
    this.button = document.body.appendChild(button);
    this.button.innerHTML = '开关';
    this.currState = this.offLightState;// 设置当前状态
    this.button.onclick = function() {
        self.currState.buttonWasPressed();
    }
}

Light.prototype.setState = function(newState) {
    this.currState = newState;
}

const light = new Light();
light.init();

