
// 格式化输出
// 1000.32 => 1,000.32
// 100.5 => 100.5
function formatPrice (price) {
  
  const list = price.split(".");
  const interPart = list[0];// 整数部分
  let interList = interPart.split("");

  let len = interList.length;
  let str = '';
  let count = 0;

  while (len) {
    let ch = interList.pop();// 从尾部拿数
   
    if (count == 3) {//之前已经有三个数了
      str = ch + ',' + str ;
      count = 0;
    } else {
      str = ch + str
    }
    
    count++;
    len--;
   
  }

  let res = list.length > 1 ? str + '.' + list[1] : str;
 
  console.log(res);
  return res;

}
formatPrice('10000000.32');
formatPrice('1000000.32');
formatPrice('10000.32');
formatPrice('1000.32');
formatPrice('100.32');
formatPrice('10.32');
formatPrice('1.32');