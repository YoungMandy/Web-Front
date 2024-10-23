/*
 * @desc: 
 * @param: 
 * @return: 
 * @Author: huili.local
 */
Array.prototype.splice1 = function(index, len, ...rest) {
  const deleteList = [];

  const n = this.length;

  let moved = false;
  let count = 0;
  let max = 0;

  if (index < 0 || index >= n) return null;
  if (rest && rest.length > 0) {// 插入元素
    for (let i = 0; i < this.length; i++) { 
      if (i == index && len > 0) {
  
        let count = 0;
        while (count < len) {
          this[i+len] = this[i];
          this[i] = rest[count++];
        }
      }
    } 
    
  } else {
    for (let i = 0; i < this.length; i++) {
      if (i == index && len > 0) {

        moved = true;
        max = i + len < this.length? i+len:this.length;
        
      }
      if (moved) {
        if (count < len) {
          deleteList.push(this[i]);
          count++;
        }
        if (max) {
          this[i] = this[i + len];
          
          max--;
        }     
      }
     
    } 
    this.length = this.length - len;
     
  }

  return deleteList;
  
}

const a = [1, 2, 3, 4, 5, 6]
console.log(a.splice(3, 2,7,8,9));
console.log(a)