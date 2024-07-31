/*
 * @desc: 
 * @param: 
 * @return: 
 * @Author: huili.local
 */


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


function MyObject2 (name) {

  function prewait (time) {

    return {
      run: function(action) {
        setTimeout(() => {
          console.log(`${name} do ${action}`)
        }, time)
      }
    }
  }

  function wait (time) {
    // const time = gap;
    return {
      run: function(action) {
        console.log(`${name} do ${action}`)
        setTimeout(() => {

        }, time)
      }
    }
  }
  return {
    prewait,
    wait
  }
}

class CustomObject {
  gap = 0;
  immediate = false;

  constructor (name) {
    this.name = name;
  }

  wait (gap) {
    this.gap = gap;

    this.immediate = true;
    return this;
  }

  prewait (gap) {
    this.gap = gap;
    this.immediate = false;
    return this;
  }

  run (action) {
    if (this.immediate) {
      console.log(`${this.name} do ${action}`);
      setTimeout(() => {
        return this;
      }, this.gap)
    } else {
      setTimeout(() => {
        console.log(`${this.name} do ${action}`);
        return this;
      }, this.gap)
    }
    
  }



}

const action = 'action';
const obj = new CustomObject('hello');
obj.wait(10).run('action1');// 输出`{name} do {action}`,等待10秒
obj.prewait(8000).run('action2');// 等待10秒，输出`{name} do {action}`