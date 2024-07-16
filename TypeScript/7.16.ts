interface Point {
  x: number;
  y: number;
}

type T = keyof Point;

interface Y {
  [x: string]: number;
}
type keyofY = keyof Y;

interface B {
  [x: number]: number;
}
type keyofB = keyof B;

type keyofC = keyof any;

type keyofD = keyof unknown;

type keyofE = keyof boolean;

type A = { a: string; z: boolean };
type C = { b: string; z: boolean };
type keyofT = keyof (A | C);

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

interface Circle {
  kind: 'circle';
  radius: number;
}

function f(circle: Circle) {
  const kind = getProperty(circle, 'kind');

  const radius = getProperty(circle, 'radius');
}
