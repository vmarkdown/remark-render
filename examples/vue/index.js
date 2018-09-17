const unified = require('unified');
const parse = require('remark-parse');
const render = require('../../src/index');
const Renderer = require('../../renderers/vue-renderer');

const renderer = new Renderer({
    rootClassName: 'markdown-body'
});

const processor = unified()
    .use(parse, {})
    .use(render, {
        renderer: renderer
    });

const app = new Vue({
    render(h) {
        renderer.h = h;
        const file = processor.processSync(require('../md/syntax.md'));
        return file.contents;
    }
});

app.$mount('#app');