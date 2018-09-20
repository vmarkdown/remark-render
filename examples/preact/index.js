const processor = (function () {
    const unified = require('unified');
    const parse = require('remark-parse');
    const render = require('../../src/index');
    const renderer = require('remark-preact-renderer');
    const h = React.createElement;
    return unified()
        .use(parse, {})
        .use(render, {
            renderer: renderer,
            h: h,
            rootClassName: 'markdown-body',
            rootTagName: 'main'
        });
})();

const file = processor.processSync(require('../md/maxiang.md'));
const vdom = file.contents;

const { h ,render } = preact;

render(
    h(vdom),
    document.getElementById('preview')
);