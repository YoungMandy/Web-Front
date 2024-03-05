function Person (name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;

  this.sayName = function() {
    console.log(this.name);
  }

  let person1 = new Person('Name', 38, 'http://example.com');
  let person2 = new Person('Age', 40, 'http://example.com');
}