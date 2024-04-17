const greeting = 'hello world';
console.log(greeting);

//#region 区域注释


// 单行注释
const a = 0;


/* 多行注释 */
const y = 0; 

//#endregion 区域注释结束

const b = 100n;
const e = BigInt(100);

function foo (): void{
  return undefined;  
}


type CT<T> = T extends Array<infer U> ? U : never;

type T = CT<Array<number>>;

type ReturnType1 <T extends (...args: any) => any> = T extends (...args: any) => infer R? R : any;


type YT<T> = T extends { a: infer M; b: infer M } ? M : never;

type Y = YT<{a:number,b:number}>;

