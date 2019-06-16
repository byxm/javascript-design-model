/* 享元模式重构文件上传 */

// 首先需要分离和确定内部状态和外部状态，upload构造函数确定为内部状态，包括uploadtype
const Upload = function(uploadType) {
    this.uploadType = uploadType;
};

Upload.prototype.delFile = function(id) {
    // 给upload设置外部状态的正确的filesize的大小
    uploadManager.setExternalState(id, this);
    if (this.fileSize < 3000) {
        return this.dom.parentNode.removeChild(this.dom);
    }
    if (window.confirm('确定要删除该文件吗？' + this.fileName)) {
        return this.dom.parentNode.removeChild(this.dom);
    }
};

const UploadFactory = (function() {
    const createdFlyWeightObjs = {};
    return {
        create: function(uploadType) {
            if (createdFlyWeightObjs[uploadType]) {
                return createdFlyWeightObjs[uploadType];
            }
            return (createdFlyWeightObjs[uploadType] = new Upload(uploadType));
        },
    };
})();

// 封装管理器的外部状态
const uploadManager = (function() {
    const uploadDataBase = {};
    return {
        add: function(id, uploadType, fileName, fileSize) {
            const flyWeightObject = UploadFactory.create(uploadType);
            const dom = document.createElement('div');
            dom.innerHTML = `
                <span>文件名称：${fileName},文件大小：${fileSize}</span>
                <button class="delFile">删除</button>
            `;
            dom.querySelector('.delFile').onclick = function() {
                flyWeightObject.delFile(id);
            };
            document.body.appendChild(dom);

            uploadDataBase[id] = {
                fileName,
                fileSize,
                dom,
            };
            return flyWeightObject;
        },
        setExternalState: function(id, flyWeightObject) {
            const uploadData = uploadDataBase[id];
            for (let i in uploadData) {
                flyWeightObject[i] = uploadData[i];
            }
        },
    };
})();

let id = 0;

window.startUpload = function(uploadType, files) {
    for (let i = 0, file; (file = files[i++]); ) {
        const uploadObj = uploadManager.add(++id, uploadType, file.fileName, file.fileSize);
    }
};

startUpload('plugin', [
    {
        fileName: '1.txt',
        fileSize: 1000,
    },
    {
        fileName: '2.html',
        fileSize: 2000,
    },
    {
        fileName: '3.txt',
        fileSize: 3000,
    },
]);

startUpload('flash', [
    {
        fileName: '4.txt',
        fileSize: 1000,
    },
    {
        fileName: '2.html',
        fileSize: 3000,
    },
    {
        fileName: '3.txt',
        fileSize: 5000,
    },
]);