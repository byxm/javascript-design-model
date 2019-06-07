/* 模块间的通信 */
const Event = require('./globalObserver');

const a = (function() {
    let count = 0;
    const button = document.getElementById('count');
    button.onclick = function() {
        Event.trigger('add', count++);
    };
})();

const b = (function() {
    const div = document.getElementById('show');
    Event.listen('add', function(count) {
        div.innerHTML = count;
    });
})();
