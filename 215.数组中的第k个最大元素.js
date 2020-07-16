/*
 * @lc app=leetcode.cn id=215 lang=javascript
 *
 * [215] 数组中的第K个最大元素
 *
 * https://leetcode-cn.com/problems/kth-largest-element-in-an-array/description/
 *
 * algorithms
 * Medium (61.87%)
 * Likes:    437
 * Dislikes: 0
 * Total Accepted:    104.5K
 * Total Submissions: 168.6K
 * Testcase Example:  '[3,2,1,5,6,4]\n2'
 *
 * 在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
 * 
 * 示例 1:
 * 
 * 输入: [3,2,1,5,6,4] 和 k = 2
 * 输出: 5
 * 
 * 
 * 示例 2:
 * 
 * 输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
 * 输出: 4
 * 
 * 说明: 
 * 
 * 你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。
 * 
 */

// @lc code=start
class MinHeap {    
    constructor(objs, k, compareFn) {
        this.heap = [null];
        this.compareFn = compareFn;
        this.size = 0;
        this.k = k;
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
    add(obj) {
        if (!this.compareFn(obj, this.heap[1])) {
            this.heap[1] = obj;
            this.sink(1);
        }
    }
    getSortedDesc() {
        // const sortedAsc = [];
        // for (let i = this.k; i--;) {
        //     sortedAsc.push(this.pop());
        // }
        // return sortedAsc.reverse();
        return this.heap.slice(1, this.size + 1).sort((a, b) => (b.cnt - a.cnt));
    }
    pop() {
        const min = this.heap[1];
        this.heap[1] = this.heap[this.size];
        this.size--;
        this.sink(1);
        return min;
    }
    swim(i) {
        // 最小堆的上浮
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
        // 最小堆的下沉
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
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// var findKthLargest = function(nums, k) {
//     nums.sort((a, b) => (b - a));
//     return nums[k-1];
// };
var findKthLargest = function(nums, k) {
    const minHeap = new MinHeap(
        nums.slice(0, k),
        k,
        (a, b) => { return (a < b); }
    );
    for (let i = k; i < nums.length; i++) {
        minHeap.add(nums[i]);
    }
    return minHeap.pop();
};
// @lc code=end

