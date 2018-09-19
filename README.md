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


```javascript 
var unified = require('unified')
var parse = require('remark-parse')
var render = require('remark-render')
  
var h = require('hyperscript');
unified()
  .use(parse)
  .use(render, {
     mode: 'hyperscript', // supoort hyperscript react vue preact snabbdom virtual-dom
     h: h, // create element function
     rootClassName: 'markdown-body' // vdom root element class name
  })
  .process('# h1  \n## h2', function(err, file) {
    if (err) throw err
    console.dir(file.contents, {depth: null})
  })
 
```


## Preset

Presets provide a potentially sharable way to render.  They can
contain multiple modes and optionally settings as well.

#### Example


```html
<div id="preview"></div>
```

###### HyperScript

```javascript 
var unified = require('unified')
var parse = require('remark-parse')
var render = require('remark-render')
  
var h = require('hyperscript');
unified()
  .use(parse)
  .use(render, {
     mode: 'hyperscript',
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

```javascript 
var unified = require('unified')
var parse = require('remark-parse')
var render = require('remark-render')
  
var React = require('react');
var h = React.createElement;

var processor = unified()
    .use(parse)
    .use(render, {
        mode: 'react',
        h: h
    });
 
var file = processor.processSync('# h1');

ReactDOM.render(
    file.contents,
    document.getElementById('preview')
);
 
```

###### Vue

```javascript 
var unified = require('unified')
var parse = require('remark-parse')
var render = require('remark-render')
  
var Vue = require('vue');
 
var processor = unified()
    .use(parse)
    .use(render, {
        mode: 'vue'
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
  
var h = require('hyperscript');
var Renderer = require('remark-render/src/renderers/hyperscript-renderer');

renderer.text = function(h, node, children) {
    return h('span', {
        key: node.props.key,
        style: {'font-size': '60px'}
    }, node.value);
};

unified()
  .use(parse)
  .use(render, {
     h: h,
     Renderer: Renderer
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


function Renderer(options) {
    this.options = options || {};
}

Renderer.prototype.root = function(h, node, children) {
    return h('div', node.props, children);
};

Renderer.prototype.text = function(h, node, children) {
    return document.createTextNode(node.value);
};

Renderer.prototype.blockquote = function(h, node, children) {
    return h('blockquote', node.props, children);
};

Renderer.prototype.heading = function(h, node, children) {
    return h('h'+node.depth, node.props, children);
};

var processor = unified()
    .use(parse, {})
    .use(render, {
        Renderer: Renderer,
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