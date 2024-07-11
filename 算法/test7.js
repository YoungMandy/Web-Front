function test(line) {
  let i = line.length - 1;
  let count = 0;
  while (line.charAt(i) !== ' ') {
    count++;
    i--;
  }
  return count;
} 
console.log(test('hello nowcoder'))