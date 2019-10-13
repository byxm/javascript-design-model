// 定义模特类
class Model {
    underwear: string;

    constructor(readonly sex: string) {
        this.sex = sex;
    }

    takePhoto() {
        console.log(`sex=${this.sex} underwear ${this.underwear}`);
    }
}


const man = new Model('man');
const female = new Model('female');

// 给男模特拍照
for(let i = 0; i< 50; i++) {
    man.underwear = 'underwear' + i;
    man.takePhoto();
}

for(let i = 0; i < 50; i++) {
    female.underwear = 'underwear' + i;
    female.takePhoto();
}


