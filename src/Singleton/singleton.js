const CreateDiv = function(html) {
    this.html = html;
    this.init();
};

CreateDiv.prototype.init = function() {
    const div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
};

const proxySingleCreateDiv = (function() {
    let instance;
    return function(html) {
        if (!instance) {
            // 只能创建一次，每个类对应的单例都是唯一的
            instance = new CreateDiv(html);
        }
        return instance;
    };
})();

const d = proxySingleCreateDiv('单例二444');
const a = proxySingleCreateDiv('单例一111');
const b = proxySingleCreateDiv('单例二222');
const c = proxySingleCreateDiv('单例二333');
