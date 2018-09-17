const unified = require('unified');
const parse = require('remark-parse');
const render = require('../../src/index');
const Renderer = require('../../renderers/hyperscript-renderer');

const h = require('hyperscript');
const renderer = new Renderer({
    h: h,
    rootClassName: 'markdown-body'
});

renderer.heading = function(node, children) {
    return h('h'+node.depth, {
        style: {'font-size': '60px'}
    }, children);
};

let processor = unified()
    .use(parse, {})
    .use(render, {
        renderer: renderer
    });

const file = processor.processSync(require('../md/syntax.md'));
const dom = file.contents;

const preview = document.getElementById('preview');
preview.appendChild(dom);

