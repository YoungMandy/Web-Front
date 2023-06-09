const text = `123 
255.055.55.0
192.168.0.1
0.0.0.0
254.1.1.1
this is a string.
123.123.0
192
055`;

const array = [
  '123',
  '255.055.55.0',
  '192.168.0.1',
  '0.0.0.0',
  '254.1.1.1',
  'this is a string.',
  '123.123.0',
  '192',
  '055',
];
const patt1 =/^(2(5[0-5]|[0-4]\d)|(1\d{1,2})|[1-9])(\.(2(5[0-5]|[0-4]\d)|(1\d{1,2})|\d)){3}$/gm;

const patt2 = /1/gi;

// console.log(patt1.test(text));
// console.log(patt1.test('192.168.0.1'));
// // console.log(patt2.test(text));
// console.log(patt1.exec(text));
// console.log(patt1.exec('192.168.0.1'));
console.log(patt1.exec(text));
// const res = [];
// console.log('\n');
// for (let value of array) {
//   console.group('value: ' + value);
//   console.log(patt1.exec(value));
//   console.groupEnd();
//   console.log('\n');
// }


// var patt3 = /e\b/gm;
// const text3 = `Thy 
// ebyst
// things
// in
// life 
// are 
// free`;
// console.log(text3.replace(patt3,12));