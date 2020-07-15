/*
 * @lc app=leetcode.cn id=295 lang=javascript
 *
 * [295] 数据流的中位数
 *
 * https://leetcode-cn.com/problems/find-median-from-data-stream/description/
 *
 * algorithms
 * Hard (44.52%)
 * Likes:    165
 * Dislikes: 0
 * Total Accepted:    14.3K
 * Total Submissions: 31.9K
 * Testcase Example:  '["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"]\n' +
  '[[],[1],[2],[],[3],[]]'
 *
 * 中位数是有序列表中间的数。如果列表长度是偶数，中位数则是中间两个数的平均值。
 * 
 * 例如，
 * 
 * [2,3,4] 的中位数是 3
 * 
 * [2,3] 的中位数是 (2 + 3) / 2 = 2.5
 * 
 * 设计一个支持以下两种操作的数据结构：
 * 
 * 
 * void addNum(int num) - 从数据流中添加一个整数到数据结构中。
 * double findMedian() - 返回目前所有元素的中位数。
 * 
 * 
 * 示例：
 * 
 * addNum(1)
 * addNum(2)
 * findMedian() -> 1.5
 * addNum(3) 
 * findMedian() -> 2
 * 
 * 进阶:
 * 
 * 
 * 如果数据流中所有整数都在 0 到 100 范围内，你将如何优化你的算法？
 * 如果数据流中 99% 的整数都在 0 到 100 范围内，你将如何优化你的算法？
 * 
 * 
 */
// 解一：快速排序
// /**
//  * initialize your data structure here.
//  */
// var MedianFinder = function() {
//     this.array = [];
// };

// /**
//  * @param {number} num
//  * @return {void}
//  */
// MedianFinder.prototype.addNum = function(num) {
//     this.array.push(num);
// };

// /**
//  * @return {number}
//  */
// MedianFinder.prototype.findMedian = function() {
//     const L = this.array.length;
//     if (L === 0) {
//         return;
//     }
//     this.array.sort();
//     const isOdd = L % 2 === 1; // 奇数
//     const halfL = L >> 1;
//     if (isOdd) {
//         return this.array[halfL];
//     } else {
//         return (this.array[halfL] + this.array[(halfL) -1]) / 2;
//     }
// };

// @lc code=start
// 解二：两个堆
class Heap {
    /**
     * @param {*} compareFn (a, b) => (a > b) 大顶堆; (a, b) => (a < b) 小顶堆;
     */
    constructor(objs, k, compareFn) {
        this.heap = [null];
        this.compareFn = compareFn;
        this.size = 0; // 记录 heap 中，非 null 的数量
        this.k = k;
        if (objs == null || objs.length === 0) {
            return;
        }
        this.buildHeap(objs.slice(0, k));
        for (let i = k; i < objs.length; i++) {
            this.add(objs[i]);
        }
    }
    buildHeap(kObjs) {
        for (let i = 0; i < kObjs.length; i++) {
            this.heap.push(kObjs[i]);
            this.size++;
            this.swim(i + 1);
        }
    }
    // 安全地添加元素，用于不确定堆是否建成
    safeAdd(obj) {
        if (this.size < this.k) {
            // heap is not full
            // 建堆的过程
            this.heap.push(obj);
            this.size++;
            this.swim(this.size); // 首位是null, size 刚好是最后一位
        }
        // heap is full
        else {
            this.add(obj);
        }
    }
    add(obj) {
        if (!this.compareFn(obj, this.heap[1])) {
            this.heap[1] = obj;
            this.sink(1);
        }
    }
    pop() {
        if (this.size === 0) {
            return;
        }
        const min = this.heap[1];
        this.heap[1] = this.heap[this.size];
        this.heap.pop();
        this.size--;
        this.sink(1);
        return min;
    }
    peek() {
        return this.heap[1];
    }
    swim(i) {
        // 堆的上浮，用于 建堆
        while (i > 1) {
            let parent = i >> 1;
            if (this.compareFn(this.heap[i], this.heap[parent])) {
                let temp = this.heap[i];
                this.heap[i] = this.heap[parent];
                this.heap[parent] = temp;
                i = parent;
            } else {
                break;
            }
        }
    }
    sink(i) {
        // 堆的下沉，用于 建堆后添加元素 或 删除顶点
        while (2 * i <= this.size) {
            let j = 2 * i; // 左子节点
            if (this.heap[j + 1] && this.compareFn(this.heap[j + 1], this.heap[j])) j++; // 右子节点更小
            if (this.compareFn(this.heap[j], this.heap[i])) {
                let temp = this.heap[i];
                this.heap[i] = this.heap[j];
                this.heap[j] = temp;
                i = j;
            } else {
                break;
            }
        }
    }
}

/**
 * initialize your data structure here.
 */
var MedianFinder = function() {
    this.maxHeap = new Heap(null, +Infinity, (a, b) => (a > b));
    this.minHeap = new Heap(null, +Infinity, (a, b) => (a < b));
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
    // 两个堆划分出三段区间，A: 左堆，B: 两堆中间 C: 右堆
    if (num < this.minHeap.peek() || this.minHeap.size === 0) {
        this.maxHeap.safeAdd(num);
    } else {
        this.minHeap.safeAdd(num);
    }
    // 保持平衡
    const diff = this.maxHeap.size - this.minHeap.size;
    if (diff === 1 || diff === 0) return;    
    if (diff === 2) {
        this.minHeap.safeAdd(this.maxHeap.pop());
    } else if (diff === -1) {
        this.maxHeap.safeAdd(this.minHeap.pop());
    } else {
        console.error('非预期的diff');
    }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
    const diff = this.maxHeap.size - this.minHeap.size;
    // console.log('maxHeap: ', this.maxHeap.heap);
    // console.log('minHeap: ', this.minHeap.heap);
    if (diff === 1) {
        return this.maxHeap.peek();
    } else if (diff === 0) {
        return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
    } else {
        console.error('非预期的diff');
    }
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
// @lc code=end

