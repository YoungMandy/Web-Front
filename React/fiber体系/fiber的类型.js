export const FunctionComponent = 0; // 对应函数组件
export const ClassComponent = 1; // 对应类组件
export const IndeterminateComponent = 2; // 初始化的时候不知道是函数组件还是类组件
export const HostRoot = 3; // RootFiber可以理解为根节点，通过reactDom.render()产生的根元素
export const HostPortal = 4; 
export const HostComponent = 5;// DOM元素比如<div>
export const HostText = 6;// 文本节点
export const Fragment = 7;// 对应<React.Fragment>
export const Mode = 8;// 对应<React.StrictMode>
export const ContextConsumer = 9;// 对应<Context.Consumer>
export const ContextProvider = 10;// 对应<Context.Provider>
export const ForwardRef = 11;// 对应<React.forwardRef>
export const Profiler = 12;// 对应<React.Profiler/>
export const SuspenseComponent = 13;// 对应<Suspense>
export const MemoComponent = 14;// 对应<React.memo>返回的组件

