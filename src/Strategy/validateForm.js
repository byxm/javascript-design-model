// 策略模式封装表单校验逻辑
const strategies = {
    isNonEmpty: function(value,errorMsg) {// 不能为空
        if (value === '') {
            return errorMsg;
        }
    },
    minLength: function(value,length,errorMsg) {
        if (value.length < length) {
            return errorMsg
        }
    },
    isMobile: function(value,errorMsg) {
        if (!/^1[3|5|8|9][0-9]{9}$/.test(value)) {
            return errorMsg
        }
    }
}

function Validator() {// 定义校验类
    this.cache = [];// 保存校验规则
}

Validator.prototype.add = function(dom,rule,errorMsg) {
    const ary = rule.split(':')
    this.cache.push(function() {
        const strategy = ary.shift();
        ary.unshift(dom.value);
        ary.push(errorMsg)
        return strategies[strategy].apply(dom,ary)
    })
}

Validator.prototype.start = function() {
    for(let i = 0,validator;validator = this.cache[i++];){
        const msg = validator();
        if (msg) {
            return msg
        }
    }
}

const registorForm = document.getElementById('registerForm');

const validataFunc = function() {
    const validator = new Validator();
    validator.add(registorForm.username,'isNonEmpty','用户名不能为空');
    validator.add(registorForm.password,'minLength:6','密码长度不能超过6位')
    validator.add(registorForm.phoneNumber,'isMobile','请输入正确的手机号码')

    const errorMsg = validator.start();
    return errorMsg;
}

registorForm.onsubmit = function(e) {
    e.preventDefault();
    const errorMsg = validataFunc();
    if (errorMsg) {
        alert(errorMsg)
        return false
    }
}
