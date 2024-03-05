function createPerson () {
  let o = new Object();

  o.name = name;
  o.age = aage;
  o.job = job;
  o.sayName = function() {
    console.log(this.name);
  }

  return o;
}

let person1 = createPerson('Nicholas', 29, 'Software Engineer');
let person2 = createPerson('Greg', 29, 'Software Engineer');