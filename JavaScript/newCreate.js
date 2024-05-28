function create () {
  let obj = {};
  const Con = [].shift.call(arguments);
  Object.setPrototypeOf(obj, Con.prototype);

  const res = Con.apply(obj, arguments);
  return typeof res === 'object' ? res : obj;
}



function create () {
  let obj = {};
  const Con = [].shift.call(arguments);
  Object.setPrototypeOf(obj, Con.prototype);

  let res = Con.apply(obj, arguments);
  return typeof res === 'object' ? res : obj;
}