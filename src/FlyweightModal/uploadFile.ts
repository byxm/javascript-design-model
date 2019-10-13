/* 文件上传 */

// 内部状态类，存放所有对象的内部状态
class Upload {
    constructor(readonly uploadType: string) {
        this.uploadType = uploadType;
    }
}

// 工程进行对象实例化
class UploadFactory {
    createdFlyWeightObjs = {};

    create(uploadType: string) {
        if (this.createdFlyWeightObjs[uploadType]) {
            // 如果要创建的对象已经生成过，就返回之前创建过的类型，否则返回为创建的类型
            return this.createdFlyWeightObjs[uploadType];
        }
        return (this.createdFlyWeightObjs[uploadType] = new Upload(uploadType));
    }
}

const uploadFactory = new UploadFactory();

// 上传对象管理，放置对象外部状态
class UploadManager {
    uploadDatabase = {};// 存放外部属性状态的值，根据id不同去创建

    add(id, uploadType, fileName, fileSize) {
        const flyWeightObj = uploadFactory.create(uploadType);
        const dom: any = document.createElement('div');
        dom.innerHTML = `
            <span>文件名称：${fileName},文件大小：${fileSize}</span>
            <button class="delFile">删除</button>
        `;
        dom.querySelector('.delFile').onclick = () => {
            flyWeightObj.delFile(id);
        }
        document.body.appendChild(dom);
        this.uploadDatabase[id] = {
            fileName,
            fileSize,
            dom
        }
        return flyWeightObj;
    }

    setExternalState(id, flyWeightObj) {
        const uploadData = this.uploadDatabase[id];
        Object.keys(uploadData).forEach(item => {
            flyWeightObj[item] = uploadData[item]
        })
    }

}

