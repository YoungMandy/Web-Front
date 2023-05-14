interface TemperatureMapping{
  [key:string]:(temperature:number) => number,
}
function convertTemperature (temperature: number, type: string): number {
  const typeMap: TemperatureMapping = {
    C: (temperature: number) => temperature * 1.8 + 32,
    F: (temperature: number) => (temperature - 32) * 1.8
  };

  if (!temperature || !type) {
    throw new Error(
      'Parameter error, please enter temperature and temperature units'
    );
  }
  if (!(type in typeMap)) {
    throw new Error(
      'Parameter error, please enter the correct temperature unit (F or C)'
    );
  }

  const res = typeMap[type](temperature);
  console.log(res);
  return res;
}

convertTemperature(32, 'F'); // 输出: 0
convertTemperature(100, 'C'); // 输出: 212

function groupArrayElements(array:Array<number>, n:number):Array<Array<number>> {
  const len = array.length;

  if (!len || n < 1 || n > len) {
    return [];
  }

  let averageFlag = len % n; // 能否平均分
  const minLength = Math.floor(len / n); // 最少的组能有多少个元素

  const res:Array<Array<number>> = [];
  while (n) {
    let length = minLength;
    if (averageFlag) {
      averageFlag--;
      length++;
    }
    res.push(array.splice(0, length));
    n--;
  }
  console.log(res);
  return res;
}

groupArrayElements([1, 2, 3, 4, 5], 2); // 输出: [[1, 2, 3], [4, 5]]
groupArrayElements([1, 2, 3, 4, 5, 6], 4); // 输出: [[1, 2], [3, 4], [5], [6]]
