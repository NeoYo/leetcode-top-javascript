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

        ！！！核心原理：一边扩散一边校验，时间复杂度少在这里
        ！！！代码参考 647.回文子串，下面的不好理解

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
        // result.push(s[i]);                           // 用于调试
        total++;                                        // 一个字符也可以作为回文串
        while (left >= 0 && right < s.length            // 判断边界
            && s[left] === s[right]) {                  // 相等
            // result.push(s.slice(left, right+1));     // 用于调试
            total++;                                    // 又多一个回文串
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
                那么，以 索引 2 为中心，distance[3] = distance[1] = 2，这就是马拉车算法的核心啦
                以索引 2 为中心的 distance 求出的距离是 3，覆盖范围 [0, 4]
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

        更多细节：
            aaa 只是对长度是奇数的回文串作处理，再加上偶数长度的回文串处理，aaa 转换为 a#a#a

    参考资料：
        1. 【面试现场】如何找到字符串中的最长回文子串？ https://mp.weixin.qq.com/s?__biz=MzIzMTE1ODkyNQ==&mid=2649410225&idx=1&sn=ed045e8edc3c49a436a328e5f0f37a55&chksm=f0b60f53c7c18645b4c04a69ad314723cce94ed56994d6f963c2275a2db8d85f973f15f508e4&mpshare=1&scene=23&srcid=1001JCsBlpxgUWjgixasChNQ#rd
             ！！！这一篇最好理解
                关键知识点：
                    第一点. cabadabae 中 移动到第5位 d 时，扩散范围 abadaba 的半径有 4
                        distance: 表示装每一位，能拓展的最远距离的容器，这里选用数组，数组也是一种 Map，distance <index, 能拓展的最远距离/半径>
                        distance[5] = 4
                          0 1 2 3 4 5 6 7 8 9
                        这时 c a b a d a b a e
                                    |   | |
                                    |   | |
                distance    1 1 2 1 4
                              - - - - - - -
                根据中心对称可推出       1       （因为 1 < 扩散半径）
                                       >=2   (因为 2 已经到了第8位，复用2，基于2再扩散1位可知等于 2)
                                         >=1 (因为 1 已经到了第8位，复用1，基于1再扩散1位可知等于 1)
                                

                    第二点. 摘抄小史的代码实现思路
                        小史：
                            1、先对字符串进行预处理，两个字符之间加上特殊符号#
                            2、然后遍历整个字符串，用一个数组来记录以该字符为中心的回文长度，为了方便计算右边界，我在数组中记录长度的一半（向下取整）
                            3、每一次遍历的时候，如果该字符在已知回文串最右边界的覆盖下，那么就计算其相对最右边界回文串中心对称的位置，得出已知回文串的长度
                            4、判断该长度和右边界，如果达到了右边界，那么需要进行中心扩展探索。当然，如果第3步该字符没有在最右边界的“羽翼”下，则直接进行中心扩展探索。进行中心扩展探索的时候，同时又更新右边界
                            5、最后得到最长回文之后，去掉其中的特殊符号即可

                    第三点. 时间复杂度为什么是 1
                            因为循环过程中，不是在挪位，就是在拓展右边界，拓展的每一次都有意义

        2. [Manacher 只会求最长回文子串？太浪费了！](https://leetcode-cn.com/problems/palindromic-substrings/solution/manacher-zhi-hui-qiu-zui-chang-hui-wen-zi-chuan-ta/)
              ！！！感觉比较好理解了~ 下次继续看
 */
/**
    官方题解，有 JavaScript 代码，但是还没理解
    作者：LeetCode-Solution
    链接：https://leetcode-cn.com/problems/palindromic-substrings/solution/hui-wen-zi-chuan-by-leetcode-solution/
    来源：力扣（LeetCode）
 */
var countSubstrings = function(s) {
    let n = s.length;
    let t = ['$', '#'];
    for (let i = 0; i < n; ++i) {
        t.push(s.charAt(i));
        t.push('#');
    }
    n = t.length;
    t.push('!');
    t = t.join('');

    const f = new Array(n);
    let iMax = 0, rMax = 0, ans = 0;
    for (let i = 1; i < n; ++i) {
        // 初始化 f[i]
        f[i] = i <= rMax ? Math.min(rMax - i + 1, f[2 * iMax - i]) : 1;
        // 中心拓展
        while (t.charAt(i + f[i]) == t.charAt(i - f[i])) {
            ++f[i];
        }
        // 动态维护 iMax 和 rMax
        if (i + f[i] - 1 > rMax) {
            iMax = i;
            rMax = i + f[i] - 1;
        }
        // 统计答案, 当前贡献为 (f[i] - 1) / 2 上取整
        ans += Math.floor(f[i] / 2);
    }
    return ans;
};
/**
    VSCode Leetcode Plugin
    Write directly
    调试用例：""aaa""
 */

