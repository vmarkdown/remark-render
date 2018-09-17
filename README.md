# remark-render

Compiles markdown to [Virtual DOM][vdom].  Built on [**remark**][remark], an
extensively tested and pluggable markdown processor.

*   [x] Supports raw HTML
*   [x] Supports footnotes, todo lists
*   [x] Support VNode [keys][vnode-key]
*   [x] hyperscript virtual-dom Vue React snabbdom Renderers
*   [x] Custom Renderer / Extend Renderer

## Installation

[npm][]:

```bash
npm install remark-render
```

## Usage

Say we have the following file, `example.js`:

```html
<div id="preview"></div>
```

### HyperScript

```javascript 
var unified = require('unified')
var parse = require('remark-parse')
var render = require('remark-render')
  
var h = require('hyperscript');
var Renderer = require('remark-render/renderers/hyperscript-renderer');
var renderer = new Renderer({
    h: h,
    rootClassName: 'markdown-body'
});

unified()
  .use(parse)
  .use(render, {
     renderer: renderer
  })
  .process('# h1  \n## h2', function(err, file) {
    if (err) throw err
    console.dir(file.contents, {depth: null})
    var preview = document.getElementById('preview');
    preview.appendChild(vdom);
  })
 
```


### React

```javascript 
var unified = require('unified')
var parse = require('remark-parse')
var render = require('remark-render')
  
var React = require('react');
var h = React.createElement;
var Renderer = require('remark-render/renderers/react-renderer');
var renderer = new Renderer({
    h: h,
    rootClassName: 'markdown-body'
});
 
var processor = unified()
    .use(parse)
    .use(render, {
        renderer: renderer
    });
 
class Preview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            md: '# h1  \n## h2'
        };
    }
    
    render() {
        var file = processor.processSync(this.state.md);
        return file.contents;
    }
}

ReactDOM.render(
    h(Preview),
    document.getElementById('preview')
);
 
```

### Vue

```javascript 
var unified = require('unified')
var parse = require('remark-parse')
var render = require('remark-render')
  
var React = require('react');
var Renderer = require('remark-render/renderers/vue/renderer');
var renderer = new Renderer({
    rootClassName: 'markdown-body'
});
 
var processor = unified()
    .use(parse)
    .use(render, {
        renderer: renderer
    });
 
const app = new Vue({
    el: '#app',
    data: {
        md: md
    },
    render(h) {
        renderer.h = h;
        var file = processor.processSync(this.md);
        return file.contents;
    }
}); 
```


### Writing a custom rule/Extend a rule 

```javascript 
var unified = require('unified')
var parse = require('remark-parse')
var render = require('remark-render')
  
var h = require('hyperscript');
var Renderer = require('remark-render/renderers/hyperscript-renderer');
Renderer.prototype.text = function(h, node, index, children) {
    return h('span', {
        style: {
            fontSize: 20
        }
    }, node.value);
};

var renderer = new Renderer({
    h: h,
    rootClassName: 'markdown-body'
});

renderer.text = function(h, node, index, children) {
    return h('span', {
        style: {
            fontSize: 20
        }
    }, node.value);
};

unified()
  .use(parse)
  .use(render, {
     renderer: renderer
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