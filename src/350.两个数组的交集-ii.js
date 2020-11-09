/*
 * @lc app=leetcode.cn id=350 lang=javascript
 *
 * [350] 两个数组的交集 II
 *
 * https://leetcode-cn.com/problems/intersection-of-two-arrays-ii/description/
 *
 * algorithms
 * Easy (52.12%)
 * Likes:    364
 * Dislikes: 0
 * Total Accepted:    128.6K
 * Total Submissions: 246.5K
 * Testcase Example:  '[1,2,2,1]\n[2,2]'
 *
 * 给定两个数组，编写一个函数来计算它们的交集。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：nums1 = [1,2,2,1], nums2 = [2,2]
 * 输出：[2,2]
 * 
 * 
 * 示例 2:
 * 
 * 输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
 * 输出：[4,9]
 * 
 * 
 * 
 * 说明：
 * 
 * 
 * 输出结果中每个元素出现的次数，应与元素在两个数组中出现次数的最小值一致。
 * 我们可以不考虑输出结果的顺序。
 * 
 * 
 * 进阶：
 * 
 * 
 * 如果给定的数组已经排好序呢？你将如何优化你的算法？
 * 如果 nums1 的大小比 nums2 小很多，哪种方法更优？
 * 如果 nums2 的元素存储在磁盘上，磁盘内存是有限的，并且你不能一次加载所有的元素到内存中，你该怎么办？
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
    /*
    误: Set T(n) = O(n); S(n) = O(nums1.length|nums2.length);
    注意点: 
    1. Set 不能得出正确答案，比如 输入：nums1 = [1,2,2,1], nums2 = [2,2]； 输出：[2,2]    
    2. 这里的 T(n) 实际是 n * Set的操作
    */
    /*
    const nums1Set = {};
    for (let i = 0; i < nums1.length; i++) {
        nums1Set[nums1[i]] = true;
    }
    const res = [];
    for (let i = 0; i < nums2.length; i++) {        
        if (nums1Set[nums2[i]] === true) {
            res.push(nums2[i]);
        }
    }
    return res;
    */
    /*
    本质：这道题跟 多数元素 https://github.com/NeoYo/leetcode-top-javascript/blob/master/169.%E5%A4%9A%E6%95%B0%E5%85%83%E7%B4%A0.js 有些类似，都是查找相同元素的问题
    零：暴力法 T(n) = O(nm) n 表示 num1.length; m 表示 nums2.length
        思路: 遍历 num1 的每个值，在 nums2 如果找到对应的，收集起来，同时把 nums2 对应的删掉，避免重复收集
    一：Map 空间换时间 T(n) = O(n*(Map)) S(n) = O(n)
        思路: 
        1. nums1 => nums1Map
        2. 遍历 nums2，如果找到对应的，收集起来，同时把 nums1Map 对应的删掉，避免重复收集
    二：排序法+二分查找 T(n) = O(nlogn)
        思路:
        1. 对 nums1 进行排序 T(n) = O(nlogn)，假设是快排
        2. 遍历 nums2，在已排序的 nums1 进行二分查找 T(n) = O(nlogn)
        3. 如果找到对应的，收集起来，同时把 nums1 对应的删掉，避免重复收集
        PS: 也可以对两个num都进行排序
    */

    // 使用解一
    const map = {};
    for (let i = 0; i < nums1.length; i++) {
        if (map[nums1[i]] == null) {
            map[nums1[i]] = 1;
        } else {
            map[nums1[i]] += 1;
        }
    }
    const res = [];
    for (let i = 0; i < nums2.length; i++) {
        if (map[nums2[i]] == null || map[nums2[i]] == 0) {
            continue;
        } else {
            res.push(nums2[i]);
            map[nums2[i]] -= 1;
        }
    }
    return res;
};
// @lc code=end

