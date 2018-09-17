const unified = require('unified');
const parse = require('remark-parse');
const render = require('../../src/index');

const h = require('hyperscript');
const Renderer = require('../../src/renderers/hyperscript/renderer');

const renderer = new Renderer({
    h: h,
    rootClassName: 'markdown-body'
});

let processor = unified()
    .use(parse, {})
    .use(render, {
        renderer: renderer
    });

const file = processor.processSync(require('../md/syntax.md'));
const vdom = file.contents;

const preview = document.getElementById('preview');

preview.appendChild(vdom);


