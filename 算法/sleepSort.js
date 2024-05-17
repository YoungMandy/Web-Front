function sleepSort (arr) {
  return new Promise((resolve) => {
    const sortArr = [];
    let sortCount = 0;

    arr.forEach((num) => {
      setTimeout(() => {
        sortArr.push(num);
        sortCount++;
        if (sortCount == arr.length) {
          resolve(sortArr);
        }
      }, num)
    })
  })
}

const arr = [50, 25, 10, 90, 60]

sleepSort(arr).then((sortArr) => {
  console.log('Sorted Array: ', sortArr)
 })
