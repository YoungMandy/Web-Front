const render = function(obj, root){
  const el = document.createElement(obj.tag);
  if (typeof obj.children === 'string') {
    const text = document.createTextNode(obj.children);
    el.appendChild(text);
  } else if (Array.isArray(obj.children)) {
    obj.children.forEach(child => render(child,root))
  }

  root.appendChild(el);
}

const obj = {
  tag: 'div',
  children: [
    {
      tag: 'span',
      children:'hello world'
    }
  ]
}

// 渲染到body下
render(obj, document.body);