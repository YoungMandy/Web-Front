function GetWebData () {
  // 新建XMLHttpRequest对象
  let xhr = new XMLHttpRequest();

  // 注册相关事件的回调处理函数
  xhr.onreadystatechange = function() {
    switch (xhr.readyState) {
      case 0://请求未初始化
        console.log('请求未初始化');
        break;
      case 1:
        console.log('open');
        break;
      case 2:
        console.log('header received');
        break;
      case 3:
        console.log('loading');
        break;
      case 4:
        if (this.status === 200 || this.status === 304) {
          console.log(this.responseText);
        }
        console.log('done');
        break;
    }
  }

  xhr.ontimeout = function(e) {
    console.log('ontimeout');
  }

  xhr.onerror = function(e) {
    console.log('onerror');
  }

  // 3.打开请求
  xhr.open('GET', URL, true);

  //4.配置参数
  xhr.timeout = 3000;// 设置xhr请求的超时时间
  xhr.responseType = 'text';// 设置响应返回的数据格式
  xhr.setRequestHeader('X_TEST', 'time.geekbang');


  // 5.发送请求
  xhr.send();

}
