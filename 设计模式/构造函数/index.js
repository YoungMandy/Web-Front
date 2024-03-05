function Person (name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;

  this.sayName = function() {
    console.log(this.name);
  }

  
}
let person1 = new Person('Name', 38, 'http://example.com');
console.log(person1.__proto__ == Person.prototype);
console.log(person1.__proto__.constructor)
console.log(Person.prototype.constructor)
console.log(Person.prototype)
console.log(Person.__proto__)

console.log(person1 instanceof Object)
 debugger;
 let person2 = new Person('Age', 40, 'http://example.com');