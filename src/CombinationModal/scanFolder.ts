/* 定义文件夹和文件类 */

interface IFolder {
    name: string;
    files: Array<any>;
}

class Folders implements IFolder {
    name;
    files = [];
    constructor(name) {
        this.name = name;
        this.files = [];
    }

    add(file) {
        this.files.push(file);
    }

    scan() {
        console.log(`开始扫描文件夹` + this.name);
        for(let i = 0,file;file = this.files[i++];) {
            file.scan();
        }
    }
}


class Files{
    name;
    parent;
    constructor(name) {
        this.name = name;
        this.parent = null;
    }
    add() {
        throw new Error('文件下面不能添加文件夾');
    }
    scan() {
        console.log(`开始扫描文件${this.name}`);
    }

    remove() {
        if (!this.parent) {// 如果是根节点或者是树外的游离节点
            return;
        }
        for(let files = this.parent.files,l = files.length - 1;l >= 0;l--) {
            const file = files[l];
            if (file === this) {
                files.splice(1,1);
            }
        }
    }
}

// 接下来将文件和文件夹组合成树
const folders = new Folders('学习资料');
const folder1s = new Folders('Javascript');
const folder2s = new Folders('jQuery');

const file1s = new Files('javascript设计模式开发与实践');
const file2s = new Files('精通jquery');
const file3s = new Files('重构与模式');

folder1s.add(file1s);
folder2s.add(file2s);

folders.add(folder1s);
folders.add(folder2s);
folders.add(file3s);

// 接下来把移动硬盘里面的文件和文件夹都复制到这棵树中
const folder3s = new Folders('Nodejs');
const file4s = new Files('深入浅出nodejs');
folder3s.add(file4s);

const file5s = new Files('javascript语言精髓与编程实践');

folders.add(folder3s);
folders.add(file5s);

folders.scan();
