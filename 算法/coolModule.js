// function CoolModule ()
// {
//   var something = 'cool';
//   var another = [1, 2, 3];

//   function doSomething ()
//   {
//     console.log(something);
//   }

//   function doAnother ()
//   {
//     console.log(another.join('!'));
//   }

//   return {
//     doSomething: doSomething,
//     doAnother
//   }

// }

// var foo = CoolModule();

// foo.doSomething();
// foo.doAnother();


// var foo = (function CoolModule (id)
// { 
//   function change ()
//   {
//     publicAPI.identify = identify2;
//   }

//   function identify1 ()
//   {
//     console.log(id);
//   }

//   function identify2 ()
//   {
//     console.log(id.toUpperCase());
//   }

//   var publicAPI = {
//     change,
//     identify:identify1
//   }

//   return publicAPI;
// })('foo module')

// foo.identify();
// foo.change();
// foo.identify();


var myModule = (function Manager(){
  var modules = {};
  debugger

  // name: 需要定义的模块名
  // deps: 模块需要依赖的
  // impl[接口]: 实现的过程
  function define (name, deps, impl)
  {
    for (var i = 0; i < deps.length; i++)
    {
      deps[i] = modules[deps[i]];
    }

    modules[name] = impl.apply(impl,deps)
  }

  function get (name)
  {
    return modules[name];
  }

  return {
    define,
    get
  }
})()

myModule.define('bar', [], function()
{
  function hello (who)
  {
    return "Let me introduce " + who;
  }

  return {
    hello
  }
})



myModule.define('foo', ['bar'], function(bar)
{
  var hungry = "hippo";
  function awesome ()
  {
    console.log(bar.hello(hungry).toUpperCase());
  }

  return {
    awesome
  }
})

var bar = myModule.get('bar');
var foo = myModule.get('foo');

foo.awesome();