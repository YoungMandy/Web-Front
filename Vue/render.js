function render (obj, root) {
  const el = document.createElement(obj.tag);
  if (typeof obj.children === 'string') {
    const text = document.createTextNode(obj.children);
    el.appendChild(text)
  } else if (Array.isArray(obj.children)) {
    obj.children.forEach(item => render(item,el))
  }

  root.appendChild(el)
}

const root = document.getElementById('test');

render({ tag: 'div', children: '123' }, root)

const a = 456;

// 把html标签编译成树型结构的数据对象
function compiler () {
  
}