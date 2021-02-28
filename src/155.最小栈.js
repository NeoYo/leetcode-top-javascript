/*
 * @lc app=leetcode.cn id=155 lang=javascript
 *
 * [155] 最小栈
 *
 * https://leetcode-cn.com/problems/min-stack/description/
 *
 * algorithms
 * Easy (54.68%)
 * Likes:    574
 * Dislikes: 0
 * Total Accepted:    132.8K
 * Total Submissions: 243K
 * Testcase Example:  '["MinStack","push","push","push","getMin","pop","top","getMin"]\n' +
  '[[],[-2],[0],[-3],[],[],[],[]]'
 *
 * 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
 * 
 * 
 * push(x) —— 将元素 x 推入栈中。
 * pop() —— 删除栈顶的元素。
 * top() —— 获取栈顶元素。
 * getMin() —— 检索栈中的最小元素。
 * 
 * 
 * 
 * 
 * 示例:
 * 
 * 输入：
 * ["MinStack","push","push","push","getMin","pop","top","getMin"]
 * [[],[-2],[0],[-3],[],[],[],[]]
 * 
 * 输出：
 * [null,null,null,null,-3,null,0,-2]
 * 
 * 解释：
 * MinStack minStack = new MinStack();
 * minStack.push(-2);
 * minStack.push(0);
 * minStack.push(-3);
 * minStack.getMin();   --> 返回 -3.
 * minStack.pop();
 * minStack.top();      --> 返回 0.
 * minStack.getMin();   --> 返回 -2.
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * pop、top 和 getMin 操作总是在 非空栈 上调用。
 * 
 * 
 */
/**
    
    - 标签 

        ==栈==

    - 资料
        1. [最小栈和最小队列 - 奇舞周刊](https://www.jishuwen.com/d/2n3p)
        2. [最小栈实现](https://jsbin.com/kagekof/1/edit?html,css,js,output) 和 [最小队列实现](https://jsbin.com/pevoquw/1/edit?html,css,js,output)
        3. [漫画算法 - 最小栈的实现](https://zhuanlan.zhihu.com/p/31958400)

    - 总结
        1. 辅助栈 或 辅助队列，都用于历史记录，记录“破记录的最小值”
        2. 出栈和出队列时，要同时维护辅助栈
        3. 最小队列，入队时，可能会更新整个辅助队列 （注意）
 */
// @lc code=start
/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.stack = [];
    this.minIdxs = []; // small ... smaller ... smallest
                       // minIdxs 只是索引
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.stack.push(x);
    // 如果需要，再把添加索引，添加进 minIdxs
    if (x <= this.getCompareMin()) {    // 注意：这里是 <=
        this.minIdxs.push(this.stack.length - 1);
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    if (this.top() === this.getCompareMin()) {
        this.minIdxs.pop();
    }
    this.stack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1];
};

/**
 * @return {boolean}
 */
MinStack.prototype.getCompareMin = function() {
    return this.getMin() == null ? +Infinity : this.getMin();
};


/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    const minIdx = this.minIdxs[this.minIdxs.length - 1];
    return this.stack[minIdx];
};

/* *
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

/* 
    解题思路：
    0. 暴力法 T(n) = O(n)
    1. 记录器 T(n) = O(1) 空间换时间

    注意点： 等于最小值也要入栈
*/
// @lc code=end

