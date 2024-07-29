type Num = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Num2 = Num | 0;
type YY = `19${Num2}` | `20${Num2}`;
type MM = `0${Num}` | `1${0 | 1 | 2}`;
type DD = `0${Num}` | `${1 | 2}${Num2}`|`3${0|1}`;

type GenStr<Type extends string> = Type extends YY ? YY : Type extends MM ? MM : DD;

type Separator = '-' | '.' | '/';

type FormatDate1<Pattern extends string> =
  Pattern extends `${infer Aaa}${Separator}${infer Bbb}${Separator}${infer Ccc}`
    ? Pattern extends `${Aaa}${infer Sep}${Bbb}${infer _}${Ccc}`
      ? `${GenStr<Aaa>}${Sep}${GenStr<Bbb>}${Sep}${GenStr<Ccc>}`
      : never
    : never;

const a: FormatDate1<'YY-MM-DD'> = '2023-01-02';

const b: FormatDate1<'DD/MM/YY'> = '01/02/2024';

const c: FormatDate1<'DD/MM/YY'> = '2024-01-02';
