/*
 * @lc app=leetcode.cn id=146 lang=javascript
 *
 * [146] LRU缓存机制
 *
 * https://leetcode-cn.com/problems/lru-cache/description/
 *
 * algorithms
 * Medium (50.39%)
 * Likes:    831
 * Dislikes: 0
 * Total Accepted:    93K
 * Total Submissions: 184K
 * Testcase Example:  '["LRUCache","put","put","get","put","get","put","get","get","get"]\n' +
  '[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]'
 *
 * 运用你所掌握的数据结构，设计和实现一个  LRU (最近最少使用) 缓存机制。它应该支持以下操作： 获取数据 get 和 写入数据 put 。
 * 
 * 获取数据 get(key) - 如果关键字 (key) 存在于缓存中，则获取关键字的值（总是正数），否则返回 -1。
 * 写入数据 put(key, value) -
 * 如果关键字已经存在，则变更其数据值；如果关键字不存在，则插入该组「关键字/值」。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。
 * 
 * 
 * 
 * 进阶:
 * 
 * 你是否可以在 O(1) 时间复杂度内完成这两种操作？
 * 
 * 
 * 
 * 示例:
 * LRUCache cache = new LRUCache(2);
 * // 2 缓存容量
 * 
 * cache.put(1, 1);
 * cache.put(2, 2);
 * cache.get(1);       // 返回  1
 * cache.put(3, 3);    // 该操作会使得关键字 2 作废
 * cache.get(2);       // 返回 -1 (未找到)
 * cache.put(4, 4);    // 该操作会使得关键字 1 作废
 * cache.get(1);       // 返回 -1 (未找到)
 * cache.get(3);       // 返回  3
 * cache.get(4);       // 返回  4
 */
/*
参考资料
    https://leetcode-cn.com/problems/lru-cache/solution/bu-yong-yu-yan-nei-jian-de-map-gua-dang-feng-zhuan/

零、笔记
    LRU Least Recently Used   最近最少使用
        解释
            容量不够时选择最近最少使用的数据进行删除
            这里的最少使用，是最久未使用的意思
            相当于选择最近最久未使用的数据进行删除

一、LRUCache.prototype.get => 哈希容器
    题目要求 LRUCache.prototype.get 时间复杂度是 O(1)， 那么哈希容器就是这样的数据结构
    由于考虑到移动端的兼容性，低端机型需要对 ES6 Map 做 polyfill 处理，会影响到 js 体积大小，从而影响到 js 加载速度    
    这里直接使用对象 模拟 ES6 Map，有没有更好的数据结构呢？
    我们看下这里 LRUCache.prototype.put 的 @param {number} key 是 number，这里我们可以直接使用数组作为 hash 容器
    但是数组不确定 V8 内核，是不是连续空间，是的话，内存碎片会比较多。
    （戏怎么这么多hhh~~~）
    综合考虑，这里我们使用 Object

二、LRUCache.prototype.put => 双向链表
    题目要求 LRUCache.prototype.put 的第一个参数 key 是任意的，时间复杂是 O(1)
    分析可知，put 实际上有两个功能，在 space 不够时删掉“任意”节点的元素再添加，在 space 够时添加元素，同时移到头部
    满足删除任意节点，时间复杂度是 O(1) 的数据结构是 双向链表（单向链表只做到了在任意已知元素新增节点是O(1)）

三、LRU
    LRU 意思是 最近最少使用的先删掉
    调用 put 时，会有以下步骤
        1. 判断新插入元素的 key 是否在 Map 已存在，存在就从链表里删掉 (Map 不用管） —— 删
        2. 将新元素放在链表的头部（表示最近一次刚使用），同时存进 Map —— 存
        3. 检查 space，将链表的尾元素删掉 （尾元素表示最近最少使用的元素）—— 净化

    调用 get 时，会有以下步骤
        1. 判断 get 的 key 是否在 Map 已存在，存在就从链表里删掉 (Map 不用管）—— 删
        2. 将 key 放在链表的头部（表示最近一次刚使用）(Map 不用管）—— 存

四、准备数据结构
    实现双向链表
        虽然我之前也实现过 TypeScirpt 版的 单向链表 https://github.com/NeoYo/typescript-datastructure/blob/master/src/linked-list/LinkedList.ts
        Em... TypeScirpt 在 LeetCode 上跑不通，那么我们就与国际接轨，参考 [狗头.jpg] github 上的开源库 https://github.com/trekhleb/javascript-algorithms/tree/master/src/data-structures/doubly-linked-list
 */
// @lc code=start
/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
class ListNode {
    constructor(key, value) {
        this.key = key
        this.value = value
        this.next = null
        this.prev = null
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity
        this.hashTable = {}
        this.count = 0
        this.dummyHead = new ListNode()
        this.dummyTail = new ListNode()
        this.dummyHead.next = this.dummyTail
        this.dummyTail.prev = this.dummyHead
    }

    get(key) {
        let node = this.hashTable[key]
        if (node == null) return -1
        this.moveToHead(node)
        return node.value
    }

    put(key, value) {
        let node = this.hashTable[key]
        if (node == null) {
            let newNode = new ListNode(key, value)
            this.hashTable[key] = newNode
            this.addToHead(newNode)
            this.count++
            if (this.count > this.capacity) {
                this.removeLRUItem()
            }
        } else {
            node.value = value
            this.moveToHead(node)
        }
    }

    moveToHead(node) {
        this.removeFromList(node)
        this.addToHead(node)
    }

    removeFromList(node) {
        // 想实现的是 node.prev -> node.next 的双向
        const tempForPrev = node.prev
        const tempForNext = node.next
        node.prev.next = node.next
        tempForNext.prev = tempForPrev
    }

    addToHead(node) {
        node.prev = this.dummyHead
        node.next = this.dummyHead.next
        this.dummyHead.next.prev = node
        this.dummyHead.next = node
    }

    removeLRUItem() {
        let tail = this.popTail()
        delete this.hashTable[tail.key]
        this.count--
    }

    popTail() {
        let tailItem = this.dummyTail.prev
        this.removeFromList(tailItem)
        return tailItem
    }
}
// @lc code=end

var cache = new LRUCache(2);
// 2 缓存容量

cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // 返回  1
cache.put(3, 3);    // 该操作会使得关键字 2 作废
cache.get(2);       // 返回 -1 (未找到)
