/*
 * @lc app=leetcode.cn id=225 lang=javascript
 *
 * [225] 用队列实现栈
 *
 * https://leetcode-cn.com/problems/implement-stack-using-queues/description/
 *
 * algorithms
 * Easy (65.53%)
 * Likes:    231
 * Dislikes: 0
 * Total Accepted:    75.5K
 * Total Submissions: 114.9K
 * Testcase Example:  '["MyStack","push","push","top","pop","empty"]\n[[],[1],[2],[],[],[]]'
 *
 * 使用队列实现栈的下列操作：
 * 
 * 
 * push(x) -- 元素 x 入栈
 * pop() -- 移除栈顶元素
 * top() -- 获取栈顶元素
 * empty() -- 返回栈是否为空
 * 
 * 
 * 注意:
 * 
 * 
 * 你只能使用队列的基本操作-- 也就是 push to back, peek/pop from front, size, 和 is empty
 * 这些操作是合法的。
 * 你所使用的语言也许不支持队列。 你可以使用 list 或者 deque（双端队列）来模拟一个队列 , 只要是标准的队列操作即可。
 * 你可以假设所有操作都是有效的（例如, 对一个空的栈不会调用 pop 或者 top 操作）。
 * 
 * 标签: 栈 队列
 */
/**
    题解：栈和队列的相互实现

    1. [栈实现队列](https://leetcode-cn.com/problems/implement-queue-using-stacks/)

        两个栈实现队列

        - 栈 array.push array.pop
       
    2. [队列实现栈](https://leetcode-cn.com/problems/implement-stack-using-queues/)

        一个队列就可实现一个栈

        - 队列 array.push array.shift
        - 注意 array.shift 复杂度是 0(n)
        - JS 自己实现 LinkedListQueue
 */
// @lc code=start
/**
 * Initialize your data structure here.
 */
var MyStack = function() {
    // only push shift can be use. queue[0]
    this.queue = [];
    this.list = new LinkedList();
};

/**
 * Push element x onto stack. 
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function(x) {
  this.list.addLast(x);
  let i = this.list.length - 1;   // 最新的那个元素，留在原来位置，所以 -1
  while (i > 0) {
    // 原来的元素，一个个取出，压到最新那个元素上面
    this.list.addLast(this.list.removeFirst());
    i--;
  }
};

/**
 * Removes the element on top of the stack and returns that element.
 * @return {number}
 */
MyStack.prototype.pop = function() {
  // return this.queue.shift();
  return this.list.removeFirst();
};

/**
 * Get the top element.
 * @return {number}
 */
MyStack.prototype.top = function() {
  // return this.queue[0];
  return this.list.first();
};

/**
 * Returns whether the stack is empty.
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
  return this.list.tail == undefined;
};

/** 
 * Your MyStack object will be instantiated and called as such:
 * var obj = Object.create(MyStack).createNew()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */


function LinkedList () {
  this.head = null;
  this.tail = this.head;
  this.length = 0;
}

LinkedList.prototype.addLast = function(x) {
  if (this.length === 0) {
    this.head = this.tail = { value:x, next: undefined };
  } else {
    const lastNode = { value:x, next: undefined };
    this.tail.next = lastNode;
    this.tail = lastNode;
  }
  this.length++;
}

LinkedList.prototype.removeFirst = function() {
  const pre = this.head;
  this.head = this.head.next;
  pre.next = undefined;
  this.length--;
  if (this.length === 0) {
    this.tail = undefined;
  }
  return pre.value;
}

LinkedList.prototype.first = function() {
  return this.head.value;
}
// @lc code=end

