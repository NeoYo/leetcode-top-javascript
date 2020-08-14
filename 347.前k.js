/*
 * @lc app=leetcode.cn id=347 lang=javascript
 *
 * [347] 前 K 个高频元素
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
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    const map = {}; // <num, cnt> cnt: 出现频率
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        if (map[num]) {
            map[num] = map[num] + 1;
        } else {
            map[num] = 1;
        }
    }
    const objs = Object.keys(map).map(num => ({
        num: Number(num),
        cnt: map[num],
    }));
    const minHeap = new MinHeap(objs, k, (a, b) => { if (!a || !b) {debugger} return (a.cnt < b.cnt);});
    return minHeap.getSortedDesc().map(obj => obj.num);
};
// @lc code=end
// console.assert(topKFrequent([1], 1));
// console.assert(topKFrequent([1,1,1,2,2,3], 2));
// console.assert(topKFrequent([4,1,-1,2,-1,2,3], 2), [-1,2]) // Fix: Add code, this.heap[j + 1] && this.compareFn

