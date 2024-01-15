let handleError = null;
export default {
  foo (fn) {
    callWithErrorHandling(fn)
  },
  // 用户可以调用该函数注册统一的错误处理函数
  registerErrorHandler (fn) {
    handleError = fn;
  }  
}

function callWithErrorHandling (fn) {
  try {
    fn && fn()
  } catch (e) {
    // 将捕获的错误传递给用户注册的错误处理程序
    handleError(e)
  }
}