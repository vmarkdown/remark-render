const unified = require('unified');
const parse = require('remark-parse');
const render = require('../../index');
const renderer = require('remark-preact-renderer');

let md = require('../md/syntax.md');

// setTimeout(function () {
//     md = md.replace('Markdown 语法说明','Markdown 语法说明=====');
//     app.$forceUpdate();
// }, 3000);

const processor = unified()
    .use(parse, {})
    .use(render, {
        renderer: renderer
    }).freeze();

const app = new Vue({
    render(h) {
        const file = processor().data('h', h).processSync(md);
        return file.contents;
    }
});

app.$mount('#app');