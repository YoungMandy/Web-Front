['1', '5', '11'].map(console.log)
// 1 0['1', '5', '11']
// 5 1['1', '5', '11']
// 11 2['1', '5', '11']

['1', '5', '11'].map((item, index, arr) => {
  console.log(item, index, arr);
})

['1', '5', '11'].map(parseInt)
// 等同于
['1', '5', '11'].map((item, index, arr) => {
  parseInt(item, index, arr);
})