var data = []

for (let i = 0; i < 3; i++){
  data[i] = function() {
    console.log(i)
  }
}
data[0]();
data[1]();
data[2]();

class A {
  constructor () { 
    this.name = 'A';
  }

  getInfo () {
    const self = this;
    return {
      name: 'B',
      sayName: function(){
        console.log(self.name)
      }
    }
  }
}

const st = new A();
st.getInfo().sayName();
