function grandFather () {
  let a = 'grandfather';
  function father () {
    function son () {
      console.log( a);
    }
    son()
  }
  father();
}

grandFather();// grandfather