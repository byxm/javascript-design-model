/* 分离表单值校验与提交两个逻辑通过修饰器去添加提交逻辑的方法 */

const form = document.getElementById('form');
const formValue = form.elements;
const submitBtn = document.getElementById('submitBtn');
const serilizeForm = {};
function validateForm() {
    for(let i = 0,formItem;formItem = form[i++];) {
        serilizeForm[formItem.name] = formItem.value;
    }
    console.log('校验值',serilizeForm);
    if (serilizeForm.decUsername === '') {
        alert('用户名不能为空');
        return false;
    }
    if (serilizeForm.decPassword === '') {
        alert('密码不能为空');
        return false;
    }
}

Function.prototype.validate = function(validateFn) {
    const _self = this;
    return function() {
        if (validateFn.apply(this,arguments) === false) {
            //校验不通过的情况直接返回不再执行
            return;
        }
        return _self.apply(this,arguments);
    }
}

let formSubmit = function() {
    const param = {
        ...serilizeForm
    }
    console.log('正在发送ajax请求,参数',param);
}
//修饰类校验提交信息是否准确
formSubmit = formSubmit.validate(validateForm);

submitBtn.onclick = function() {
    formSubmit();
}