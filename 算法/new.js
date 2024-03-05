function create (...rest) {
  let obj = new Object()
  const con = rest.shift();// 拿到构造

  Object.setPrototypeOf(obj, con.prototype);
  let res = con.apply(obj, rest);

  return typeof res === 'object' ? res : obj;

}