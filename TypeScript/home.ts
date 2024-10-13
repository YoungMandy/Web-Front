// function add<T extends number| string >(a: T, b: T):T {
//   return (a + b) as T;
// }
type addType = number | string;
function add<T extends addType>(a: T, b: T): T {
  return a + b as T;
}


add(1, 2);
add(1.111, 2.2222);


function getPropValue<T extends object, Key extends keyof T> (obj:T,key:Key):T[Key] {
  return obj[key]
}


// 约束以某个字符串开头
function func (str: `#${string}`) {
  
}

func('123')
func('#123')


type isTwo<T> = T extends 2 ? true : false;

// 高级类型的特点是传入类型参数，经过一系列类型运算逻辑后，返回新的类型

type First<Tuple extends unknown[]> = Tuple extends [infer T, ...infer R] ? T : never;

type res = First<[1,2,3]>

type MapType<T> = {
  [Key in keyof T]?: T[Key]
}

// infer用于提取类型的一部分
type test1 = [number, string, boolean];
type getInfer<r extends test1> = r extends [infer A, ... infer C] ? C : never;

type res1 = getInfer<[1,'1',false]>