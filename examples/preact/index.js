const unified = require('unified');
const parse = require('remark-parse');
const render = require('../../src/index');
const renderer = require('remark-preact-renderer');
const processor = unified()
    .use(parse, {})
    .use(render, {
        renderer: renderer,
        h: preact.h,
        rootClassName: 'markdown',
        rootTagName: 'main'
    });

const file = processor.processSync(require('../md/maxiang.md'));
const vdom = file.contents;

preact.render(
    vdom,
    document.getElementById('preview')
);