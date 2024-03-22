export function FiberNode (tag, pendingProps, key, mode) {
  this.tag = tag;// 说明是什么类型的fiber
  this.key = key;// key调和子节点的时候用到
  this.type = null;// 如果是DOM元素，指的是元素类型，如div, 如果是组件，指的是组件对应的类或者函数
  this.stateNode = null;// 指向对应的真实元素，类组件指向组件实例
  this.return = null;//指向父级fiber
  this.child = null;// 指向子级fiber
  this.sibling = null;// 指向兄弟fiber
  this.index = 0;// 索引
  this.ref = null;//ref指向，函数或者ref对象
  this.pendingProps = pendingProps;// 在一次更新中，代表重新创建Element生成的props
  this.memoizedProps = null;// 记录上一次更新完毕后的props
  this.updateQueue = null;// 记录更新队列
  this.memoizedState = null;// 类组件保存State信息,函数组件保存Hooks信息，DOM元素为null
  this.dependencies = null;// Context依赖项
  this.mode = mode;// 描述fiber树的模式，比如concurrentMode模式

  // V16老版本
  this.effectTag = null;// effect标签，用于收集effectList
  this.nextEffect = null;// 指向下一个effect
  this.firstEffect = null;// 第一个Effect
  this.lastEffect = null;// 最后一个effect
  this.expirationTime = NoWork;// 过期时间，判断任务是否过期，在ReactV17 及以上版本用lane表示

  // V17版本
  this.flags = NoFlags;// 类似于effectTag
  this.subtreeFlags = NoFlags;// 当前fiber的子代fiber是否有flags
  this.lanes = NoLanes; // 是否有更新标志
  this.childLanes = NoLanes; // Children是否有更新标志

  // 
  this.alternate = null;// 双缓存树，指向缓存的fiber。更新阶段,两个树互相交替
}