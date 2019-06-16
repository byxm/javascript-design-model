/* 地图创建位置图标的例子 */

// 创建tooltip的工厂
const toolTipFactory = (function(){
    const toolTipPool = [];
    return {
        create: function(){
            if (toolTipPool.length === 0) {// 如果对象池为空
                const div = document.createElement('div');
                document.body.appendChild(div);
                return div;
            }else {// 如果对象池不为空
                return toolTipPool.shift();// 从对象池中提取一个dom
            }
        },
        recover: function(tooltipDom) {
            return toolTipPool.push(tooltipDom);// 对象池回收dom
        }
    }
})()


// 例子：模拟地图打点回收的效果
let ary = [];
for(let i = 0,str;str = ['A','B'][i++];) {
    const toolTip = toolTipFactory.create();
    toolTip.innerHTML = str;
    ary.push(toolTip);
}

//接下来重绘地图，将之前的这两个节点回收进对象池
for(let i = 0,toolTip;toolTip = ary[i++];) {
    toolTipFactory.recover(toolTip);
}

//现在重新绘制六个点，之前放入的两个点可以直接先使用
for(let i = 0,str;str = ['A','B','C','D','E','F'][i++];) {
    const toolTip = toolTipFactory.create();
    toolTip.innerHTML = str;
}