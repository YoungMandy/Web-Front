export interface Circle {
  area: number;
  radius: number;
}
export interface Range{
  area: string;
  width: number;
  height: number;
}


type Shape = Circle | Range; // 取他们的公共属性

declare const s: Shape;
s.area;
