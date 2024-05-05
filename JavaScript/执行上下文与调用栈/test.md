### 1. a标签
点击a 标签，可以直接下载其href属性对应的文件，文件名为download属性的对应值。
`< a href = " /images/logo.png " download = " /images/logo.png " >`
可以用js动态生成一个a标签，模拟点击事件进行下载
缺点：不能获取成功事件和异常事件
```js
export const useATagDownLoad = (fileName, objectUrl) => {
  const el = document.createElement('a');
  el.download = fileName;
  el.style.display = 'none';
  el.href = objectUrl;
  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el);
};
```

###  2. form 表单
利用form表单的submit功能，可以实现文件的下载
效果 ：在 当前页面打开一个下载弹框，实现文件的下载
缺点：不能获取成功事件和异常事件
```js
export const useFormDownload = (url, params) => {
  // 导出表格
  const form = document.createElement('form');
  form.id = 'form';
  form.name = 'form';
  document.body.appendChild(form);
  for (const obj in params) {
    if (params.hasOwnProperty(obj)) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = obj;
      input.value = params[obj];
      form.appendChild(input);
    }
  }
  form.method = 'GET'; // 请求方式
  form.action = url;
  form.submit();
  document.body.removeChild(form);
};
```
### 3. window.open( url)
window.open(url)会打开一个新的窗口进行下载，下载成功后会自动关闭新窗口，通过监听新窗口的breforeunload事件，可以知道下载成功了
缺点：不能获取异常事件
```js
 const net = await window.open(url);
 net.addEventListener('beforeunload', (e) => {
   // 下载成功了
   this.appraisalDownLoading = false;
 });
  
```

### 4. ajax + window.URL. createObjectURL + a标签
ajax请求拿到文件数据后，利用   window.URL.createObjectURL 创建文件的url，利用a标签下载这个url.
优点：可以知道下载成功，可以catch异常
需要注意的是：我们是用http响应头的`Content-Disposition:attachment; filename 中的finename`当做文件名,后端一般是用utf-8编码，而Http 消息只能是 ASCII 编码,所以文件名可能会出现乱码情况，需要后端返回 urlencode 后的finename
参考博客：[https://www.cnblogs.com/saryli/p/5455362.html](https://www.cnblogs.com/saryli/p/5455362.html)

```js
import axios from 'axios';
import FileType from 'file-type';
export const downloadFile = (path, params) => {
  return axios.get(`${path}`, {
    params,
    responseType: 'arraybuffer',
  });
};

export const downloadToObjectUrl = (() => {
  return async (path, params) => {
    try {
      const res = await downloadFile(path, params);
      const { headers } = res;
      // 失败时返回的json
      if (headers && headers['content-type'].includes('json')) {
        throw new Error('fail');
      }
      const buffer = res.data;
      const result = await FileType.fromBuffer(buffer);
      const blob = new Blob([buffer], {
        type: result && result.mime,
      });
      const objectUrl = window.URL.createObjectURL(blob);
      const fileNameMatch = (res.headers['content-disposition'] || '').match(
        /filename="(.*)"/
      );
      return {
        fileHash: params.fileHash,
        fileName: fileNameMatch ? decodeURIComponent(fileNameMatch[1]) : '', // include suffix
        objectUrl,
      };
    } catch (e) {
      throw e;
    }
  };
})();

export const useFormDownload = (url, params) => {
  // 导出表格
  const form = document.createElement('form');
  form.id = 'form';
  form.name = 'form';
  document.body.appendChild(form);
  for (const obj in params) {
    if (params.hasOwnProperty(obj)) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = obj;
      input.value = params[obj];
      form.appendChild(input);
    }
  }
  form.method = 'GET'; // 请求方式
  form.action = url;
  form.submit();
  document.body.removeChild(form);
};

const { fileName, objectUrl } = await downloadToObjectUrl(url, params);
useATagDownLoad(fileName, objectUrl);
```
