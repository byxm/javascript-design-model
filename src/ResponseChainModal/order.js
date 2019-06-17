/* 职责链模式订单示例 */

//封装每个对应职责链的规则
const order500 = function(orderType,pay,stock) {
    if (orderType === 1 && pay === true) {
        console.log('500定金预购，得到100元优惠券');
    }else {
        return 'nextSuccessor';// 并不知道下一个节点是谁，把请求往下个节点发送
    }
}

const order200 = function(orderType,pay,stock) {
    if (orderType === 2 && pay === true) {
        console.log('200定金预购，得到50元优惠券');
    }else {
        return 'nextSuccessor';// 并不知道下一个节点是谁，把请求往下个节点发送
    }
}

const orderNormal = function(orderType,pay,stock) {
   if (stock > 0) {
       console.log('普通购买，无优惠券');
   }else {
       console.log('手机库存不足');
   }
}

const Chain = function(fn) {
    this.fn = fn;
    this.successor = null;
}

Chain.prototype.setNextSuccessor = function(successor) {// 指定在链中的下一个节点
    return this.successor = successor;
}

Chain.prototype.passRequest = function() {// 传递请求给某个节点
    const ret = this.fn.apply(this,arguments);
    if (ret === 'nextSuccessor') {
        return this.successor && this.successor.passRequest.apply(this.successor,arguments);
    }
    return ret;
}

//异步职责链，处理用于当遇到异步请求的时候根据请求结果才决定是否在职责链中passRequest
Chain.prototype.next = function() {
    return this.successor && this.successor.passRequest.apply(this.successor,arguments);
}

const chainOrder500 = new Chain(order500);
const chainOrder200 = new Chain(order200);
const chainOrderNormal = new Chain(orderNormal);

chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);

chainOrder500.passRequest(1,true,500);
chainOrder500.passRequest(2,true,500);
chainOrder500.passRequest(3,true,500);
chainOrder500.passRequest(1,false,0);

//一个异步职责链的例子
const fn1 = new Chain(function() {
    console.log(1);
    return 'nextSuccessor';
})

const fn2 = new Chain(function() {
    console.log(2);
    const self = this;
    setTimeout(() => {
        self.next();
    }, 1000);
})

const fn3 = new Chain(function() {
    console.log(3);
})

fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
fn1.passRequest();