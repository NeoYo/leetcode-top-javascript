/*
 * @lc app=leetcode.cn id=647 lang=javascript
 *
 * [647] 回文子串
 *
 * https://leetcode-cn.com/problems/palindromic-substrings/description/
 *
 * algorithms
 * Medium (64.60%)
 * Likes:    403
 * Dislikes: 0
 * Total Accepted:    65.8K
 * Total Submissions: 101.9K
 * Testcase Example:  '"abc"'
 *
 * 给定一个字符串，你的任务是计算这个字符串中有多少个回文子串。
 * 
 * 具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入："abc"
 * 输出：3
 * 解释：三个回文子串: "a", "b", "c"
 * 
 * 
 * 示例 2：
 * 
 * 输入："aaa"
 * 输出：6
 * 解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 输入的字符串长度不会超过 1000 。
 * 
 * 
 */

/**
题解：
    0. 暴力法
        T(n) = O(n^3)
        S(n) = O(1)

        算法：两层 for 循环 * isPalindrome

        // 验证回文串 T(n) = O(n) S(n) = O(1) 比 String.prototype.reverse, 省空间
        var isPalindrome = function(s) {
            for (let i = 0; i < (s.length >> 1); i++) {
                if (s[i] !== s[s.length - 1 - i]) {
                    return false;
                }
            }
            return true;
        };

    1. 中心扩展法
        T(n) = O(n^2)
        S(n) = O(1)

        本质：两层 for 循环变一层，第二层 for 循环 与 isPalindrome 合并
        注意点：
            回文串有两种情况，长度是奇数和偶数
            奇数是 以 i 为中心
            偶数是 以 i 和 i+1 两个的中间为中心
        算法：        
            以 aaa 为例，从特例到通用代码

            a a a
            _ _ _   以每个 _ 位置对应的字母为中心，左右拓展，得到奇数长度的回文串
             . .    以每个 _ 的右边 . 位置（相邻两字母的中间）为中心，左右拓展，得到偶数长度的回文串

            外层 for i {
                以 i 为中心，左右拓展，同时 isPalindrome
                是回文就继续拓展，不是回文就 break
            }

    2. 马拉车算法
        该算法实际上是对中心拓展算法的升级
        思想：
            中心拓展法之所以是 T(n) = O(n^2)，是因为 (2n-1) * n 时间复杂度 （2n-1 是奇数长度和偶数长度情况的和）
            如果能让每一次中心拓展都有意义，都可以用来复用和推导，减少计算
            上一次拓展的边界到哪里，下一次可以直接从那个边界位置出发去拓展，那么时间复杂度，就可以降低为 O(n)

        举例分析：
            变量说明:
                center:   进行哪一位为中心拓展
                expand:   表示当前 center 能拓展的最远距离，只有自己是 1，左右各多一个字母，是 2，以此类推
                distance: 表示装每一位，能拓展的最远距离的容器，这里选用数组，数组也是一种 Map，distance <index, 能拓展的最远距离>
            例子: aaaaa
                index:      0 1 2 3 4 5
                            a a a a a a
                center:     _ 
                distance:   1 
            
                            a a a a a a
                center:       _
                expand:     _____
                distance:   1 2
                            
                            a a a a a a
                center:         _
                expand:     _________
                distance:   1 2 3

                index:      0 1 2 3 4 5
                            a a a a a a
                center:         _
                            _________
                distance:   1 2 3 ?
        
                求索引 3 为中心的拓展距离是理解马拉车算法的关键
                我们已经得到 [0, 2] 最大拓展距离, 而且 distance[2] = 3
                如果把 索引 2 为中心当成一面 “镜子”，镜子里面的物品 distance[0~1] 和镜子外面的物品 distance[2~3]，就是完全相同的
                那么，以 2 为中心，distance[3] = distance[1] = 2，这就是马拉车算法的核心啦
                以 2 为中心的 distance 求出的距离是 3，覆盖范围 [0, 4]
                根据中心对称，知道 [0, 1] 的 distance，也就是知道了 [3, 4] 的 distance，省去了 distance[3~4] 的计算

                这里还有一个问题，distance[3] = distance[1] = 2，就是 索引 3 为中心的拓展距离吗？

                index:      0 1 2 3 4 5
                            a a a a a a
                center:           _
                              _________
                distance:   1 2 3 ? 不等于 2，是等于 3

                从上图可知，distance[3] 是等于 3 的，不等于 2，为什么呢？

                因为 distance[1] 的左边第 2 位，s[1-2] = s[-1] 已经越界了，相当于在镜子里面，已经看不到了
                但是 distance[3] 的右边第 2 位，即 s[5]，由于 s[2] = s[4] = 'a'， s[5] = s[1] = a
                s[6] = null，所以 distance[3] = 3

                那中心对称，镜像原理，还有作用吗？

                实际上在求 distance[3] 的时候，根据中心对称，以索引 2 为中心，distance[1] 在其覆盖范围内（因为 distance[1] + |2-1| <= distance[2]）
                可以得到它 >= distance[1] = 2。可以提前预判，直接跳过了 s[2] = s[4] = 'a' 的判断。从而说明了以前的拓展对现在的有效性

                这里还引出了中心对称会出现的3种情况，下面用具体的物品 a、a` 作解释

                情况一: 已经镜外里完全看到 a 的大小， a` 大小（distance[a`]）是多少？
                    答: 可以直接得到 a` 的大小 distance[a`] = Math.min(distance[a]，镜子里面的最远距离)
                     镜子外面   镜子里面
                      —————     ？
                            |
                            |
                        a   |   a`
                            |
                            |
                    _________
                      已知范围

                情况二: 已知 a 刚刚好在镜子外面全部被看到， a`大小是多少？
                    答: a`的大小 Math.min(?>=distance[a]，镜子里面的最远距离)
                    
                     镜子外面   镜子里面（镜子外面不知道的区域） 
                    —————        ？   - - - - -
                            |
                            |
                      a     |   a`
                            |
                            |
                    _________
                      已知范围
                                      
                情况三: 已知真实 a 的大小，而且在镜子里面已经放不下，a`大小是多少？
                    a`的大小 Math.min(在已知范围内的 a 大小，镜子里面的最远距离)
                    
                    真实 a 的大小是 distance[a] = 3, 已知范围的大小是 distance[center] = 4
                    其中 a 的位置是 6，即 distance[6] = 3；center 的位置是 distance[8] = 4
                    那么已知范围内的 a 大小是 Math.min(8-4, 6-3)

                  —————————       ？     - - - - -
                            |
                            |
                      a     |     a`
                            |
                            |
                    _________ 
                      已知范围


    参考资料：
        1. Leetcode 官方题解 https://leetcode-cn.com/problems/palindromic-substrings/solution/hui-wen-zi-chuan-by-leetcode-solution/
        2. 【面试现场】如何找到字符串中的最长回文子串？ https://mp.weixin.qq.com/s?__biz=MzIzMTE1ODkyNQ==&mid=2649410225&idx=1&sn=ed045e8edc3c49a436a328e5f0f37a55&chksm=f0b60f53c7c18645b4c04a69ad314723cce94ed56994d6f963c2275a2db8d85f973f15f508e4&mpshare=1&scene=23&srcid=1001JCsBlpxgUWjgixasChNQ#rd
    

 */
// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function(s) {
    // const result = [];
    let total = 0;
    for (let i = 0; i < s.length; i++) {
        // 类型一：i 作为中心，得到奇数长度的回文串
        let left = i - 1;
        let right = i + 1;
        // result.push(s[i]);
        total++;
        while (left >= 0 && right < s.length
            && s[left] === s[right]) {
            // result.push(s.slice(left, right+1));
            total++;
            left--;
            right++;
        }
        // 类型二： i 和 i+1 作为中心，得到偶数长度的回文串
        /*
            a a a
            _ _ _   以每个 _ 位置对应的字母为中心，左右拓展，得到奇数长度的回文串
             . .    以每个 _ 的右边 . 位置（相邻两字母的中间，即 i 和 i+1）为中心，左右拓展，得到偶数长度的回文串
         */
        left = i;
        right = i + 1;
        while (left >= 0 && right < s.length
            && s[left] === s[right]) {
            // result.push(s.slice(left, right+1));
            total++;
            left--;
            right++;
        }
    }
    return total;
    // console.log('result: ', result);
};
// @lc code=end

/**
    VSCode Leetcode Plugin
    Write directly
    调试用例：""aaa""
 */

