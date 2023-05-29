最初的网络只用来浏览信息，所以并不关心浏览信息的用户是谁

#### cookie
后来，面对购物车这一场景，就需要记录用户的登录状态，后面就产生了cookie,通过cookie区分登录的是用户A还是用户B，以及判断是否已经登录。

### session
session是基于cookie实现的，sessionId 的信息会存储在cookie中.

cookie和session的区别
1. session比cookie安全，session是存储在服务器的，cookie是存储在客户端的
2. 存取值的类型不同，cookie只支持字符串数据，想要设置其他类型的数据，需要将其转成字符串，session可以存任意数据类型
3. 有效期不同，cookie可设置为长时间保持，比如我们经常使用的默认登录功能，session一般失效时间较短，客户端关闭(默认情况下)或者session超时都会失效。
4. 存储大小不同，单个cookie保存的数据不能超过4k，session可存储的数据远高于cookie，但是当访问量过多，会占用过多的服务器资源。

### token 
token 是一种基于加密解密的凭证验证手段，一般只要没有过期都可以使用，所以一般设置比较小的有效期。


### JWT
JSON Web Token (简称JWT)是目前最流行的跨域验证解决方案
是一种认证授权机制
