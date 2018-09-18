const unified = require('unified');
const parse = require('remark-parse');
const render = require('../../src/index');

const processor = unified()
    .use(parse, {})
    .use(render, {
        mode: 'vue'
    });

const app = new Vue({
    render(h) {
        const file = processor.data('h', h).processSync(require('../md/syntax.md'));
        return file.contents;
    }
});

app.$mount('#app');