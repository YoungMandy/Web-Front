function Bromise() {
  debugger;
  let onResolve_ = null;
  let onReject_ = null;

  this.then = function (onResolve, onReject) {
    debugger;
    onResolve_ = onResolve;
  };

  function resolve(value) {
    debugger;
    setTimeout(() => {
      debugger;
      onResolve_(value);
    }, 0);
  }

  executor(resolve, null);
}

function executor(resolve, reject) {
  debugger;
  resolve(100);
}

let demo = new Bromise(executor);

function onResolve(value) {
  debugger;
  console.log(value);
}

demo.then(onResolve);
