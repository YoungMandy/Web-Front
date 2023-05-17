//==== 例子一
// Task = {
//   setID: function(ID)
//   {
//     this.id = ID;
//   },
//   outputID: function()
//   {
//     console.log(this.id);
//   }
// }

// // XYZ = new Task();
// // 让XYZ 委托Task
// XYZ = Object.create(Task);
// // Object.setPrototypeOf(XYZ,Task);

// XYZ.prepareTask = function(ID, label)
// {
//   this.setID(ID);
//   this.label = label;
// }

// XYZ.outputTaskDetails = function()
// {
//   this.outputID();
//   console.log(this.label)
// }


// XYZ.prepareTask(123, 'good good study');
// XYZ.outputTaskDetails();

//===例子二

// 模仿类的写法
// function Foo (who)
// {
//   this.me = who;
// }

// Foo.prototype.identify = function()
// {
//   console.log(this.me)
//   return "I am " + this.me;
// }

// function Bar (who)
// {
//   Foo.call(this, who);
// }

// Bar.prototype = Object.create(Foo.prototype);

// Bar.prototype.speak = function()
// {
//   console.log("Hello, " + this.identify() + ".");
// }

// var b1 = new Bar("b1");
// var b2 = new Bar("b2");

// b1.speak();
// b2.speak();

// b1.identify();
// debugger


// 子类Bar继承了父类Foo,然后生成了b1和b2两个实例。b1委托了Bar.prototype,Bar.prototype委托了Foo.prototype.

// ====例子三
// 对象关联风格来编写功能完全相同的代码
// Foo = {
//   init: function(who)
//   {
//     this.me = who;
//   },
//   identify: function()
//   {
//     return "I am " + this.me;
//   }
// };

// Bar = Object.create(Foo);
// Bar.speak = function()
// {
//   console.log("Hello, "+this.identify()+".")
// }

// var b1 = Object.create(Bar);
// b1.init("b1");

// var b2 = Object.create(Bar);
// b2.init("b2");

// b1.speak();
// b2.speak();

// 例子四：使用类风格编写UI控件
// 父类
// function Widget (width, height)
// {
//   this.width = width || 50;
//   this.height = height || 50;
//   this.$elem = null;
// }

// Widget.prototype.render = function($where)
// {
//   if ($elem)
//   {
//     this.$elem.css({
//       width: this.width + 'px',
//       height:this.height + 'px'
//     }).appendTo($where);
//   }
// }

// // 子类
// function Button (width, height, label)
// {
//   //调用super构造函数
//   Widget.call(this, width, height);
//   this.label = label || 'Default';
//   this.$elem = $("<button>").text(this.label);
// }

// // 让Button 继承 Widget
// Button.prototype = Object.create(Widget.prototype);

// //重写render(..)
// Button.prototype.render = function($where)
// {
//   // super调用
//   Widget.prototype.render.call(this, $where);
//   this.$elem.click(this.onClick.bind(this));
// }

// Button.prototype.onClick = function(evt)
// {
//   console.log('Button ' + this.label + "clicked!");
// }

// $(document).ready(function()
// {
//   var $body = $(document.body);
//   var btn1 = new Button(125, 30, "Hello");
//   var btn2 = new Button(150, 40, "World");

//   btn1.render($body);
//   btn2.render($body);
// })

// 在类设计模式中，我们需要在父类中先定义基础的render(..)，然后在子类中重写它。子类并不会替换基础的render(..),只是添加一些按钮特有的行为。


// 使用ES6的class 语法糖来实现相同的功能
// class Widget
// {
//   constructor (width, height)
//   {
//     this.width = width || 50;
//     this.height = height || 50;
//     this.$elem = null;
//   }
//   render ($where)
//   {
//     if (this.$elem)
//     {
//       this.$elem.css({
//         width: this.width + 'px',
//         height:this.height + 'px'
//       }).appendTo($where);
//     }
//   }
// }

// class Button extends Widget
// {
//   constructor (width, height, label)
//   {
//     super(width, height);
//     this.label = label || 'Default';
//     this.$elem = $("<button>").text(this.label)
//   }
//   render ($where)
//   {
//     super.render($where);
//     this.$elem.click(this.onClick.bind(this));
//   }
//   onClick (evt)
//   {
//     console.log('Button' + this.label + ' clicked!')
//   }
// }

// $(document).ready(function()
// {
//   var $body = $(document.body);
//   var btn1 = new Button(125, 30, "Hello");
//   var btn2 = new Button(150, 40, "World");

//   btn1.render($body);
//   btn2.render($body);
// })

//class 仍是通过[[Prototype]]机制实现的

// 例子五：使用对象关联风格来实现UI控件
// var Widget = {
//   init: function(width, height)
//   {
//     this.width = width || 50;
//     this.height = height || 50;
//     this.$elem = null;
//   },
//   insert: function($where)
//   {
//     if (this.$elem)
//     {
//       this.$elem.css({
//         width: this.width + "px",
//         height: this.height + "px"
//       }).appendTo($where);
//     }
//   }
// }

// var Button = Object.create(Widget);

// Button.setUp = function(width, height, label)
// {
//   //委托调用
//   this.init(width, height);
//   this.label = label || 'Default';

//   this.$elem = $("<button>").text(label);
// }

// Button.build = function($where)
// {
//   //委托调用
//   this.insert($where);
//   this.$elem.click(this.onClick.bind(this))
// }

// Button.onClick = function(evt)
// {
//   console.log("Button " + this.label + " clicked!");
// }

// $(document).ready(function()
// {
//   var $body = $(document.body);
//   var btn1 = Object.create(Button);
//   btn1.setUp(125, 30, "hello");

//   var btn2 = Object.create(Button);
//   btn2.setUp(150, 40, "world");

//   btn1.build($body);
//   btn2.build($body);
// })

// 对象关联可以更好地支持关注分离原则，创建和初始化并不需要合并成一个步骤。

// 例子六：类风格的登录表单
// 父类
// function Controller ()
// {
//   this.errs = [];
// }
// Controller.prototype.showDialog = function(title, msg)
// {
//   // 给用户显示标题和消息
// };
// Controller.prototype.success = function(msg)
// {
//   this.showDialog("Success", msg)
// };
// Controller.prototype.failure = function(err)
// {
//   this.errs.push(err);
//   this.showDialog("Failure", err);
// }

// //子类
// function LoginController ()
// {
//   Controller.call(this);
// }
// //把子类关联到父类
// LoginController.prototype = Object.create(Controller.prototype);

// LoginController.prototype.getUser = function()
// {
//   return document.getElementById("login_username").value;
// }

// LoginController.prototype.getPassword = function()
// {
//   return document.getElementById("login_password").value
// }

// LoginController.prototype.validateEntry = function(user, pw)
// {
//   user = user || this.getUser();
//   pw = pw || this.getPassword();

//   if (!(user && pw))
//   {
//     return this.failure("Please enter a username & password !")
//   } else if (pw.length < 5)
//   {
//     return this.failure("Password must be at least 5 characters")
//   }
//   // 如果执行到这里说明通过验证
// }

// // 重写基础的failure
// LoginController.prototype.failure = function(err)
// {
//   //super 调用
//   Controller.prototype.failure.call(this,"Login invalid:" + err)

// }

// // 子类
// function AuthController (login)
// {
//   Controller.call(this);
//   // 合成
//   this.login = login;
// }

// //把子类关联到父类
// AuthController.prototype = Object.create(Controller.prototype);
// AuthController.prototype.server = function(url, data)
// {
//   return $.ajax({
//     url: url,
//     data:data
//   })
// }

// AuthController.prototype.checkAuth = function()
// {
//   var user = this.login.getUser();
//   var pw = this.login.getPassword();

//   if (this.login.validateEntry(user, pw))
//   {
//     this.server("/check-auth", {
//       user: user,
//       pw:pw
//     }).then(this.success.bind(this)).fail(this.failure.bind(this))
//   }
// }

// //重写基础的success()
// AuthController.prototype.success = function()
// {
//   //super调用
//   Controller.prototype.success.call(this,"Authenticated!")
// }

// //重写基础的failure()
// AuthController.prototype.failure = function(err)
// {
//   //super调用
//   Controller.prototype.failure.call(this,"Auth Failed:" + err)
// }

// var auth = new AuthController(
//   // 除了继承，我们还需要合成
//   new LoginController()
// )
// auth.checkAuth();

//例子七：对象关联风格的登录表单
var LoginController = {
  errors: [],
  getUser: function()
  {
    return document.getElementById("login_username").value;
  },
  getPassword: function()
  {
    return document.getElementById("login_password").value;
  },
  validateEntry: function(user, pw)
  {
    user = user || this.getUser();
    pw = pw || this.getPassword();
    if (!(user && pw))
    {
      return this.failure("Please enter a username and password")
    } else if (pw.length < 5)
    {
      return this.failure("Please must be at least 5 characters")
    }

    // 如果执行到这里说明通过验证
    return true;
  },
  showDialog: function(title, msg)
  {
    // 给用户显示标题和消息
  },
  failure: function(err)
  {
    this.errors.push(err);
    this.showDialog("Error", "Login invalid:" + err);
  }
}

// 让AuthController委托LoginController
var AuthController = Object.create(LoginController);

AuthController.errors = [];
AuthController.checkAuth = function()
{
  var user = this.getUser();
  var pw = this.getPassword();

  if (this.validateEntry(user, pw))
  {
    this.server('/check-auth', {
      user: user,
      pw: pw,
    }.then(this.accepted.bind(this))
      .fail(this.rejected.bind(this))
    )
  }
}
AuthController.accepted = function()
{
  this.showDialog("Success","Authenticated!")
}
AuthController.rejected = function(err)
{
  this.failure("Auth Failed:"+ err)
}

AuthController.checkAuth();