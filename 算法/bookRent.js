function bookRent (list)
{
  const initialBalance = 300;
  const rent = {
    100: { base: 5, over: 3 },
    50: { base: 3, over: 2 },
    other:{base:1,over:0}
  }

  const finallyBalance = list.reduce(function(balance,currentValue)
  {
    let record = currentValue;
    const bookPrice = currentValue[0]; // 图书的价格
    const planDays = currentValue[1]; // 计划租赁天数
    const rentDays = currentValue[2]; // 实际租赁的天数

    if (bookPrice > balance) // 图书价格超过余额，不处理这次租赁记录
    {
      return balance;
    }

    const rentRule =
      bookPrice >= 100
        ? rent['100']
        : bookPrice < 50
        ? rent['other']
          : rent['50'];
    const over15Price = rentDays > 15 ? (rentDays - 15) * rentRule.over :0;
    const overPlanPrice = (rentDays - planDays) * 1;
    const inRangePrice = rentDays > 15 ? 15 * rentRule.base : rentDays * rentRule.base;

    const sum = over15Price + overPlanPrice + inRangePrice;

    balance = sum <= bookPrice ? balance - sum  : balance - bookPrice ;
    return balance;
    
  }, initialBalance)
  
  return finallyBalance;
}

console.log(bookRent([[130,5,11],[60,16,16],[10,11,11]]));