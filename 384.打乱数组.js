/*
 * @lc app=leetcode.cn id=384 lang=javascript
 *
 * [384] 打乱数组
 *
 * https://leetcode-cn.com/problems/shuffle-an-array/description/
 *
 * algorithms
 * Medium (54.28%)
 * Likes:    107
 * Dislikes: 0
 * Total Accepted:    28.8K
 * Total Submissions: 53.1K
 * Testcase Example:  '["Solution","shuffle","reset","shuffle"]\n[[[1,2,3]],[],[],[]]'
 *
 * 打乱一个没有重复元素的数组。
 * 
 * 
 * 
 * 示例:
 * 
 * // 以数字集合 1, 2 和 3 初始化数组。
 * int[] nums = {1,2,3};
 * Solution solution = new Solution(nums);
 * 
 * // 打乱数组 [1,2,3] 并返回结果。任何 [1,2,3]的排列返回的概率应该相同。
 * solution.shuffle();
 * 
 * // 重设数组到它的初始状态[1,2,3]。
 * solution.reset();
 * 
 * // 随机返回数组[1,2,3]打乱后的结果。
 * solution.shuffle();
 * 
 * 
 */
/*
   题解

       https://juejin.im/post/5c696ef06fb9a04a0a5fba6e#heading-4
       https://mp.weixin.qq.com/s/0j7iMJwaXYt3BD036M8s-w?


       ```js
       var arr = [1, 2, 3, 44, 555, 6];
       // 解法一: Array.prototype.sort + Math.random
       function randomSort1(arr) {
         return arr.sort(function(){ return Math.random() >= 0.5 ? -1 : 1;}); 
       }
       // 解法二: 洗牌算法
       function randomSort2(arr) {
           let i = arr.length;
           while (i) {
               let j = Math.floor(Math.random() * i--);
               [arr[j], arr[i]] = [arr[i], arr[j]];
           }
           return arr;
       }
       ```
       > 解法一 为什么不够准确，因为1. 浏览器自己实现 2. 排序与随机本身就不同
       > 解法二 为什么 i 要不断自减，不断移动，这是洗牌算法要求的

       下面这篇文章比较好， 有3个算法，还有证明

       https://blog.csdn.net/qq_26399665/article/details/79831490

       https://www.jianshu.com/p/7a5946cfce87

       证明：数 a 落在第 i 个位置的概率为 1/n，按上面的洗牌算法
       P =  (n-1)/n  *  (n-2)/(n-1) * ... * 1/(n-i+1)
            第一次循环     第二次循环           第 n-i+1 次循环
            不在第n个  *  不在第n-1个 *  ... * 在第 i 个                                                    


           (n-1)/n 怎么得来的
           let choice = n; // 表示在 n 个数（选择）里随机选一个
           while (choice > 0) {     // choice > 0 表示可以选择的个数大于 0
               let j = Math.floor(Math.random() * choice);  // 索引是随机的，arr[j] 刚好不等于 数 a ，可能性是 (n-1)/n ， 换一种说法就是 数 a 不在这个 choose-- 这个位置上
               choice--;   // 由于数组是以 0 作为下标，需要往左偏移
               [arr[j], arr[choice]] = [arr[choice], arr[j]];
           }

           1/(n-i+1) 怎么得来的
           let choice = n-i+1; // 从 n ~ i 需要经历 n-i+1 次
           while (choice > 0) {     // choice > 0 表示可以选择的个数大于 0
               let j = Math.floor(Math.random() * choice);  // 索引是随机的，索引刚好命中 数 a ，可能性是 1/(n-i+1)， 换一种说法就是 数 a 在这个 choose-- 这个位置上
               choice--;   // 由于数组是以 0 作为下标，需要往左偏移
               [arr[j], arr[choice]] = [arr[choice], arr[j]];
           }
        参考： https://juejin.im/post/6890513616236363790
*/
// @lc code=start
/**
 * @param {number[]} nums
 */
var Solution = function(nums) {
    this.nums = nums;
};

/**
 * Resets the array to its original configuration and return it.
 * @return {number[]}
 */
Solution.prototype.reset = function() {
    return this.nums;
};

/**
 * Returns a random shuffling of the array.
 * @return {number[]}
 */
Solution.prototype.shuffle = function() {
    const arr = this.nums.slice();
    let choice = arr.length; // 表示在多少个数（选择）里随机选一个
    while (choice > 0) {     // choice > 0 表示可以选择的个数大于 0
        let j = Math.floor(Math.random() * choice);  // 获取随机索引 [0, choice)
        choice--;   // 这里的 choice--，得到了另一个含义，也就是索引或所在位置；由于数组是以 0 作为下标，需要往左偏移，
        [arr[j], arr[choice]] = [arr[choice], arr[j]];  // 交换这两个数，完成了索引为 choice 的 arr[choice] 的随机
    }
    return arr;
};
/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.reset()
 * var param_2 = obj.shuffle()
 */
// @lc code=end

