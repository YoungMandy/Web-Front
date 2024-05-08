// interface P {
//   [prop:string]:number
// }
// type keyofP = keyof P;

// interface P{
//   [prop: number]: number;
// }
// type keyofP = keyof P;

// // const s:unique symbol = Symbol();
interface S {
  0: boolean;
  a: string;
  b():void
}

type keyofP = keyof S;

type keyofAny = keyof any;


interface Boolean{
  valueOf (): boolean,
  // a:string
}

type keyofT = keyof Boolean;

type A = { a: string, b: boolean }
type B = { b: boolean, z: boolean }

type AB = A | B;

type KeyofAB = keyof (A | B);

type KeyofAB1 = keyof (A & B);
