/*
 * @desc: 
 * @param: 
 * @return: 
 * @Author: huili.local
 */
const action = 'action';
const obj = new MyObject('hello');
obj.wait(10).run(action);// 输出`{name} do {action}`,等待10秒
obj.prewait(1000).run(action);// 等待10秒，输出`{name} do {action}`

function MyObject (name) {
  this.immediate = false;
  this.gap = 0;

  this.wait = function(gap) {
    this.gap = gap;
    this.immediate = true;
    return this;
  }

  this.prewait = function(gap) {
    this.gap = gap;
    this.immediate = false;
    return this;
  }

  this.run = function(action) {
    if (this.immediate) {
      console.log(`${name} do ${action}`)
    } else {
      setTimeout(() => {
        console.log(`${name} do ${action}`)
      }, this.gap);
    }
    return this;
  }
}