JavaScript语言在相当长的时间里都缺少对模块的支持。此外，在编写JavaScript代码的过程中也缺少开发者工具的支持。因此，编写并维护大型JavaScript程序是困难的。

微软公司有一部分产品是使用JavaScript语言进行开发和维护的，例如必应地图和Office 365应用等，因此微软组件了一个十人的团队开始着手设计和实现一种JavaScript开发工具，用以解决产品开发和维护中遇到的问题。

2014年10月1日，微软公司对外发布了这款简称语言的第一个公开预览版v0.8。

TypeScirpt语言以平滑的方式为JS语言添加了**强类型**并提供了强大的开发者工具。

TypeScript代码不能直接运行，它需要先被编译成JavaScript代码然后才能运行。TypeScript编译器(tsc)负责把TypeScript代码编译成JavaScript代码。

类型系统是TypeScript的核心特性。TypeScript为JavaScript添加了静态类型的支持，我们可以使用类型注解为程序添加静态类型信息。

同时，TypeScript中的静态类型是可选的，它不强制要求为程序中的每一部分都添加类型注解。TypeScript支持类型推断的功能，编译器能够自动推断出大部分表撒施的类型信息，开发者只需要在程序中添加少量的类型注解便能拥有完整的类型信息。


TypeScript语言是跨平台的。TypeScript程序经过编译后可以在任意的浏览器、JavaScript宿主环境和操作系统上运行。


### 使用TypeScript的原因
1.能够更早地发现代码中的错误
如拼写错误在开发时就能发现，而不需要等到运行时

2.能够帮助提升生产力
添加了代码自动补全
提供了重构工具（重命名符号名、提取到函数或方法、提取类型）
提供了代码快速修复工具(自动删除未使用的代码、自动删除执行不到的代码、自动添加缺少的模块导入语句)



3.支持JavaScript语言的最新特性并且使用了与JavaScript语言相同的语法和语义
TypeScript编译器可以将代码编译成兼容指定ECMAScript版本的JavaScript代码。



JSX又名JavaScript XML,是JavaScript语法的扩展，常用在React应用中。

`tsconfig.json`是TypeScript编译器默认使用的配置文件。

在计算机科学中，`语法糖`指的是编程语言中的某种语法，这种语法对语言分功能没有英系那个，但是会方便开发者的使用，能够让程序更加简洁，具有更高的可读性。

### 顶端类型
顶端类型(Top Type) 源自于数学中的类型论，同时它也被广泛应用于计算机编程语言中。顶端类型是一种通用类型，有时也被称为通用超类型，因为在类型系统重，所有类型都是顶端类型的子类型，或者说顶端类型是所有其他类型的父类型。

TypeScript中有以下两种顶端类型：
1. any
2. unknown

unknown类型是比any类型更安全的顶端类型，因为unknown类型只允许赋值给any类型和unknown类型，而不允许赋值给任何其他类型。

在程序中使用unknown类型时，我们必须将其细化为某种具体类型，否则将产生编译错误。

```typescript
function f2 (message: unknown) {
  return message.length; //error TS18046: 'message' is of type 'unknown'.
 
}

f2(undefined)
```

细化成具体类型，编译阶段不会报错
```typescript
function f2(message: unknown) {
  if (typeof message === 'string') {
    return message.length;
  } else {
    return message;
  }
}

f2(undefined);

```

### 尾端类型
在类型系统中，尾端类型(Bottom Type)是所有其他类型的子类型。

TypeScript中只存在一种尾端类型，即never类型。


