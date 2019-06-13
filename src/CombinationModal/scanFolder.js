/** 扫描文件夹的组合模式例子*/

// 定义文件夹和文件这两个类

// 文件夹
const Folder = function(name) {
    this.name = name;
    this.parents = null;// 增加父对象属性
    this.files = [];
};

Folder.prototype.add = function(file) {
    file.parents = this; //设置父对象
    this.files.push(file);
}

Folder.prototype.remove = function() {
    if (!this.parents) {// 根节点或者树外游离节点
        return ;
    }
    for(let files = this.parents.files,l = files.length - 1;l >= 0;l--) {
        const file = files[l];
        if (file === this) {
            files.splice(l,1);
        }
    }
}

Folder.prototype.scan = function() {
    console.log('开始扫描文件夹：' + this.name);
    for(let i =0,file,files = this.files;file = files[i++];) {
        file.scan();
    }
}

// 文件
const File = function(name) {
    this.name = name;
    this.parents = null;
}

File.prototype.add = function() {
    throw new Error('文件下面不能再添加文件');
}

File.prototype.scan = function() {
    console.log('开始扫描文件：' + this.name);
}

File.prototype.remove = function() {
    if (!this.parents) {
        return;
    }
    for(let files = this.parents.files,l = files.length - 1;l >=0;l--) {
        const file = files[l];
        if (file === this) {
            files.splice(l,1);
        }
    }
}

const folder = new Folder('学习资料');
const folder1 = new Folder('javascript');
const folder2 = new Folder('jquery');

const file1 = new File('javasciprt设计模式');
const file2 = new File('精通jquery');
const file3 = new File('重构与模式');

folder1.add(file1);
folder2.add(file2);

folder1.add(new File('Javascript设计模式开发与实践'));

folder.add(folder1);
folder.add(folder2);
folder.add(file3);

folder1.remove();

folder.scan();// 开始扫描