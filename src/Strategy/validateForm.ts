/* 表单校验 */

interface IformStrategies {
    isNonEmpty: (value: any,errorMsg: string) => string;
    minLength: (value: string, length: number, errorMsg: string) => string;
    isMobile: (value: string, errorMsg: string) => string;
}

const strategies: IformStrategies = {
    isNonEmpty: (value,errorMsg) => {
        if (value === '') {
            return errorMsg;
        }
    },
    minLength: (value,length,errorMsg) => {
        if (value.length > length) {
            return errorMsg;
        }
    },
    isMobile: (value,errorMsg) => {
        if (!/^1[3|4|5|7|8|9][0-9]{9}$/.test(value)) {
            return errorMsg;
        }
    }
}

// 实现Validator类
class Validator {
    cache: Array<Function> = [];// 保存校验规则

    add(dom: any,rule: string,errorMsg: string): void {
        const ary = rule.split(':');// 将规则名称和校验所填的参数分割开来
        this.cache.push(function() {// 将一系列的规则校验放到cache里面
            console.log('biaodan',dom);
            const strategy = ary.shift();// 取出strategy
            ary.unshift(dom.value);// 获取表单元素的值
            ary.push(errorMsg);// 放入错误提示信息到最后
            return strategies[strategy].apply(dom,ary);
        })
    }
    start():string | undefined {
        for(let i = 0,validatorFunc;validatorFunc = this.cache[i++];) {
            const msg = validatorFunc();
            if (msg) {// 如果有确切的返回值，则返回错误提示
                return msg;
            }
        }
    }
}

//校验表单
const registerForm: any = document.getElementById('registerForm');
const validateFunc = () => {
    const validator = new Validator();
    validator.add(registerForm.username,'isNonEmpty','用户名不能为空');
    validator.add(registerForm.password,'minLength:6','密码长度不能少于6位');
    validator.add(registerForm.phoneNumber,'isMobile','手机号码格式不正确');
    const err = validator.start();
    return err;
}
registerForm.onsubmit = function(e) {
    e.preventDefault();
    const errorMsg = validateFunc();
    console.log(errorMsg)
    if (errorMsg) {
        alert(errorMsg);
        return false;// 校验不通过阻止表单提交
    }
}