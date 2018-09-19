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
    el: '#app',
    render(h) {
        var file = processor.data('h', h).processSync('# h1');
        return file.contents;
    }
}); 
```


###### Writing a custom rule/Extend a rule 

```javascript 
var unified = require('unified')
var parse = require('remark-parse')
var render = require('remark-render')
  
var h = require('hyperscript');
var Renderer = require('remark-render/src/renderers/hyperscript-renderer');

renderer.text = function(h, node, children) {
    return h('span', {
        key: node.data.key,
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




## License

[MIT][license] © [yucopowo][author]

<!-- Definitions -->

[license]: LICENSE

[author]: https://github.com/yucopowo

[npm]: https://docs.npmjs.com/cli/install

[remark]: https://github.com/remarkjs/remark

[vdom]: https://github.com/Matt-Esch/virtual-dom

[vnode-key]: https://github.com/Matt-Esch/virtual-dom/tree/master/virtual-hyperscript#key