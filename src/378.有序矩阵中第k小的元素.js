/*
 * @lc app=leetcode.cn id=378 lang=javascript
 *
 * [378] 有序矩阵中第K小的元素
 *
 * https://leetcode-cn.com/problems/kth-smallest-element-in-a-sorted-matrix/description/
 *
 * algorithms
 * Medium (58.72%)
 * Likes:    192
 * Dislikes: 0
 * Total Accepted:    18.6K
 * Total Submissions: 31.5K
 * Testcase Example:  '[[1,5,9],[10,11,13],[12,13,15]]\n8'
 *
 * 给定一个 n x n 矩阵，其中每行和每列元素均按升序排序，找到矩阵中第k小的元素。
 * 请注意，它是排序后的第 k 小元素，而不是第 k 个不同的元素。
 * 
 * 
 * 
 * 示例:
 * 
 * matrix = [
 * ⁠  [ 1,  5,  9],
 * ⁠  [10, 11, 13],
 * ⁠  [12, 13, 15]
 * ],
 * k = 8,
 * 
 * 返回 13。
 * 
 * 
 * 
 * 
 * 提示：
 * 你可以假设 k 的值永远是有效的, 1 ≤ k ≤ n^2 。
 * 
 */

// @lc code=start
class Heap {    
    constructor(objs, k, compareFn) {
        this.heap = [null];
        this.compareFn = compareFn;
        this.size = 0;
        this.k = k;
        if (objs.length === 0) {
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
        const min = this.heap[1];
        this.heap[1] = this.heap[this.size];
        this.size--;
        this.sink(1);
        return min;
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
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (matrix, k) {
    if (matrix.length === 0) return null;
    const maxHeap = new Heap(
        [],
        k,
        (a, b) => (a > b) // a > b 子节点大于父节点, 交换和上浮..., 从而得到最大堆
    );
    let i = 0,
        j = 0;
    // 1. 给建堆做准备
    for (i = 0; i < matrix.length; i++) {
        for (j = 0; j < matrix[i].length; j++) {
            maxHeap.safeAdd(matrix[i][j]);
        }
    }
    return maxHeap.pop();
};
// @lc code=end

// Test case
// kthSmallest([[1,2],[1,3]], 2);

