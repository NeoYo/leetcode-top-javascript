/**
 * 标签: 栈 队列
 */

var CQueue = function() {
    this.inStack = [];
    this.outStack = [];
};

/** 
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function(value) {
    this.inStack.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function() {
    if (this.outStack.length === 0) {      
        while (this.inStack.length !== 0) {
            this.outStack.push(this.inStack.pop());
        }
    }
    return this.outStack.pop() || -1; // 根据题意 （若队列中没有元素，deleteHead 操作返回 -1）
};
