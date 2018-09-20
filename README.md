# remark-render

Compiles markdown to [Virtual DOM][vdom].  Built on [**remark**][remark], an
extensively tested and pluggable markdown processor.

*   [x] Supports raw HTML
*   [x] Support VNode [keys][vnode-key]
*   [x] Multiple modes and Optionally settings (hyperscript virtual-dom Vue React snabbdom)
*   [x] Custom Renderer / Extend Renderer

## Installation

[npm][]:

```bash
npm install remark-render
```

## Usage

Say we have the following file, `example.js`:


```
var renderer = require('remark-preact-renderer');

unified().use(render, {
  renderer: renderer,
  h: h,
  rootClassName: 'markdown-body',
  rootTagName: 'main'
})

=> <main class="markdown-body"></main>

```

#### options
|  | remark |
| :------| ------: |
| renderer |  framework renderer |
| h | create element function |
| rootClassName | vdom root element class name |
| rootTagName | vdom root element tag type. default is div |



```javascript 
var unified = require('unified')
var parse = require('remark-parse')
var render = require('remark-render')
  
var h = require('hyperscript');
unified()
  .use(parse)
  .use(render, {
     h: h, // create element function
     rootClassName: 'markdown-body' // vdom root element class name,
     rootTagName: 'main'
  })
  .process('# h1  \n## h2', function(err, file) {
    if (err) throw err
    console.dir(file.contents, {depth: null})
  })
 
```



## Renderers

|  | renderers |
| :------| ------: |
| React | [remark-preact-renderer](https://github.com/vmarkdown/remark-preact-renderer) |
| Preact | [remark-react-renderer](https://github.com/vmarkdown/remark-react-renderer) |
| Vue | remark-vue-renderer |
| HyperScript | remark-hyperscript-renderer |
| snabbdom | remark-snabbdom-renderer |
| virtual-dom | remark-virtual-dom-renderer |
| morphdom | morphdom |




## Examples

Presets provide a potentially sharable way to render.  They can
contain multiple modes and optionally settings as well.

##### html


```html
<div id="preview"></div>
```

###### HyperScript

```bash
npm install remark-render remark-hyperscript-renderer
```

```javascript 
var unified = require('unified')
var parse = require('remark-parse')
var render = require('remark-render')
var renderer = require('remark-hyperscript-renderer');

var h = require('hyperscript');
unified()
  .use(parse)
  .use(render, {
     renderer: renderer,
     h: h,
     rootClassName: 'markdown-body'
  })
  .process('# h1  \n## h2', function(err, file) {
    if (err) throw err
    console.dir(file.contents, {depth: null})
    var preview = document.getElementById('preview');
    preview.appendChild(vdom);
  })
 
```


###### React

```bash
npm install remark-react-renderer
```

```javascript 
var unified = require('unified')
var parse = require('remark-parse')
var render = require('remark-render')
var renderer = require('remark-react-renderer');
var React = require('react');
var h = React.createElement;

var processor = unified()
    .use(parse)
    .use(render, {
        renderer: renderer,
        h: h
    });
 
var file = processor.processSync('# h1');

ReactDOM.render(
    file.contents,
    document.getElementById('preview')
);
 
```

###### Vue

```bash
npm install remark-vue-renderer
```

```javascript 
var unified = require('unified')
var parse = require('remark-parse')
var render = require('remark-render')
var renderer = require('remark-vue-renderer');
var Vue = require('vue');
 
var processor = unified()
    .use(parse)
    .use(render, {
        renderer: renderer
    });
 
const app = new Vue({
    el: '#preview',
    render(h) {
        var file = processor.data('h', h).processSync('# h1');
        return file.contents;
    }
}); 
```


###### Writing a custom renderer/Extend a renderer

```javascript 
var unified = require('unified')
var parse = require('remark-parse')
var render = require('remark-render')
var renderer = require('remark-hyperscript-renderer'); 
var h = require('hyperscript');

renderer.text = function(h, node, children) {
    return h('span', {
        key: node.properties.key,
        style: {'font-size': '60px'}
    }, node.value);
};

unified()
  .use(parse)
  .use(render, {
     h: h,
     renderer: renderer
  })
  .process('# h1  \n## h2', function(err, file) {
    if (err) throw err
    var preview = document.getElementById('preview');
    preview.appendChild(vdom);
  })
```


###### [morphdom](examples/morphdom/renderer.js) - Writing a custom renderer.

```javascript
var unified = require('unified');
var parse = require('remark-parse');
var render = require('remark-render')
var morphdom = require('morphdom');

function createElement(type, props, children) {
    let dom = document.createElement(type);
    if(props.className) {
        dom.className = props.className;
    }
    if(props.hasOwnProperty('id')) {
        dom.id = props.id;
    }
    dom.appendChild( createElements(children) );
    return dom;
}

function createElements(children) {
    const doms = document.createDocumentFragment();
    children && children.length > 0 && children.forEach(function (dom) {
        dom && doms.appendChild(dom);
    });
    return doms;
}

var renderer = {
    root: function(h, node, children) {
        return h('div', node.props, children);
    },
    text: function(h, node, children) {
        return document.createTextNode(node.value);
    },
    blockquote: function(h, node, children) {
        return h('blockquote', node.props, children);
    },
    heading: function(h, node, children) {
        return h('h'+node.depth, node.props, children);
    }
    ...
}


var processor = unified()
    .use(parse, {})
    .use(render, {
        renderer: renderer,
        h: createElement
    });

var file = processor.processSync('# h1\n## h2');
var markdownContainer = file.contents;

var previewContainer = document.getElementById('preview');

morphdom(previewContainer, markdownContainer);
```



## License

[MIT][license] © [yucopowo][author]

<!-- Definitions -->

[license]: LICENSE

[author]: https://github.com/yucopowo

[npm]: https://docs.npmjs.com/cli/install

[remark]: https://github.com/remarkjs/remark

[vdom]: https://github.com/Matt-Esch/virtual-dom

[vnode-key]: https://github.com/Matt-Esch/virtual-dom/tree/master/virtual-hyperscript#key