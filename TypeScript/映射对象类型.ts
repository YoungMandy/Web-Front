type K = 'x' | 'y';

type T = number;
type C = {[P in K]: T};

type MappedObjectType = { readonly [P in K]: T };

export default A;

type D = {
  a: string,
  b: string
}

type M = {
  [P in keyof D]: D[P]
}

type OptionalT = { [P in keyof D]?: D[P] };

type Partial<T> = {
  [P in keyof T]?: T[P]
}
type PartialD = Partial<D>;

type ReadonlyT = { readonly [P in keyof D]: D[P] };

type ReadonlyD = Readonly<D>;
