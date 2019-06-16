/* 享元模式的简单例子，不用构建多个对象，只需提取出公有的属性来使用就好 */

const Modal = function(sex) {
    this.sex = sex;
}

Modal.prototype.takePhoto = function(){
    console.log(`sex=${this.sex} underwear ${this.underwear}`);// 在这里单独分离外部状态underwear
}

const maleModel = new Modal('male');// 创建男模特
const femaleModel = new Modal('female');// 创建女模特

for(let i = 0;i < 50;i++) {// 给50个男模特依次穿上衣服
    maleModel.underwear = `underwear${i}`
    maleModel.takePhoto();
}

for(let i = 0;i < 50;i++) {// 给50个男模特依次穿上衣服
    femaleModel.underwear = `underwear${i}`
    femaleModel.takePhoto();
}